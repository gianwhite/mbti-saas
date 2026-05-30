// GET /api/cron-nurture
// Vercel cron — runs every hour
// Fetches pending email_jobs where send_at <= now, sends them, marks sent

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { nurture24Email, nurture72Email } from './emails.js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Vercel cron sends GET; protect against manual abuse with secret
  const auth = req.headers.authorization;
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const now = new Date().toISOString();

  // Fetch due pending jobs (process up to 50 per run)
  const { data: jobs, error } = await supabase
    .from('email_jobs')
    .select('id, email, mbti_type, email_type')
    .eq('status', 'pending')
    .lte('send_at', now)
    .limit(50);

  if (error) {
    console.error('cron-nurture fetch error:', error.message);
    return res.status(500).json({ error: error.message });
  }

  if (!jobs || jobs.length === 0) {
    return res.json({ sent: 0 });
  }

  let sent = 0;
  const results = await Promise.allSettled(
    jobs.map(async (job) => {
      try {
        let template;
        if (job.email_type === 'nurture_24') {
          template = nurture24Email({ email: job.email, mbtiType: job.mbti_type });
        } else if (job.email_type === 'nurture_72') {
          template = nurture72Email({ email: job.email, mbtiType: job.mbti_type });
        } else {
          return; // unknown type, skip
        }

        await resend.emails.send({
          from: 'hola@16personalidades.app',
          to:   template.to,
          subject: template.subject,
          html: template.html,
        });

        // Mark sent
        await supabase
          .from('email_jobs')
          .update({ status: 'sent', sent_at: new Date().toISOString() })
          .eq('id', job.id);

        sent++;
      } catch (err) {
        console.error(`cron-nurture job ${job.id} failed:`, err.message);
        // Mark failed so we don't retry endlessly
        await supabase
          .from('email_jobs')
          .update({ status: 'failed', error: err.message })
          .eq('id', job.id);
      }
    })
  );

  console.log(`cron-nurture: sent ${sent}/${jobs.length}`);
  return res.json({ sent, total: jobs.length });
}

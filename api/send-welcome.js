// POST /api/send-welcome
// Body: { email, mbtiType }
// Called from the frontend after the user registers
// Also schedules nurture email sequence (24h + 72h)

import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import { welcomeEmail } from './emails.js';

const resend   = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, mbtiType } = req.body || {};
  if (!email || !mbtiType) return res.status(400).json({ error: 'Missing email or mbtiType' });

  try {
    // 1. Send welcome email immediately
    const template = welcomeEmail({ email, mbtiType });
    await resend.emails.send({
      from: 'hola@16personalidades.app',
      to:   template.to,
      subject: template.subject,
      html: template.html,
    });

    // 2. Schedule nurture sequence (non-blocking)
    const now = new Date();
    const jobs = [
      {
        email,
        mbti_type: mbtiType,
        email_type: 'nurture_24',
        send_at: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending',
      },
      {
        email,
        mbti_type: mbtiType,
        email_type: 'nurture_72',
        send_at: new Date(now.getTime() + 72 * 60 * 60 * 1000).toISOString(),
        status: 'pending',
      },
    ];

    supabase
      .from('email_jobs')
      .upsert(jobs, { onConflict: 'email,email_type', ignoreDuplicates: true })
      .then(({ error }) => { if (error) console.error('nurture schedule error:', error.message); });

    return res.json({ ok: true });
  } catch (err) {
    console.error('send-welcome error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}

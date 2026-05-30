// POST /api/schedule-nurture
// Body: { email, mbtiType }
// Called from send-welcome to queue nurture emails

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY  // service role key — backend only
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, mbtiType } = req.body || {};
  if (!email || !mbtiType) return res.status(400).json({ error: 'Missing fields' });

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

  try {
    // Upsert — if email already has pending jobs, skip (don't double-schedule)
    const { error } = await supabase
      .from('email_jobs')
      .upsert(jobs, { onConflict: 'email,email_type', ignoreDuplicates: true });

    if (error) throw error;
    return res.json({ ok: true });
  } catch (err) {
    console.error('schedule-nurture error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}

// POST /api/send-welcome
// Body: { email, mbtiType }
// Called from the frontend after the user registers

import { Resend } from 'resend';
import { welcomeEmail } from './emails.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, mbtiType } = req.body || {};
  if (!email || !mbtiType) return res.status(400).json({ error: 'Missing email or mbtiType' });

  try {
    const template = welcomeEmail({ email, mbtiType });
    await resend.emails.send({
      from: 'hola@16personalidades.app',
      to:   template.to,
      subject: template.subject,
      html: template.html,
    });
    return res.json({ ok: true });
  } catch (err) {
    console.error('send-welcome error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}

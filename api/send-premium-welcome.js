// POST /api/send-premium-welcome
// Called by Stripe webhook (checkout.session.completed)
// OR directly from the frontend after payment confirmation

import { Resend } from 'resend';
import Stripe from 'stripe';
import { premiumWelcomeEmail } from './emails.js';

const resend = new Resend(process.env.RESEND_API_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'];

  // ── Path A: Stripe webhook ─────────────────────────────────
  if (sig) {
    let event;
    try {
      const raw = await getRawBody(req);
      event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      return res.status(400).json({ error: `Webhook error: ${err.message}` });
    }

    if (event.type === 'checkout.session.completed') {
      const session  = event.data.object;
      const email    = session.customer_details?.email || session.customer_email;
      const mbtiType = session.metadata?.mbti_type;

      if (email && mbtiType) {
        await sendPremiumEmail(email, mbtiType);
      }
    }
    return res.json({ received: true });
  }

  // ── Path B: Direct call from frontend ─────────────────────
  const { email, mbtiType } = req.body || {};
  if (!email || !mbtiType) return res.status(400).json({ error: 'Missing email or mbtiType' });

  await sendPremiumEmail(email, mbtiType);
  return res.json({ ok: true });
}

async function sendPremiumEmail(email, mbtiType) {
  try {
    const template = premiumWelcomeEmail({ email, mbtiType });
    await resend.emails.send({
      from: 'hola@16personalidades.app',
      to:   template.to,
      subject: template.subject,
      html: template.html,
    });
  } catch (err) {
    console.error('send-premium-welcome error:', err);
  }
}

// Helper: get raw body for Stripe signature verification
async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

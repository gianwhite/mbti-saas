// POST /api/webhook-stripe
// Stripe webhook — cancels nurture email jobs when user subscribes

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig    = req.headers['stripe-signature'];
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    console.error('Webhook signature error:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  // Cancel nurture jobs on successful subscription
  if (
    event.type === 'customer.subscription.created' ||
    event.type === 'checkout.session.completed'
  ) {
    let customerEmail = null;

    if (event.type === 'checkout.session.completed') {
      customerEmail = event.data.object.customer_email ||
                      event.data.object.customer_details?.email;
    } else if (event.type === 'customer.subscription.created') {
      // Fetch customer to get email
      try {
        const customer = await stripe.customers.retrieve(event.data.object.customer);
        customerEmail = customer.email;
      } catch {}
    }

    if (customerEmail) {
      await supabase
        .from('email_jobs')
        .update({ status: 'cancelled' })
        .eq('email', customerEmail)
        .eq('status', 'pending');

      console.log(`Cancelled nurture jobs for ${customerEmail}`);
    }
  }

  return res.json({ received: true });
}

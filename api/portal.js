import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { customer_id } = req.body;
  const appUrl = process.env.VITE_APP_URL || `https://${req.headers.host}`;

  if (!customer_id) {
    return res.status(400).json({ error: 'Missing customer_id' });
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customer_id,
      return_url: appUrl,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Portal error:', err.message);
    res.status(500).json({ error: err.message });
  }
}

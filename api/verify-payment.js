import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ paid: false, error: 'Missing session_id' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status === 'paid') {
      res.json({ paid: true, type: session.metadata?.type });
    } else {
      res.json({ paid: false });
    }
  } catch (err) {
    console.error('Verify error:', err.message);
    res.status(400).json({ paid: false, error: err.message });
  }
}

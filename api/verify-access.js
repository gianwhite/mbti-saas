import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { session_id, customer_id } = req.query;

  try {
    // Path 1: fresh return from Stripe checkout — verify session and extract customer
    if (session_id) {
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['subscription'],
      });

      const active =
        session.subscription?.status === 'active' ||
        session.subscription?.status === 'trialing';

      if (active) {
        return res.json({
          active: true,
          customerId: session.customer,
          subscriptionId: session.subscription?.id,
        });
      }
      return res.json({ active: false });
    }

    // Path 2: returning user — verify their stored customer_id still has active sub
    if (customer_id) {
      const subscriptions = await stripe.subscriptions.list({
        customer: customer_id,
        status: 'active',
        limit: 1,
      });

      const trialing = await stripe.subscriptions.list({
        customer: customer_id,
        status: 'trialing',
        limit: 1,
      });

      const active =
        subscriptions.data.length > 0 || trialing.data.length > 0;

      return res.json({ active });
    }

    return res.status(400).json({ active: false, error: 'Missing session_id or customer_id' });
  } catch (err) {
    console.error('Verify access error:', err.message);
    res.status(400).json({ active: false, error: err.message });
  }
}

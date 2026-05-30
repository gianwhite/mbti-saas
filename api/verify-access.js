import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { session_id, customer_id, email } = req.query;

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

    // Path 3: lookup by email — cross-device login
    if (email) {
      const customers = await stripe.customers.list({ email, limit: 5 });
      for (const customer of customers.data) {
        const subs = await stripe.subscriptions.list({
          customer: customer.id,
          status: 'active',
          limit: 1,
        });
        const trial = await stripe.subscriptions.list({
          customer: customer.id,
          status: 'trialing',
          limit: 1,
        });
        if (subs.data.length > 0 || trial.data.length > 0) {
          return res.json({ active: true, customerId: customer.id });
        }
      }
      return res.json({ active: false });
    }

    return res.status(400).json({ active: false, error: 'Missing session_id, customer_id or email' });
  } catch (err) {
    console.error('Verify access error:', err.message);
    res.status(400).json({ active: false, error: err.message });
  }
}

import Stripe from 'stripe';

// Returns { active, subscriptionStatus, customerId?, subscriptionId? }
// subscriptionStatus: 'active' | 'trialing' | 'past_due' | 'unpaid' | 'canceled' | 'never_subscribed'
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { session_id, customer_id, email } = req.query;

  try {
    // ── Path 1: fresh return from Stripe checkout ──────────────
    if (session_id) {
      const session = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['subscription'],
      });

      const status = session.subscription?.status;
      const active = status === 'active' || status === 'trialing';

      if (active) {
        return res.json({
          active: true,
          subscriptionStatus: status,
          customerId: session.customer,
          subscriptionId: session.subscription?.id,
        });
      }
      return res.json({ active: false, subscriptionStatus: status || 'never_subscribed' });
    }

    // ── Path 2: returning user — check by stored customer_id ───
    if (customer_id) {
      const result = await checkCustomerSubscription(stripe, customer_id);
      return res.json(result);
    }

    // ── Path 3: lookup by email — cross-device login ───────────
    if (email) {
      const customers = await stripe.customers.list({ email, limit: 5 });
      for (const customer of customers.data) {
        const result = await checkCustomerSubscription(stripe, customer.id);
        if (result.active || result.subscriptionStatus !== 'never_subscribed') {
          return res.json(result);
        }
      }
      return res.json({ active: false, subscriptionStatus: 'never_subscribed' });
    }

    return res.status(400).json({ active: false, subscriptionStatus: 'never_subscribed', error: 'Missing session_id, customer_id or email' });
  } catch (err) {
    console.error('Verify access error:', err.message);
    res.status(400).json({ active: false, subscriptionStatus: 'never_subscribed', error: err.message });
  }
}

// Helper: check all relevant subscription statuses for a customer
async function checkCustomerSubscription(stripe, customerId) {
  // Check active/trialing first
  const [activeSubs, trialingSubs, pastDueSubs, unpaidSubs, canceledSubs] = await Promise.all([
    stripe.subscriptions.list({ customer: customerId, status: 'active',   limit: 1 }),
    stripe.subscriptions.list({ customer: customerId, status: 'trialing', limit: 1 }),
    stripe.subscriptions.list({ customer: customerId, status: 'past_due', limit: 1 }),
    stripe.subscriptions.list({ customer: customerId, status: 'unpaid',   limit: 1 }),
    stripe.subscriptions.list({ customer: customerId, status: 'canceled', limit: 1 }),
  ]);

  if (activeSubs.data.length > 0) {
    return { active: true, subscriptionStatus: 'active', customerId };
  }
  if (trialingSubs.data.length > 0) {
    return { active: true, subscriptionStatus: 'trialing', customerId };
  }
  if (pastDueSubs.data.length > 0) {
    return { active: false, subscriptionStatus: 'past_due', customerId };
  }
  if (unpaidSubs.data.length > 0) {
    return { active: false, subscriptionStatus: 'unpaid', customerId };
  }
  if (canceledSubs.data.length > 0) {
    return { active: false, subscriptionStatus: 'canceled', customerId };
  }
  return { active: false, subscriptionStatus: 'never_subscribed' };
}

import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const { email, mbtiType, trial } = req.body;
  const appUrl = process.env.VITE_APP_URL || `https://${req.headers.host}`;
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!priceId) {
    return res.status(500).json({ error: 'STRIPE_PRICE_ID not configured' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email || undefined,
      allow_promotion_codes: true,
      success_url: `${appUrl}/test?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/test`,
      metadata: { mbti_type: mbtiType || '' },
      subscription_data: {
        trial_period_days: trial ? 7 : undefined,
        metadata: { source: 'mbti-saas', mbti_type: mbtiType || '', trial: trial ? 'true' : 'false' },
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
}

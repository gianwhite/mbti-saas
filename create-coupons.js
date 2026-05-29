/**
 * Run once to create Stripe discount coupons.
 * Usage: node create-coupons.js
 * (from inside mbti-saas directory, with .env.local set)
 */
import Stripe from 'stripe';
import { readFileSync } from 'fs';

// Read .env.local manually (no dotenv dependency needed)
try {
  const env = readFileSync('.env.local', 'utf8');
  for (const line of env.split('\n')) {
    const [key, ...val] = line.split('=');
    if (key && !key.startsWith('#')) process.env[key.trim()] = val.join('=').trim();
  }
} catch {}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function main() {
  console.log('Creating Stripe coupons...\n');

  // SOCIALCODE — $10 off first month ($19.99 → $9.99, once)
  try {
    const c1 = await stripe.coupons.create({
      id: 'SOCIALCODE',
      name: 'Social Code — Primer mes',
      amount_off: 1000,   // $10.00 off
      currency: 'usd',
      duration: 'once',
    });
    console.log(`✓ SOCIALCODE created — $${(c1.amount_off / 100).toFixed(2)} off, ${c1.duration}`);
  } catch (e) {
    if (e.code === 'resource_already_exists') console.log('⚠ SOCIALCODE already exists, skipping');
    else throw e;
  }

  // FOUNDER — $10 off forever ($19.99 → $9.99, always)
  try {
    const c2 = await stripe.coupons.create({
      id: 'FOUNDER',
      name: 'Founder — De por vida',
      amount_off: 1000,   // $10.00 off
      currency: 'usd',
      duration: 'forever',
    });
    console.log(`✓ FOUNDER created — $${(c2.amount_off / 100).toFixed(2)} off, ${c2.duration}`);
  } catch (e) {
    if (e.code === 'resource_already_exists') console.log('⚠ FOUNDER already exists, skipping');
    else throw e;
  }

  console.log('\nDone. Go to Stripe Dashboard → Coupons to verify.');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});

import posthog from 'posthog-js';

posthog.init('phc_AYpq4tb8vWPXe8Kd9BAnopXKRSGQga4xcpK36WjaEpn9', {
  api_host: 'https://eu.i.posthog.com',
  person_profiles: 'identified_only',
  capture_pageview: true,
  capture_pageleave: true,
  session_recording: { maskAllInputs: true },
});

// ─── Identify user ───────────────────────────────────────────
export function identifyUser(userId, email) {
  posthog.identify(userId, { email });
}

export function resetUser() {
  posthog.reset();
}

// ─── Funnel events ───────────────────────────────────────────
export function trackTestStarted() {
  posthog.capture('test_started');
}

export function trackTestCompleted(type) {
  posthog.capture('test_completed', { mbti_type: type });
}

export function trackPaywallSeen(source) {
  posthog.capture('paywall_seen', { source });
}

export function trackCheckoutStarted(type) {
  posthog.capture('checkout_started', { mbti_type: type });
}

export function trackSubscriptionActivated(type) {
  posthog.capture('subscription_activated', { mbti_type: type });
}

// ─── Engagement events ───────────────────────────────────────
export function trackTabOpened(tabId, type) {
  posthog.capture('tab_opened', { tab: tabId, mbti_type: type });
}

export function trackAdvisorMessage(type) {
  posthog.capture('advisor_message_sent', { mbti_type: type });
}

export function trackShareClicked(type) {
  posthog.capture('share_clicked', { mbti_type: type });
}

export function trackSignUp() {
  posthog.capture('user_signed_up');
}

export function trackLogin() {
  posthog.capture('user_logged_in');
}

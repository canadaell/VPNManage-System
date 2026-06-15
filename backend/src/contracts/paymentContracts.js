const PAYMENT_CONTRACT_VERSION = 'PR-001';

const PAYMENT_SCOPE = Object.freeze({
  feature: 'payment',
  version: PAYMENT_CONTRACT_VERSION,
  supportedEndpoints: Object.freeze([
    'GET /api/subscriptions',
    'POST /api/buyplan'
  ]),
  nonGoals: Object.freeze([
    'payment provider',
    'checkout session',
    'webhook handling',
    'database schema changes',
    'deployment changes',
    'auth behavior changes'
  ])
});

function toPositiveInteger(value) {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    return null;
  }

  return parsedValue;
}

function parseBuyPlanRequest(body = {}) {
  const userId = toPositiveInteger(body.user_id);
  const planId = toPositiveInteger(body.plan_id);

  if (!userId || !planId) {
    return {
      ok: false,
      error: {
        code: 'MISSING_REQUIRED_PAYMENT_FIELDS',
        message: '缺少必要的参数'
      }
    };
  }

  return {
    ok: true,
    value: {
      user_id: userId,
      plan_id: planId
    }
  };
}

function buildBuyPlanResponse(subscriptionId, startDate, endDate) {
  return {
    message: '订阅成功',
    subscription_id: subscriptionId,
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString()
  };
}

module.exports = {
  PAYMENT_CONTRACT_VERSION,
  PAYMENT_SCOPE,
  parseBuyPlanRequest,
  buildBuyPlanResponse
};

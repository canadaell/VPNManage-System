const assert = require('node:assert/strict');
const {
  BUY_PLAN_CONTRACT,
  hasRequiredBuyPlanFields,
  buildBuyPlanSuccessResponse
} = require('../src/contracts/billingContract');

assert.deepEqual(BUY_PLAN_CONTRACT.requiredBodyFields, ['user_id', 'plan_id']);
assert.equal(hasRequiredBuyPlanFields({ user_id: 1, plan_id: 2 }), true);
assert.equal(hasRequiredBuyPlanFields({ user_id: 1 }), false);
assert.equal(hasRequiredBuyPlanFields({ plan_id: 2 }), false);

const response = buildBuyPlanSuccessResponse(
  { insertId: 9 },
  new Date('2026-01-01T00:00:00.000Z'),
  new Date('2026-01-31T00:00:00.000Z')
);

assert.deepEqual(response, {
  message: BUY_PLAN_CONTRACT.successMessage,
  subscription_id: 9,
  start_date: '2026-01-01T00:00:00.000Z',
  end_date: '2026-01-31T00:00:00.000Z'
});

console.log('billingContract tests passed');

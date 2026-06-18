const BUY_PLAN_CONTRACT = Object.freeze({
  route: 'POST /api/buyplan',
  requiredBodyFields: Object.freeze(['user_id', 'plan_id']),
  successStatus: 201,
  missingParamsStatus: 400,
  missingParamsError: '缺少必要的参数',
  successMessage: '订阅成功'
});

function hasRequiredBuyPlanFields(body = {}) {
  return Boolean(body.user_id && body.plan_id);
}

function buildBuyPlanSuccessResponse(result, startDate, endDate) {
  return {
    message: BUY_PLAN_CONTRACT.successMessage,
    subscription_id: result.insertId,
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString()
  };
}

module.exports = {
  BUY_PLAN_CONTRACT,
  hasRequiredBuyPlanFields,
  buildBuyPlanSuccessResponse
};

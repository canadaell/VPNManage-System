export const PAYMENT_CONTRACT_VERSION = 'PR-001';

export const PAYMENT_API_ENDPOINTS = {
  subscriptions: 'http://localhost:3001/api/subscriptions',
  buyPlan: 'http://localhost:3001/api/buyplan',
} as const;

export const PLAN_DURATION_DAYS = 30;

export interface SubscriptionPlan {
  id: number;
  name: string;
  price: string | number;
}

export interface BuyPlanRequest {
  user_id: number;
  plan_id: number;
}

export interface BuyPlanResponse {
  message: string;
  subscription_id: number;
  start_date: string;
  end_date: string;
}

const toPositiveInteger = (value: string | number): number | null => {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
    return null;
  }

  return parsedValue;
};

export const createBuyPlanRequest = (
  userId: string | null,
  planId: number,
): BuyPlanRequest | null => {
  if (!userId) {
    return null;
  }

  const parsedUserId = toPositiveInteger(userId);
  const parsedPlanId = toPositiveInteger(planId);

  if (!parsedUserId || !parsedPlanId) {
    return null;
  }

  return {
    user_id: parsedUserId,
    plan_id: parsedPlanId,
  };
};

export const subscriptionPriceToNumber = (
  price: SubscriptionPlan['price'],
): number => Number.parseFloat(String(price));

export interface SubscriptionPlan {
  id: number;
  name: string;
  price: string;
}

export interface PurchasePlanRequest {
  user_id: number;
  plan_id: number;
}

export interface PurchasePlanResponse {
  message: string;
  subscription_id: number;
  start_date: string;
  end_date: string;
}

export const BILLING_API_BASE_URL = 'http://localhost:3001' as const;

export const BILLING_API_PATHS = {
  subscriptions: '/api/subscriptions',
  buyPlan: '/api/buyplan'
} as const;

type BillingApiPath = (typeof BILLING_API_PATHS)[keyof typeof BILLING_API_PATHS];

export function buildBillingApiUrl(path: BillingApiPath): string {
  return `${BILLING_API_BASE_URL}${path}`;
}

export function buildPurchasePlanRequest(userId: string, planId: number): PurchasePlanRequest {
  return {
    user_id: Number.parseInt(userId, 10),
    plan_id: planId
  };
}

export function parsePlanPrice(price: string): number {
  return Number.parseFloat(price);
}

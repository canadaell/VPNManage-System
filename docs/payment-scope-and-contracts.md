# Payment Scope and Contracts

## Evidence Used

- Product idea: 给这个项目添加前后端支付功能.
- Target repository: `github_canadaell__VPNManage-System`.
- Approved node: `PR-001 - Define 给这个项目添加前后端支付功能 scope and contracts`.
- Required verification commands: `npm run lint`, `npm run typecheck`, `npm run test`.

## Scope

- Define the smallest payment feature boundary around the existing store plan-selection flow.
- Keep the current API surface in scope:
  - `GET /api/subscriptions` returns available subscription plans.
  - `POST /api/buyplan` accepts the selected `user_id` and `plan_id` and returns the current subscription grant response.
- Add reusable frontend contract types and helpers for the store purchase request.
- Add reusable backend helpers for validating the existing buy-plan request and formatting the existing response.
- Add root npm script wrappers for the approved verification command names.

## Non-Goals

- Do not add a payment provider, checkout session, webhook, refund flow, tax handling, invoice flow, or recurring billing engine.
- Do not add routes beyond the existing subscription and buy-plan endpoints.
- Do not change deployment, production configuration, authentication, authorization, or database schema.
- Do not grant or revoke subscriptions outside the existing buy-plan behavior.

## Contracts

### Subscription Plan

The frontend store reads plans from `GET /api/subscriptions`.

```ts
interface SubscriptionPlan {
  id: number;
  name: string;
  price: string | number;
}
```

### Buy Plan Request

The store sends the selected plan for the logged-in user to `POST /api/buyplan`.

```ts
interface BuyPlanRequest {
  user_id: number;
  plan_id: number;
}
```

Both values must be positive integers before the request is accepted by backend helpers.

### Buy Plan Response

The backend response keeps the existing shape.

```ts
interface BuyPlanResponse {
  message: string;
  subscription_id: number;
  start_date: string;
  end_date: string;
}
```

## Downstream Decisions

The approved evidence does not define a provider, callback format, checkout UX, idempotency model, payment state table, currency rules, tax rules, or refund behavior. Those decisions remain out of scope for this node and must be approved before implementation.

## Acceptance Criteria

- The slice is independently reviewable as contracts and scope only.
- The implementation stays within this repository.
- The approved verification commands are available:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`

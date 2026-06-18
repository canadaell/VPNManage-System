# PR-001 Stripe Payment Scope And Contracts

## Evidence Used

- Product idea: add frontend and backend Stripe payment functionality to this project.
- Repository boundary: `github_canadaell__VPNManage-System` only.
- Required verification commands: `npm run lint`, `npm run typecheck`, `npm run test`.
- Non-goals: do not broaden beyond this PR node; do not change unrelated deployment, billing, or auth behavior.

## Scope

This PR defines the smallest reviewable boundary before Stripe feature work:

- Document the current billing-adjacent integration points already present in the repository.
- Centralize the existing backend `POST /api/buyplan` request/response contract in a reusable helper.
- Centralize the existing frontend subscription plan and purchase request types in a reusable contract module.
- Wire the repository-level verification commands required by the approved plan snapshot.

## Current Contracts

### `GET /api/subscriptions`

The Store view currently reads subscription plans from this endpoint.

Frontend plan fields currently consumed:

- `id: number`
- `name: string`
- `price: string`

### `POST /api/buyplan`

The Store view currently posts this request body:

- `user_id: number`
- `plan_id: number`

The backend currently returns this success shape:

- `message: string`
- `subscription_id: number`
- `start_date: string`
- `end_date: string`

## Non-Goals

- No Stripe SDK dependency is added.
- No Stripe checkout, payment intent, webhook, customer, price, or session route is introduced.
- No database migration or billing schema is introduced.
- No production configuration, secret, deployment, auth, or permission behavior is changed.
- No change is made to the existing subscription activation behavior.

## Downstream Decisions Left Visible

These items require explicit approval in later PR nodes before implementation:

- Stripe integration mode and API surface.
- Mapping between local subscription plans and Stripe products or prices.
- Payment confirmation and subscription activation timing.
- Webhook event list and verification behavior.
- Frontend success, cancel, and failure flows.
- Required environment variables and secret handling.

## Acceptance Criteria

- The slice is independently reviewable.
- The implementation stays within the PR-001 contract and scope boundary.
- Required verification commands pass:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run test`

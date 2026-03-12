# DECISIONS

## Technical choices

- Backend: NestJS + Mongoose
- Frontend: Next.js (App Router) + Tailwind
- Database: MongoDB local

## MVP assumptions

- Budget check: a campaign can serve if `impressionsServed < budget`.
- Impression cost: 1 impression = 1 unit of budget.

## Trade-offs

- `impressions` collection is not implemented in MVP (could be added for full traceability).
- Serve-ad selection uses a simple “most recent first” sort and then picks the first campaign with remaining budget.

## Issues encountered

- Nested git repo inside `backend/` blocked `git add`.
  - Fix: removed `backend/.git`.

## Improvements with more time

- Add unit tests for `serve-ad` and stats aggregation.
- Add Redis cache for `/stats` and rate limiting for `/serve-ad`.
- Add request IDs and structured logs.
- Implement impression-level tracking in an `impressions` collection.
- Improve campaign selection algorithm (fair rotation, pacing).

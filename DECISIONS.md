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

## Scaling (1M requests/min) - notes

- Stateless API instances behind a load balancer (horizontal scaling).
- Indexes on MongoDB (`status`, `advertiser`, `targetCountries`, `startDate`, `endDate`).
- Redis cache for `/stats` + background recomputation.
- Async pipeline for impressions (queue/event stream) to avoid heavy writes on the hot path.
- Rate limiting on `/serve-ad`.

## Impression capping - notes

- Keep counters per campaign and per time window (e.g. per hour/day).
- Use Redis atomic counters with TTL for windows.
- Persist aggregates asynchronously for reporting.

## Issues encountered

- Nested git repo inside `backend/` blocked `git add`.
  - Fix: removed `backend/.git`.

## Improvements with more time

- Add unit tests for `serve-ad` and stats aggregation.
- Add Redis cache for `/stats` and rate limiting for `/serve-ad`.
- Add request IDs and structured logs.
- Implement impression-level tracking in an `impressions` collection.
- Improve campaign selection algorithm (fair rotation, pacing).

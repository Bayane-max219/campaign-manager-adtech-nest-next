# Loom (5 min) - Walkthrough Script

## 0:00 - 0:30 Intro

- Quick intro: this is a mini AdTech campaign manager.
- Tech: NestJS + MongoDB (backend), Next.js + Tailwind (frontend).

## 0:30 - 1:45 Backend overview

- Show `backend/.env.example` and explain local MongoDB.
- Open `backend/src/campaigns/`:
  - `campaign.schema.ts` (model: name, advertiser, dates, budget, impressionsServed, targetCountries, status)
  - DTOs + validation (`create-campaign.dto.ts`, `serve-ad.dto.ts`)
  - `campaigns.controller.ts` endpoints.

## 1:45 - 2:45 Key logic: POST /serve-ad

- Explain the selection rules:
  - campaign must be `active`
  - date window must match
  - country must be targeted
  - budget must not be exceeded (MVP rule: impressionsServed < budget)
- Show the update with `$inc` on `impressionsServed`.

## 2:45 - 3:30 Stats endpoint

- Show `GET /stats` aggregation:
  - total campaigns
  - active campaigns
  - total impressions
  - top advertiser

## 3:30 - 4:30 Frontend overview

- Show pages:
  - `/campaigns` list + filters
  - `/campaigns/new` create form
  - `/dashboard` stats cards
- Mention `frontend/lib/api.ts` and `NEXT_PUBLIC_API_URL`.

## 4:30 - 5:00 Improvements (if more time)

- Add `impressions` collection for full tracking.
- Add Redis cache for `/stats`.
- Add rate limiting for `/serve-ad`.
- Add better campaign rotation/pacing.
- Scale to high throughput via horizontal scaling + indexes + async processing.

# AdTech Campaign Manager (Technical Exercise)

Mini fullstack system to manage and serve video advertising campaigns.

## Architecture

- `backend/`: NestJS REST API + MongoDB
- `frontend/`: Next.js (App Router) UI

## Backend (NestJS)

### Requirements

- Node.js
- MongoDB local

MongoDB database name used: `adtech_exercise`.

### Setup

Create `backend/.env` (you can copy from `backend/.env.example`):

```
MONGODB_URI=mongodb://127.0.0.1:27017/adtech_exercise
PORT=3001
```

Install & run:

```
cd backend
npm install
npm run start:dev
```

API base URL: `http://localhost:3001`

### Endpoints

- `POST /campaigns`
- `GET /campaigns?status=&advertiser=&country=`
- `POST /serve-ad` body: `{ "country": "FR" }`
- `GET /stats`
- `GET /health`

Assumption (MVP): **1 impression consumes 1 unit of budget**.

## Frontend (Next.js)

Create `frontend/.env.local` (you can copy from `frontend/.env.example`):

```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Install & run:

```
cd frontend
npm install
npm run dev
```

UI: `http://localhost:3000`

## Scaling to 1M requests/min (high level)

- Horizontal scaling behind a load balancer.
- Proper DB indexes (e.g. `status`, `advertiser`, `targetCountries`, `startDate/endDate`).
- Cache hot responses (e.g. `/stats`) using Redis.
- Use a queue / event stream for impressions processing and aggregation.
- Rate limiting + structured logging + monitoring.

## Production notes

- Add timeouts and connection pooling.
- Add request tracing (request id), structured logs, dashboards/alerts.
- Use separate read models / pre-aggregations for stats.

## Impression capping

- Store counters per campaign / country / user / time window.
- Use Redis for fast atomic counters and TTL-based windows.
- Persist aggregated counters asynchronously to MongoDB.

## Quick API examples

Create campaign:

```
POST http://localhost:3001/campaigns
{
  "name": "Summer Campaign",
  "advertiser": "Nike",
  "startDate": "2025-06-01",
  "endDate": "2025-07-01",
  "budget": 10000,
  "targetCountries": ["FR","ES"],
  "status": "active"
}
```

Serve ad:

```
POST http://localhost:3001/serve-ad
{ "country": "FR" }
```

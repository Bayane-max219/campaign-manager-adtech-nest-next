# AdTech Campaign Manager (Technical Exercise)

Mini fullstack system to manage and serve video advertising campaigns.

## Architecture

- `backend/`: NestJS REST API + MongoDB
- `frontend/`: Next.js (App Router) UI

## Backend (NestJS)

### Requirements

- Node.js
- MongoDB local

### Setup

Create `backend/.env`:

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

Assumption (MVP): **1 impression consumes 1 unit of budget**.

## Frontend (Next.js)

Create `frontend/.env.local`:

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

## Impression capping

- Store counters per campaign / country / user / time window.
- Use Redis for fast atomic counters and TTL-based windows.
- Persist aggregated counters asynchronously to MongoDB.

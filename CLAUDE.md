# Max Weber Portfolio — Project Overview

Portfolio website for fictional developer "Max Weber". Full-stack: C# .NET 9 Web API backend + React/Vite/shadcn/ui frontend. Both services run in Docker and deploy to separate Google Cloud Run services.

## Repository Layout

```
max-weber-portfolio/
├── backend/                  # C# .NET 9 Web API
│   ├── PortfolioApi/         # Main API project
│   │   ├── Controllers/      # Profile, Projects, Skills, Contact
│   │   ├── Models/           # Profile, Project, Skill, ContactRequest
│   │   ├── Services/         # IDataService + DataService (in-memory dummy data)
│   │   └── Program.cs        # DI, CORS, middleware
│   ├── PortfolioApi.Tests/   # xUnit test project (Moq + MvcTesting)
│   ├── PortfolioApi.sln
│   └── Dockerfile
├── frontend/                 # React + Vite + shadcn/ui + Tailwind CSS
│   ├── src/
│   │   ├── api/client.ts     # Typed fetch wrappers for backend API
│   │   ├── types/api.ts      # TypeScript mirrors of backend models
│   │   ├── hooks/            # React Query hooks: useProfile, useProjects, useSkills
│   │   ├── components/
│   │   │   ├── ui/           # shadcn/ui generated components
│   │   │   ├── layout/       # Navbar, Footer
│   │   │   ├── sections/     # Hero, Skills, Projects, Contact
│   │   │   └── shared/       # SectionWrapper, LoadingSpinner, ErrorBoundary
│   │   └── App.tsx
│   ├── e2e/                  # Playwright E2E specs
│   ├── nginx/nginx.conf      # SPA routing for production, listens on port 8080
│   ├── vite.config.ts        # Proxy /api → backend:8080 for local dev
│   ├── vitest.config.ts
│   └── Dockerfile            # Multi-stage: Node build → Nginx serve
├── docker-compose.yml        # Local dev: backend:8080 + frontend:5173
├── .env.example
└── CLAUDE.md                 # This file
```

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/profile` | Returns Max Weber's profile |
| GET | `/api/projects?technology=X` | Returns projects, optional tech filter |
| GET | `/api/skills?category=X` | Returns skills, optional category filter |
| POST | `/api/contact` | Validates and logs contact form submission |

All data is hardcoded in `backend/PortfolioApi/Services/DataService.cs` — no database.

## Running Locally

### Option A — Vite dev server (recommended for frontend work)

Start backend:
```bash
dotnet run --project backend/PortfolioApi
# API available at http://localhost:8080
# OpenAPI spec at http://localhost:8080/openapi/v1.json (dev only)
```

Start frontend dev server:
```bash
cd frontend && npm run dev
# App available at http://localhost:5173
# /api/* is proxied to http://localhost:8080 via Vite
```

### Option B — Docker Compose (full stack)

```bash
# Make sure Docker Desktop is running first
docker compose up --build
# Frontend: http://localhost:5173
# Backend: http://localhost:8080
```

## Running Tests

### Backend (xUnit — 20 tests)
```bash
dotnet test backend/PortfolioApi.sln
```

### Frontend (Vitest unit tests)
```bash
cd frontend && npm run test:run
```

### E2E (Playwright — requires running app)
```bash
# Local (with Docker Compose running):
cd frontend && npx playwright test

# Against deployed Cloud Run URL:
PLAYWRIGHT_BASE_URL=https://portfolio-frontend-<hash>-uc.a.run.app npx playwright test
```

## Deployment — Google Cloud Run

**GCP Project:** `claude-app-2026` | **Region:** `us-central1`
**Services:** `portfolio-backend`, `portfolio-frontend`
**Artifact Registry:** `us-central1-docker.pkg.dev/claude-app-2026/portfolio/`

### First-Time GCP Setup (run once)
```bash
gcloud auth login
gcloud config set project claude-app-2026
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
gcloud artifacts repositories create portfolio --repository-format=docker --location=us-central1
gcloud auth configure-docker us-central1-docker.pkg.dev
```

### Manual Deploy (resolves CORS chicken-and-egg)
```bash
# 1. Build + push backend
docker build -t us-central1-docker.pkg.dev/claude-app-2026/portfolio/portfolio-backend:latest ./backend
docker push us-central1-docker.pkg.dev/claude-app-2026/portfolio/portfolio-backend:latest

# 2. Deploy backend first
gcloud run deploy portfolio-backend \
  --image=us-central1-docker.pkg.dev/claude-app-2026/portfolio/portfolio-backend:latest \
  --platform=managed --region=us-central1 --allow-unauthenticated --port=8080

# 3. Capture backend URL
BACKEND_URL=$(gcloud run services describe portfolio-backend --platform=managed --region=us-central1 --format='value(status.url)')

# 4. Build + push frontend with backend URL baked in
docker build --build-arg VITE_API_URL=$BACKEND_URL \
  -t us-central1-docker.pkg.dev/claude-app-2026/portfolio/portfolio-frontend:latest ./frontend
docker push us-central1-docker.pkg.dev/claude-app-2026/portfolio/portfolio-frontend:latest

# 5. Deploy frontend
gcloud run deploy portfolio-frontend \
  --image=us-central1-docker.pkg.dev/claude-app-2026/portfolio/portfolio-frontend:latest \
  --platform=managed --region=us-central1 --allow-unauthenticated --port=8080

# 6. Capture frontend URL and update backend CORS
FRONTEND_URL=$(gcloud run services describe portfolio-frontend --platform=managed --region=us-central1 --format='value(status.url)')
gcloud run services update portfolio-backend --platform=managed --region=us-central1 \
  --set-env-vars="ASPNETCORE_ENVIRONMENT=Production,AllowedOrigins__0=$FRONTEND_URL"
```

## CI/CD (GitHub Actions)

Trigger: push to `main`. Runs: backend tests → frontend tests → build+push Docker images → deploy both services → Playwright E2E against live URL.

**GitHub Secrets required:**
- `WIF_PROVIDER` — Workload Identity Federation provider
- `WIF_SERVICE_ACCOUNT` — GCP service account for deployments
- `BACKEND_URL` — stable Cloud Run backend URL (set after first manual deploy)
- `FRONTEND_URL` — stable Cloud Run frontend URL (set after first manual deploy)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | C# .NET 9, ASP.NET Core Web API |
| Backend tests | xUnit, Moq, WebApplicationFactory |
| Frontend | React 19, Vite, TypeScript |
| UI components | shadcn/ui, Tailwind CSS (dark mode) |
| Frontend data | @tanstack/react-query |
| Frontend tests | Vitest, @testing-library/react |
| E2E tests | Playwright (Chromium) |
| Containerization | Docker (multi-stage builds) |
| Cloud | Google Cloud Run, Artifact Registry |
| CI/CD | GitHub Actions + Workload Identity Federation |

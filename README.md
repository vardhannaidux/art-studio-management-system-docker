# Art Studio Management System — Containerized Cloud Deployment

**Student ID:** `2400030016`  
**GitHub Repository:** `https://github.com/vardhannaidux/art-studio-management-system-docker.git`  
**Docker Hub Repository:** `jayanavardhannaidu`  
**Target Images:**
- Backend: `jayanavardhannaidu/docker-backend-2400030016:latest`
- Frontend: `jayanavardhannaidu/docker-frontend-2400030016:latest`

---

## 1. Project Overview & Architecture

The **Art Studio Management System** is a 3-tier enterprise web application designed for artistic workspace leasing, tenancy management, and studio operations.

The project is structured into three micro-services orchestrated via **Docker Compose**:
1. **Frontend Service (`frontend`)**: React 19 single-page application built with Vite, styled with custom editorial CSS tokens and Bootstrap 5, and served via an Nginx alpine web server with SPA history routing and reverse proxy for backend REST calls.
2. **Backend Service (`backend`)**: Spring Boot 3.5.6 REST API running on Java 21, packaged as an executable JAR using Maven and running on Eclipse Temurin 21 JRE.
3. **Database Service (`postgresdb`)**: PostgreSQL 16 Alpine database with health check monitoring and persistent Docker volume storage.

```
                           +---------------------------+
                           |       Web Browser         |
                           |   http://localhost:3000   |
                           +-------------+-------------+
                                         |
                                         | HTTP / REST
                                         v
                     +---------------------------------------+
                     |        Frontend (Port 3000)           |
                     |     Nginx Alpine (SPA & Proxy)        |
                     +-------------------+-------------------+
                                         |
                       Proxy /artstudio/*| (Docker Network)
                                         v
                     +---------------------------------------+
                     |         Backend (Port 8081)           |
                     |      Spring Boot 3.5.6 (Java 21)      |
                     +-------------------+-------------------+
                                         |
                                    JDBC | (Port 5432)
                                         v
                     +---------------------------------------+
                     |       PostgreSQL 16 Alpine            |
                     |         (postgresdb:5432)             |
                     +-------------------+-------------------+
                                         |
                                         v
                             [ postgres_data Volume ]
```

---

## 2. Directory Structure

```
.
├── .github/
│   └── workflows/
│       └── docker-publish.yml     # Automated Docker Hub CI/CD workflow
├── backend/
│   ├── src/                       # Spring Boot Java source code & entities
│   ├── pom.xml                    # Maven build descriptor (Java 21, Spring Boot 3.5.6)
│   ├── Dockerfile                 # Multi-stage build (Maven 3.9 + Temurin 21 JRE)
│   ├── .dockerignore              # Build exclusions (target, logs, secrets)
│   └── mvnw / mvnw.cmd            # Maven wrapper scripts
├── frontend/
│   ├── src/                       # React 19 source code, components, and pages
│   ├── nginx.conf                 # Nginx reverse proxy (/artstudio) & SPA routing
│   ├── Dockerfile                 # Multi-stage build (Node 20 Alpine + Nginx Alpine)
│   ├── .dockerignore              # Node build exclusions
│   ├── package.json               # Frontend dependencies (React, Vite, Bootstrap, Recharts)
│   └── vite.config.js             # Vite configuration with proxy
├── .env.example                   # Environment configuration template
├── .env                           # Local environment credentials (git-ignored)
├── .gitignore                     # Root Git exclusions
├── docker-compose.yml             # Container orchestration (postgresdb, backend, frontend)
└── README.md                      # Comprehensive deployment documentation
```

---

## 3. Technology Stack

- **Frontend:** React 19, Vite, Bootstrap 5, Lucide React, React Hot Toast, Recharts
- **Backend:** Spring Boot 3.5.6, Spring Data JPA, Hibernate, Springdoc OpenAPI 2.8.13
- **Database:** PostgreSQL 16 Alpine (`postgres:16-alpine`)
- **Web Server:** Nginx Alpine (Reverse Proxy & SPA routing)
- **Containerization:** Docker (Multi-stage builds) & Docker Compose
- **CI/CD:** GitHub Actions (Buildx & Docker Hub auto-publish)

---

## 4. Environment Setup

### 4.1. Configure Environment Variables
Copy `.env.example` to create `.env`:
```bash
cp .env.example .env
```

Contents of `.env`:
```env
DB_NAME=exam_2400030016
DB_USER=postgres
DB_PASSWORD=root
```
*(Never commit `.env` containing sensitive credentials to GitHub. `.env` is listed in `.gitignore`.)*

---

## 5. Running the Project with Docker Compose

### 5.1. Validate Configuration
Verify that the Compose syntax and environment variables parse correctly:
```bash
docker compose config
```

### 5.2. Build and Start All Containers
Build all local images and start services in the background:
```bash
docker compose up -d --build
```

### 5.3. Check Container Status
Verify that all services are running and `postgresdb` is healthy:
```bash
docker compose ps
```

Expected output:
```
NAME         IMAGE                                                  STATUS                    PORTS
backend      jayanavardhannaidu/docker-backend-2400030016:latest    Up                        0.0.0.0:8081->8081/tcp
frontend     jayanavardhannaidu/docker-frontend-2400030016:latest   Up                        0.0.0.0:3000->80/tcp
postgresdb   postgres:16-alpine                                     Up (healthy)              0.0.0.0:5433->5432/tcp
```

### 5.4. Inspect Logs
View real-time logs from any container:
```bash
# Backend Spring Boot logs
docker compose logs -f backend

# Frontend Nginx logs
docker compose logs -f frontend

# PostgreSQL database logs
docker compose logs -f postgresdb
```

### 5.5. Safe Shutdown
Stop and remove containers while preserving database volume data:
```bash
docker compose down
```

> [!WARNING]
> Do NOT use `docker compose down -v` unless you intentionally want to delete all database records. The `-v` flag removes named Docker volumes (`postgres_data`) permanently.

---

## 6. Application URLs & Verification

| Service | Access URL | Description |
|---------|------------|-------------|
| **Frontend Application** | `http://localhost:3000` | Artistry Studio management dashboard |
| **Backend REST API** | `http://localhost:8081/artstudio/displayall` | Direct backend API endpoint |
| **Reverse-Proxied API** | `http://localhost:3000/artstudio/displayall` | Proxied API endpoint via Nginx |
| **OpenAPI / Swagger UI** | `http://localhost:8081/swagger-ui.html` | Interactive Swagger API documentation |
| **PostgreSQL Database** | `localhost:5433` | Host-accessible PostgreSQL connection |

---

## 7. REST API Endpoints

All endpoints support standard JSON payloads:

| HTTP Method | Endpoint | Request Body | Description |
|-------------|----------|--------------|-------------|
| `GET` | `/artstudio/displayall` | None | Retrieve all art studio records |
| `GET` | `/artstudio/{id}` | None | Retrieve single art studio by ID |
| `POST` | `/artstudio/add` | `{ "studioName": "...", "ownerName": "...", "monthlyRent": 25000.00, "active": true }` | Create a new art studio record |
| `PUT` | `/artstudio/update/{id}` | `{ "studioName": "...", "ownerName": "...", "monthlyRent": 28000.00, "active": true }` | Update studio details while preserving ID |
| `DELETE` | `/artstudio/delete/{id}` | None | Delete studio by ID (Returns 204 No Content) |

---

## 8. Frontend-to-Backend Reverse Proxy Setup

When running in production containers, web browsers access the frontend on port `3000`. The browser cannot resolve Docker internal service hostnames like `backend`.

The Nginx configuration (`frontend/nginx.conf`) routes all `/artstudio/*` traffic directly to the backend container over Docker's internal network:

```nginx
location /artstudio {
    proxy_pass http://backend:8081;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location / {
    try_files $uri $uri/ /index.html;
}
```

This eliminates CORS issues and ensures seamless communication in containerized environments.

---

## 9. GitHub Actions CI/CD Pipeline

The `.github/workflows/docker-publish.yml` workflow automatically builds and pushes the production Docker images to Docker Hub.

### 9.1. Required GitHub Secrets
In your GitHub repository, navigate to:
**Settings → Secrets and variables → Actions → New repository secret**

Configure the following two secrets:
1. `DOCKERHUB_USERNAME`: Your Docker Hub username (`jayanavardhannaidu`)
2. `DOCKERHUB_TOKEN`: Your Docker Hub Personal Access Token (PAT)

### 9.2. Workflow Trigger Rules
- **Push to `main` branch**: Builds and publishes both images to Docker Hub:
  - `jayanavardhannaidu/docker-backend-2400030016:latest`
  - `jayanavardhannaidu/docker-frontend-2400030016:latest`
- **Pull Requests targeting `main`**: Builds both images to validate syntax and compilation, without pushing to Docker Hub.

---

## 10. Academic Submission Screenshot Checklist

For your academic exam submission, capture screenshots of the following:

1. **Terminal — `docker compose ps`**: Showing `postgresdb (healthy)`, `backend (Up)`, and `frontend (Up)` with their port mappings.
2. **Terminal — `docker compose config`**: Showing validated service and volume definitions.
3. **Browser — Dashboard (`http://localhost:3000`)**: Showing KPI cards, tenancy status donut chart, and rent distribution bar chart.
4. **Browser — Studio Management (`http://localhost:3000/studios`)**: Showing the interactive table with records, ₹ currency formatting, and status badges.
5. **Browser — Add Studio (`http://localhost:3000/studios/new`)**: Demonstrating form validation and successful studio registration with toast feedback.
6. **Browser — Swagger UI (`http://localhost:8081/swagger-ui.html`)**: Showing all endpoints under `Art Studio Controller`.
7. **Docker Hub**: Repository page showing published images `docker-backend-2400030016` and `docker-frontend-2400030016`.
8. **GitHub Actions**: Green checkmark on the `Build and Publish Docker Images` workflow run.

# Artistry Studio — Frontend Application

Production-quality Art Studio Management dashboard built with React 19, Vite, Bootstrap 5, custom editorial CSS, Axios, Lucide React, React Hot Toast, and Recharts.

Integrates with the Spring Boot `ArtStudioService` backend running on port 8081.

---

## 1. Visual & Architectural Design

- **Palette**: Warm ivory (`#FAF7F2`), pure white cards (`#FFFFFF`), editorial charcoal text (`#1B1E23`), and muted terracotta primary accent (`#C25E38`).
- **Typography**: Editorial serif headings (`Cormorant Garamond`) paired with modern sans-serif (`Plus Jakarta Sans`).
- **Data Integrity**: Authentic KPI calculations derived directly from live database records. Because the backend `ArtStudio` entity stores only `id`, `studio_name`, `owner_name`, `monthly_rent`, and `active` without timestamps, historical timelines are intentionally omitted rather than fabricated.
- **Genuine Charts**: Active vs Inactive studio tenancy breakdown (Donut chart) and Monthly Rent Distribution across studios (Bar chart) powered by Recharts.
- **Validation**: Full client-side and server-side validation feedback, currency formatting in Indian Rupees (`₹`), and immutable primary key protection during edits.

---

## 2. Directory Structure

```
frontend/
├── dist/                      # Production build output
├── public/                    # Static assets
├── src/
│   ├── api/
│   │   ├── axiosInstance.js   # Centralized Axios with normalized error handling
│   │   └── artStudioApi.js    # Typed service functions matching backend endpoints
│   ├── components/
│   │   ├── AppLayout.jsx      # Application layout shell with Toaster
│   │   ├── Sidebar.jsx        # Charcoal branded navigation panel
│   │   ├── Header.jsx         # Contextual header with page title & actions
│   │   ├── StatCard.jsx       # KPI metric cards
│   │   ├── StudioTable.jsx    # Data table with search, filter, sort & actions
│   │   ├── StudioForm.jsx     # Reusable form with inline validation & INR preview
│   │   ├── ConfirmDialog.jsx  # Accessible delete confirmation modal
│   │   ├── ViewStudioModal.jsx# Editorial studio details viewer
│   │   ├── LoadingState.jsx   # Subtle loading indicator
│   │   ├── EmptyState.jsx     # Artistic empty state with CTA
│   │   └── ErrorState.jsx     # Error state with retry action
│   ├── pages/
│   │   ├── DashboardPage.jsx  # Portfolio overview with KPI cards and charts
│   │   ├── StudiosPage.jsx    # Full studio directory and management
│   │   ├── AddStudioPage.jsx  # Studio registration page
│   │   ├── EditStudioPage.jsx # Studio edit page (immutable primary key)
│   │   └── NotFoundPage.jsx   # Editorial 404 page
│   ├── routes/
│   │   └── AppRoutes.jsx      # React Router route definitions
│   ├── styles/
│   │   ├── global.css         # Design tokens, color palette, buttons, badges
│   │   ├── dashboard.css      # Stat grid, charts layout, notice banner
│   │   ├── tables.css         # Search box, filter pills, table styles
│   │   └── forms.css          # Form inputs, radio cards, validation errors
│   ├── App.jsx                # Application root with router
│   ├── index.css              # Reset styles
│   └── main.jsx               # React DOM entry point
├── .dockerignore              # Docker build exclusions
├── .env                       # Local environment variables
├── .env.example               # Environment template
├── Dockerfile                 # Multi-stage production container definition
├── index.html                 # HTML entry with Google Fonts
├── nginx.conf                 # Nginx reverse proxy and SPA routing config
├── package.json               # Dependencies and scripts
└── vite.config.js             # Vite configuration with proxy to port 8081
```

---

## 3. Local Development Setup

### Prerequisites
- Node.js v18+ (tested with Node v22.19.0)
- npm v10+ (tested with npm 11.14.1)
- Spring Boot `ArtStudioService` running on `http://localhost:8081`

### Installation
```bash
cd frontend
npm install
```

### Environment Configuration
The application reads the backend URL from `VITE_API_BASE_URL`.

Create or inspect `.env`:
```env
VITE_API_BASE_URL=http://localhost:8081
```

### Start Dev Server
```bash
npm run dev
```
The application will launch at: **`http://localhost:5173`**

---

## 4. Production Build

To compile and verify the optimized production bundle:
```bash
npm run build
```
The output will be placed in `frontend/dist/`.

To preview the production build locally:
```bash
npm run preview
```

---

## 5. Docker Deployment

### Build Docker Image
```bash
cd frontend
docker build -t artistry-studio-frontend:latest .
```

### Run Standalone Container
```bash
docker run -d -p 80:80 --name artistry-studio-frontend artistry-studio-frontend:latest
```
Access the application at `http://localhost`.

### Docker Compose Integration
When orchestrated alongside `artstudioservice`:
```yaml
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "80:80"
    depends_on:
      - artstudioservice
    networks:
      - studio-network

  artstudioservice:
    build:
      context: ./backend/ArtStudioService
      dockerfile: Dockerfile
    ports:
      - "8081:8081"
    networks:
      - studio-network

networks:
  studio-network:
    driver: bridge
```
The bundled `nginx.conf` automatically routes `/artstudio/*` requests from the browser directly to `http://artstudioservice:8081`.

---

## 6. Verified Backend Endpoints

| HTTP Method | Backend Endpoint | Request Payload | Response |
|-------------|------------------|-----------------|----------|
| `GET` | `/artstudio/displayall` | None | `List<ArtStudioResponse>` |
| `GET` | `/artstudio/{id}` | None | `ArtStudioResponse` (or 404) |
| `POST` | `/artstudio/add` | `{ studioName, ownerName, monthlyRent, active }` | `ArtStudioResponse` (201 Created) |
| `PUT` | `/artstudio/update/{id}` | `{ studioName, ownerName, monthlyRent, active }` | `ArtStudioResponse` (200 OK) |
| `DELETE` | `/artstudio/delete/{id}` | None | 204 No Content |

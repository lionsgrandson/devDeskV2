# DevDesk

DevDesk is a full-stack learning project built to teach modern web development by building a real SaaS-style application that combines ideas from Jira, Trello, a CRM, and a client portal.

The project starts from the open-source [Devias Material Kit React](https://github.com/devias-io/material-kit-react) admin dashboard instead of building the visual shell from scratch.

That changes the learning goal slightly: the UI kit gives DevDesk a professional starting layout, but the application logic, data flow, API, database, authentication, authorization, testing, security, and deployment still need to be built and understood.

The goal is not to rush to the finished product. Each stage should introduce a manageable new concept only after the previous stage works.

---

## Starting Frontend

DevDesk uses Devias Material Kit React as the frontend foundation.

At the time this roadmap was updated, that starter uses:

- Next.js 15 with the App Router
- React 19
- TypeScript
- Material UI 7
- Emotion
- React Hook Form
- Zod
- ApexCharts
- Day.js
- Phosphor Icons

The starter already provides dashboard layouts, navigation, authentication screens, account/settings examples, charts, and reusable Material UI components.

### Current repository status

This repository already contains the Devias Material Kit React starter at the repository root. It is not a separate `frontend/` subproject.

Because this repo contains `pnpm-lock.yaml`, use pnpm as the default package manager unless there is a specific reason to change it.

### Quick start

~~~bash
pnpm install
pnpm dev
~~~

Then open:

~~~text
http://localhost:3000
~~~

Useful existing scripts:

~~~bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm typecheck
pnpm format:check
~~~

### Important learning rule

Treat Material Kit as the presentation foundation, not as the application architecture.

Do not blindly keep demo data, fake authentication, sample customers, or template-specific business logic. Replace those parts gradually with DevDesk features that you understand.

---

# Core Architecture

DevDesk should be split into clear frontend, backend, and database responsibilities.

~~~text
Browser
   |
   v
Next.js frontend
Devias Material Kit
   |
   | HTTPS / JSON REST API
   v
Node.js + Express API
   |
   v
Prisma ORM
   |
   v
PostgreSQL
~~~

The frontend must not connect directly to PostgreSQL.

The browser talks to the Express API. The Express API validates requests, enforces authentication and permissions, performs business logic, and communicates with PostgreSQL through Prisma.

---

## Frontend

### Core technologies

- Next.js
- React
- TypeScript
- Material UI
- React Hook Form
- Zod
- Fetch API initially
- TanStack Query later

### Frontend responsibilities

The frontend is responsible for:

- Rendering pages and reusable UI components
- Navigation
- Forms
- Client-side interaction
- Loading and error states
- Calling the backend API
- Displaying authenticated user state
- Hiding actions that are not relevant to the current role
- Optimistic UI updates where appropriate

The frontend is not the security boundary.

A hidden button does not prevent an unauthorized API request. Authorization must always be enforced by the backend.

### Suggested frontend structure

The exact Devias starter structure can evolve, but DevDesk-specific code should gradually move toward a feature-oriented structure.

~~~text
DevDesk/
├── public/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── clients/
│   │   ├── projects/
│   │   ├── tasks/
│   │   └── settings/
│   ├── components/
│   ├── contexts/
│   ├── features/
│   │   ├── auth/
│   │   ├── clients/
│   │   ├── projects/
│   │   └── tasks/
│   ├── hooks/
│   ├── lib/
│   │   ├── api/
│   │   ├── validation/
│   │   └── utils/
│   ├── styles/
│   └── types/
├── package.json
├── pnpm-lock.yaml
└── tsconfig.json
~~~

Do not reorganize the whole Devias template on day one. Refactor toward this structure as real DevDesk features replace demo features.

---

## Backend

### Core technologies

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Zod for request validation
- bcrypt for password hashing
- JWT or secure session-style authentication
- HTTP-only cookies for refresh/session credentials

### Backend responsibilities

The API is responsible for:

- Request validation
- Authentication
- Authorization
- Business rules
- Database access
- Data ownership checks
- Error handling
- Logging
- Rate limiting
- File access rules
- Audit-sensitive actions

### Suggested backend structure

~~~text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── modules/
│   │   ├── auth/
│   │   ├── clients/
│   │   ├── projects/
│   │   ├── tasks/
│   │   └── users/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validation/
│   ├── app.ts
│   └── server.ts
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── tests/
├── package.json
└── tsconfig.json
~~~

Do not add every folder immediately. Start small and split code when responsibilities become clear.

---

## Repository Layout

The target repository layout should become:

~~~text
DevDesk/
├── src/          # Devias Material Kit based Next.js frontend
├── public/
├── backend/      # Express REST API, added in Stage 4
├── package.json  # frontend package
├── pnpm-lock.yaml
├── README.md
├── .gitignore
└── docker-compose.yml   # added later
~~~

The Next.js frontend stays at the repository root. There is no need to move the existing Devias code into a new `frontend/` folder.

When Stage 4 begins, create `backend/` as a separate Node.js application rather than placing Express routes inside the Next.js application.

This separation is intentional because the project is meant to teach how independent frontend and backend systems communicate.

---

## Database

### Core technologies

- PostgreSQL
- Prisma ORM

Initial domain tables:

- users
- clients
- projects
- tasks

Later tables may include:

- project_members
- comments
- messages
- notifications
- files
- invoices
- invoice_items
- activity_logs
- refresh_tokens or sessions

### Core relationships

~~~text
Client
  └── Projects
       └── Tasks

User
  ├── Assigned Tasks
  └── Project Memberships
~~~

Use Prisma to make application development practical, but learn the SQL concepts underneath the ORM.

---

## API Contract

Start with REST.

Example task routes:

~~~http
GET    /api/tasks
GET    /api/tasks/:id
POST   /api/tasks
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
~~~

Example project routes:

~~~http
GET    /api/projects
GET    /api/projects/:id
POST   /api/projects
PATCH  /api/projects/:id
DELETE /api/projects/:id
GET    /api/projects/:id/tasks
~~~

Example client routes:

~~~http
GET    /api/clients
GET    /api/clients/:id
POST   /api/clients
PATCH  /api/clients/:id
DELETE /api/clients/:id
~~~

The API should eventually return consistent success and error formats.

Example error:

~~~json
{
  "success": false,
  "error": {
    "code": "PROJECT_NOT_FOUND",
    "message": "Project does not exist"
  }
}
~~~

---

# Final Application

DevDesk will eventually include:

- Dashboard
- User accounts
- Clients
- Projects
- Tasks
- Kanban board
- Team members
- Role-based permissions
- Client portal
- Messages
- File uploads
- Notifications
- Search
- Invoices
- Activity history
- Testing
- Security
- Production deployment

Example application structure:

~~~text
DevDesk
├── Dashboard
├── Clients
├── Projects
├── Tasks
├── Team
├── Messages
├── Files
├── Invoices
├── Notifications
└── Settings
~~~

---

# Learning Roadmap

## Stage 0: Adopt the Devias Frontend

### Goal

Start from Devias Material Kit React and turn it into the DevDesk frontend foundation.

### Tasks

- [x] Import the Devias Material Kit source
- [ ] Run the starter locally
- [ ] Understand the src/app directory
- [ ] Understand the dashboard layout and navigation
- [ ] Identify reusable Material UI components
- [ ] Identify demo-only pages and fake data
- [ ] Rename branding to DevDesk
- [ ] Keep useful layout/components
- [ ] Remove only demo code that is clearly unnecessary
- [ ] Create the first DevDesk dashboard route

### Concepts to learn

- Next.js App Router
- React component structure
- TypeScript basics
- Material UI
- Layouts
- Server components vs client components
- The "use client" boundary
- Import aliases
- Environment variables

### Rule

Do not redesign the template before you understand how it is assembled.

---

## Stage 1: React Fundamentals Inside the Starter

### Goal

Build a basic task manager using the Devias UI shell with no backend and no database.

A task should contain:

- Title
- Description
- Status
- Priority
- Due date

### Features

- [ ] Display a list of tasks
- [ ] Create reusable TaskCard or TaskRow components
- [ ] Create tasks
- [ ] Mark tasks complete
- [ ] Delete tasks
- [ ] Display task priority
- [ ] Display task status
- [ ] Use Material UI forms and buttons without hiding the React logic

### Concepts to learn

- JSX / TSX
- Components
- Props
- TypeScript interfaces and types
- useState
- Event handlers
- Conditional rendering
- Array map
- Controlled inputs
- Forms
- Lifting state

### Rule

All task data may disappear on refresh. That is intentional.

---

## Stage 2: Next.js Application Structure

### Features

- [ ] Task editing
- [ ] Task search
- [ ] Task filtering
- [ ] Task sorting
- [ ] Project list
- [ ] Project details page
- [ ] Dashboard navigation
- [ ] Not-found page

### Suggested routes

~~~text
/dashboard
/dashboard/projects
/dashboard/projects/[id]
/dashboard/projects/[id]/tasks
/dashboard/tasks
/dashboard/settings
~~~

### Concepts to learn

- App Router
- File-system routing
- Dynamic segments
- Search parameters
- Layouts
- Navigation
- Client vs server components
- useEffect
- useMemo
- Component composition
- Custom hooks
- Derived state
- Form validation

Do not add React Router. Next.js already provides routing.

---

## Stage 3: Browser Persistence

### Technologies

- localStorage
- Browser APIs

### Features

- [ ] Save tasks to localStorage
- [ ] Load tasks after refresh
- [ ] Save projects locally
- [ ] Build a reusable local-storage hook
- [ ] Handle browser-only APIs correctly in Next.js

### Concepts to learn

- JSON serialization
- Browser storage
- Side effects
- useEffect dependencies
- Custom hooks
- Client-only browser APIs

### Main lesson

React state is temporary. Persistence is a separate concern.

---

## Stage 4: First Backend

### Technologies

- Node.js
- Express
- TypeScript
- REST
- Fetch API
- Zod

### Setup

Create backend as a separate application.

~~~text
DevDesk/
├── src/          # existing Next.js frontend
├── public/
├── package.json
└── backend/      # new Express application
~~~

The frontend should receive its API URL from an environment variable such as:

~~~text
NEXT_PUBLIC_API_URL=http://localhost:4000
~~~

The backend can run locally on:

~~~text
http://localhost:4000
~~~

### Features

- [ ] Create Express server
- [ ] Add /api/health
- [ ] Configure environment variables
- [ ] Configure CORS for the frontend origin
- [ ] Connect the Next.js frontend to the Express API
- [ ] Load tasks from the API
- [ ] Create tasks through the API
- [ ] Update tasks through the API
- [ ] Delete tasks through the API
- [ ] Add server-side Zod validation
- [ ] Add centralized error handling

### Concepts to learn

- HTTP
- REST
- GET
- POST
- PATCH
- DELETE
- Status codes
- Headers
- JSON
- Request body
- Route parameters
- Query parameters
- Express middleware
- CORS
- Async/await
- Client/server separation
- Environment configuration
- Validation

---

## Stage 5: PostgreSQL Database

### Technologies

- PostgreSQL
- SQL
- Prisma

### Initial tables

- users
- clients
- projects
- tasks

### Features

- [ ] Connect backend to PostgreSQL
- [ ] Initialize Prisma
- [ ] Store tasks permanently
- [ ] Create clients
- [ ] Create projects
- [ ] Assign tasks to projects
- [ ] Relate projects to clients
- [ ] Add migrations
- [ ] Add seed data

### Concepts to learn

- SELECT
- INSERT
- UPDATE
- DELETE
- JOIN
- Primary keys
- Foreign keys
- Constraints
- Indexes
- One-to-many relationships
- Many-to-many relationships
- Database normalization
- Migrations
- ORM basics

### Rule

Prisma is a tool. SQL is the underlying model you still need to understand.

---

## Stage 6: Authentication

### Technologies

- bcrypt
- JWT or session credentials
- HTTP-only cookies
- Express middleware
- React/Next authentication state

### Features

- [ ] Register
- [ ] Login
- [ ] Logout
- [ ] Password hashing
- [ ] Protected API routes
- [ ] Protected dashboard routes
- [ ] Current-user endpoint
- [ ] Expiring credentials
- [ ] Refresh/session handling
- [ ] Forgot-password flow
- [ ] Password reset flow
- [ ] Replace the Devias demo authentication behavior with the real backend

### Concepts to learn

- Authentication
- Password hashing
- Tokens
- Cookies
- Sessions
- Authentication middleware
- Expiration
- Secure credential storage
- CSRF considerations
- XSS implications of token storage

### Rule

Do not store long-lived authentication credentials in localStorage.

---

## Stage 7: Authorization and Roles

### Roles

- Admin
- Manager
- Developer
- Client

### Features

- [ ] Add roles to users
- [ ] Admin can manage everything
- [ ] Manager can manage projects and tasks
- [ ] Developer can manage assigned work
- [ ] Client can view only their own projects
- [ ] Protect backend routes by permission
- [ ] Add resource ownership checks
- [ ] Hide unavailable frontend actions

### Concepts to learn

- Authentication vs authorization
- RBAC
- Ownership checks
- Permission middleware
- Least privilege
- Backend security boundaries

### Important rule

Hiding a button in React is not security.

Permissions must be enforced by the backend.

---

## Stage 8: Frontend Data Architecture

### Technologies

- TanStack Query
- Existing Devias React contexts where appropriate
- React Hook Form
- Zod

### Features

- [ ] Create reusable API client functions
- [ ] Introduce TanStack Query
- [ ] Add query keys
- [ ] Add loading states
- [ ] Add error states
- [ ] Add mutation handling
- [ ] Add cache invalidation
- [ ] Separate API/server state from local UI state
- [ ] Refactor DevDesk code into feature-specific modules

### Concepts to learn

- Separation of concerns
- Feature-based architecture
- Server state
- Local state
- Global state
- API abstraction
- Cache management
- Invalidating stale data
- Error boundaries

---

## Stage 9: Kanban Board

### Columns

- Todo
- In Progress
- Review
- Done

### Features

- [ ] Display project tasks as columns
- [ ] Drag tasks between columns
- [ ] Save new status to backend
- [ ] Reorder tasks
- [ ] Optimistically update the UI
- [ ] Roll back failed changes

### Concepts to learn

- Complex state
- Drag and drop
- Optimistic updates
- Synchronizing UI and backend
- Rollbacks
- Derived state

---

## Stage 10: CRM Features

### Features

- [ ] Client list
- [ ] Client profile
- [ ] Contact details
- [ ] Client notes
- [ ] Client projects
- [ ] Client activity history
- [ ] Project status
- [ ] Project deadlines
- [ ] Assigned team members

The Devias "Customers" example may be used as a visual/component reference, but its mock data and business logic should be replaced with DevDesk API data.

### Concepts to learn

- Relational data
- Nested resources
- Reusable forms
- CRUD architecture
- Data modeling

---

## Stage 11: File Uploads

### Technologies

- multipart/form-data
- Cloudflare R2 or equivalent object storage

### Features

- [ ] Upload project files
- [ ] Upload client files
- [ ] Download files
- [ ] Delete files
- [ ] Restrict file access
- [ ] Validate file type
- [ ] Validate file size
- [ ] Show upload progress
- [ ] Generate secure download URLs

### Concepts to learn

- File uploads
- MIME types
- Multipart requests
- Object storage
- Signed URLs
- File permissions
- Upload security

---

## Stage 12: Real-Time Messaging

### Technologies

- WebSockets
- Socket.IO

### Features

- [ ] Project chat
- [ ] Live message updates
- [ ] Project-specific rooms
- [ ] Online/offline presence
- [ ] Typing indicator
- [ ] Store message history

### Concepts to learn

- WebSockets
- Persistent connections
- Events
- Rooms
- Real-time state
- Connection lifecycle

---

## Stage 13: Notifications

### Features

- [ ] Notification center
- [ ] Unread count
- [ ] Task assignment notifications
- [ ] Comment notifications
- [ ] Project update notifications
- [ ] Mark notification as read
- [ ] Mark all notifications as read

### Concepts to learn

- Event-driven systems
- Notification state
- Database events
- Background work
- Read/unread state

---

## Stage 14: Global Search

### Features

- [ ] Search clients
- [ ] Search projects
- [ ] Search tasks
- [ ] Search users
- [ ] Debounced search input
- [ ] Highlight matching results

### Technologies

- PostgreSQL search
- SQL LIKE / ILIKE
- Later: PostgreSQL full-text search

### Concepts to learn

- Debouncing
- Search APIs
- Database querying
- Full-text search
- Query performance

---

## Stage 15: Pagination and Large Datasets

### Features

- [ ] Paginate client lists
- [ ] Paginate projects
- [ ] Paginate tasks
- [ ] Add page-size controls
- [ ] Add API metadata
- [ ] Later implement cursor pagination

Example:

~~~http
GET /api/tasks?page=3&limit=25
~~~

### Concepts to learn

- Offset pagination
- Cursor pagination
- Query limits
- API metadata
- Scalable data loading

---

## Stage 16: Invoices

### Features

- [ ] Create invoices
- [ ] Add invoice items
- [ ] Calculate subtotal
- [ ] Calculate tax
- [ ] Mark invoice paid
- [ ] Associate invoice with client
- [ ] Associate invoice with project
- [ ] Invoice history

### Concepts to learn

- Business logic
- Data validation
- Financial data modeling
- Derived values
- Transaction safety

---

## Stage 17: Security

### Topics to test in your own DevDesk development environment

- SQL injection
- XSS
- CSRF
- IDOR
- Broken access control
- Brute-force login attempts
- Malicious file uploads
- JWT/session manipulation
- CORS misconfiguration

### Features

- [ ] Input validation
- [ ] Rate limiting
- [ ] Secure cookies
- [ ] Security headers
- [ ] Authorization checks
- [ ] Ownership checks
- [ ] File validation
- [ ] Login throttling
- [ ] Audit sensitive actions

### Concepts to learn

- OWASP Top 10
- Secure coding
- Defense in depth
- Input validation
- Output encoding
- Broken access control
- IDOR
- CSRF protection
- XSS protection
- Rate limiting

### Security exercise

Attempt to request another client's project by changing an ID in the URL.

The backend must reject access even if the resource exists.

---

## Stage 18: Testing

### Technologies

Frontend:

- Jest
- React Testing Library

Backend:

- Supertest
- Test database

End-to-end:

- Playwright

### Features

- [ ] Unit tests
- [ ] React component tests
- [ ] API integration tests
- [ ] Authentication tests
- [ ] Authorization tests
- [ ] End-to-end tests

Example E2E flow:

~~~text
Register
-> Login
-> Create Client
-> Create Project
-> Create Task
-> Move Task
-> Logout
~~~

### Concepts to learn

- Unit testing
- Integration testing
- End-to-end testing
- Mocking
- Test isolation
- Assertions
- Test fixtures

---

## Stage 19: Error Handling and Logging

### Features

- [ ] Central Express error middleware
- [ ] Standard API error format
- [ ] Frontend error messages
- [ ] Retry behavior
- [ ] 404 handling
- [ ] Server logging
- [ ] Request logging
- [ ] Correlation/request IDs later if useful

### Concepts to learn

- Error middleware
- HTTP semantics
- Structured errors
- Logging
- Debugging
- Retry logic

---

## Stage 20: Performance

### Local performance test data

Generate enough fake data to expose weak architecture:

- 10,000 clients
- 100,000 projects
- 1,000,000 tasks

These numbers are local stress-test targets, not production requirements.

### Features

- [ ] Seed large datasets
- [ ] Measure slow API routes
- [ ] Inspect database queries
- [ ] Add indexes where justified
- [ ] Reduce unnecessary React renders
- [ ] Use Next.js route/code splitting appropriately
- [ ] Add caching where justified
- [ ] Measure before optimizing

### Concepts to learn

- Database indexes
- Query optimization
- N+1 queries
- React rendering
- Memoization
- Code splitting
- Caching
- Performance measurement

---

## Stage 21: Redis and Background Work

### Technologies

- Redis

### Features

- [ ] Cache selected expensive data
- [ ] Store short-lived values
- [ ] Add background jobs
- [ ] Queue notifications or emails
- [ ] Understand cache invalidation

### Concepts to learn

- Caching
- TTL
- Queues
- Background jobs
- Distributed state
- Cache invalidation

---

## Stage 22: Docker

### Technologies

- Docker
- Docker Compose

### Services

- Frontend
- Backend
- PostgreSQL
- Redis

### Features

- [ ] Dockerize Next.js frontend
- [ ] Dockerize Express backend
- [ ] Run PostgreSQL in Docker
- [ ] Run Redis in Docker
- [ ] Persist database volumes
- [ ] Configure service networking
- [ ] Use environment variables

### Concepts to learn

- Images
- Containers
- Volumes
- Networks
- Docker Compose
- Environment configuration
- Development vs production environments

---

## Stage 23: CI/CD

### Technologies

- GitHub Actions

### Pipeline

~~~text
git push
   |
   v
lint + typecheck
   |
   v
tests
   |
   v
frontend build + backend build
   |
   v
deploy
~~~

### Features

- [ ] Run linting on push
- [ ] Run TypeScript checks
- [ ] Run tests
- [ ] Build frontend
- [ ] Build backend
- [ ] Prevent deployment when checks fail
- [ ] Deploy automatically after successful checks

### Concepts to learn

- CI
- CD
- Build pipelines
- Automated quality gates
- Deployment automation

---

## Stage 24: Production Deployment

### Suggested architecture

~~~text
Frontend
Next.js hosting such as Vercel
        |
        v
Backend
Railway / Render / VPS / another Node-compatible host
        |
        v
Managed PostgreSQL

File storage
Cloudflare R2
~~~

Other deployment targets are valid, but the hosting platform must support the application being deployed. A Next.js frontend should not be treated like the old Vite static build without accounting for its runtime requirements.

### Features

- [ ] Production frontend
- [ ] Production API
- [ ] Production database
- [ ] Production file storage
- [ ] Environment variables
- [ ] HTTPS
- [ ] Custom domain
- [ ] Logging
- [ ] Monitoring
- [ ] Database backups
- [ ] Correct production CORS/cookie configuration

### Concepts to learn

- Production configuration
- HTTPS
- DNS
- Environment variables
- Deployment
- Monitoring
- Backups
- Production debugging
- Cross-origin authentication

---

# Development Environments

Use separate environment configuration for frontend and backend.

The frontend configuration belongs at the repository root, normally in `.env.local`.

Example frontend environment:

~~~text
NEXT_PUBLIC_API_URL=http://localhost:4000
~~~

The backend should keep its own environment file under `backend/`.

Example backend environment:

~~~text
PORT=4000
DATABASE_URL=postgresql://...
FRONTEND_ORIGIN=http://localhost:3000
JWT_ACCESS_SECRET=...
JWT_REFRESH_SECRET=...
~~~

Never commit real secrets.

Provide a root `.env.example` for frontend variables and `backend/.env.example` for backend variables. Neither file should contain real credentials.

---

# Frontend and Backend Boundary

A useful rule for deciding where code belongs:

### Frontend

"How should this look and behave for the user?"

Examples:

- Open a task modal
- Render a project list
- Disable a submit button while saving
- Show validation feedback
- Display API errors
- Change Kanban columns visually

### Backend

"Is this request allowed, valid, and safe, and how should the system change?"

Examples:

- Can this user access the project?
- Does this task exist?
- Is this status transition valid?
- Is the client owned by this organization?
- Should this database record be created?
- Is this uploaded file allowed?
- Should this action be written to the audit log?

### Database

"What durable state and relationships must be stored?"

Examples:

- Users
- Clients
- Projects
- Tasks
- Assignments
- Messages
- Invoices
- Activity history

---

# Optional Advanced Stages

After the core project is complete:

- [ ] Email notifications
- [ ] OAuth / Google login
- [ ] Two-factor authentication
- [ ] Audit logs
- [ ] Project comments
- [ ] Mentions
- [ ] Email invitations
- [ ] PDF invoice generation
- [ ] Advanced analytics dashboard
- [ ] Dark mode
- [ ] Accessibility audit
- [ ] PWA support
- [ ] Internationalization
- [ ] API documentation with OpenAPI / Swagger
- [ ] Database transactions
- [ ] Webhooks
- [ ] Multi-tenant organizations
- [ ] Subscription billing
- [ ] Feature flags

TypeScript is no longer an optional migration because the selected Devias starter already uses TypeScript.

---

# Learning Rules

This repository is primarily a learning project.

1. Build each stage before moving to the next.
2. Do not add a technology before there is a problem that justifies it.
3. Understand the code before accepting generated code.
4. Keep frontend, backend, and database responsibilities separate.
5. Use the Devias template for UI acceleration, not to skip learning React.
6. Security must be enforced on the server.
7. Test important behavior, not implementation details.
8. Refactor when complexity becomes visible instead of trying to design everything perfectly on day one.
9. Commit frequently with meaningful commit messages.
10. Break large features into small tasks.
11. If something works but you cannot explain why, it is not finished from a learning perspective.
12. When AI generates code, review every changed file and be able to explain the data flow before moving on.

---

# Recommended Workflow

For each stage:

1. Read the requirements.
2. Identify which code comes from the Devias starter and which code is DevDesk-specific.
3. Break the stage into small tasks.
4. Implement one task.
5. Run and test it.
6. Inspect browser network requests and application logs when backend communication is involved.
7. Review the code.
8. Fix problems.
9. Commit the change.
10. Move to the next task.

The objective is to progress from React fundamentals inside a professional UI starter to being able to design, build, secure, test, deploy, and maintain a complete full-stack application.

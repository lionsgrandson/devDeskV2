# DevDesk

DevDesk is a learning project for building a small CRM and business dashboard from a clean, understandable starting point.

It is intended for a small service business. The goal is not to start with a finished ERP or a dashboard full of fake features. The goal is to begin with a useful shell, understand every part of it, and add real functionality one step at a time.

## Current scope

The app intentionally starts with only two main areas:

- **Overview**: client count, monthly revenue, monthly profit, and one simple revenue chart.
- **Clients**: three clearly fake client records in a basic table.

There are no fake Import, Export, Add, Sync, notification, integration, order, product, traffic, or task-management controls in the starting UI.

Demo authentication is kept only so the protected dashboard shell works. It will be replaced when real backend authentication is built.

## Starting stack

The frontend is based on [Devias Material Kit React](https://github.com/devias-io/material-kit-react), but most of the demo dashboard surface has been removed.

- Next.js 15
- React 19
- TypeScript
- Material UI 7
- React Hook Form
- Zod
- ApexCharts

The Next.js frontend stays at the repository root.

```text
DevDesk/
├── public/
├── src/
├── package.json
├── pnpm-lock.yaml
└── README.md
```

A separate `backend/` application should be added only when the project reaches the backend stage.

## Quick start

```bash
pnpm install
pnpm dev
```

Open:

```text
http://localhost:3000
```

Demo login:

```text
Email: demo@devdesk.local
Password: Secret1
```

## Build it gradually

### Stage 1: Make clients interactive

Start with one real feature.

- [V] Move the demo client data into component state - created a JSON file imported it with the same name "cusotmers" as the current variable
- [ ] Add a working Add Client form
- [ ] Edit a client
- [ ] Delete a client
- [ ] Add search only when it actually filters the data

Learn:

- Components
- Props
- TypeScript types
- `useState`
- Controlled forms
- Event handlers
- Array updates, `map`, and `filter`

Rule: if a button is visible, it should work.

### Stage 2: Client details and local persistence

- [ ] Add `/dashboard/customers/[id]`
- [ ] Give a client notes and useful contact information
- [ ] Save the local client data to `localStorage`
- [ ] Restore it after refresh

This stage teaches the difference between React state and persistence.

### Stage 3: First backend

Create a separate Express API under `backend/`.

```text
Browser
   |
   v
Next.js frontend
   |
   | JSON / REST
   v
Node.js + Express API
```

Start only with clients:

```http
GET    /api/clients
GET    /api/clients/:id
POST   /api/clients
PATCH  /api/clients/:id
DELETE /api/clients/:id
```

Use Zod for request validation and return consistent API errors.

### Stage 4: PostgreSQL

Add PostgreSQL and Prisma after the API flow is understood.

Start with only:

- users
- clients

Add more tables only when a real feature requires them.

### Stage 5: Real authentication

Replace the current demo localStorage authentication.

Learn:

- Password hashing
- Cookies / sessions or token strategy
- Protected API routes
- Authorization
- Ownership checks

### Stage 6: Add business features one at a time

Do not add all of these at once.

A sensible order for a service business is:

1. Projects attached to clients
2. Tasks attached to projects
3. Lead / sales status
4. Revenue and invoices
5. Expenses or budget tracking, if it becomes useful

Each module should be added because the app needs it, not because the original template included something similar.

### Stage 7: Quality and deployment

After the core workflow is real:

- Testing
- Error handling
- Security review
- Docker if useful
- CI/CD
- Production deployment

## Later, only if needed

These are deliberately not part of the starting app:

- Integrations
- Notifications
- File uploads
- Kanban
- Real-time chat
- Global search
- Advanced analytics
- Redis
- Multi-tenant organizations
- Subscription billing

## Architecture rule

Keep responsibilities separate.

Frontend:

> How should the user see and interact with this?

Backend:

> Is the request valid and allowed, and what business operation should happen?

Database:

> What state must survive permanently?

The frontend is not the security boundary.

## Learning rule

If a control is visible, it should work.

If a feature is not being built yet, leave it out of the UI.

The objective is to understand and build a useful CRM from a small base, rather than starting with a large template and trying to understand dozens of fake features at the same time.

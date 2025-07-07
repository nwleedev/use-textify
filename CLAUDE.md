# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Use Textify is a comprehensive AI prompt sharing platform built as a monorepo with three main services:

- **Web** (Next.js): Frontend application with Feature Sliced Design architecture
- **Cron** (Node.js): Background service for AI-powered content generation
- **DB** (PocketBase): Database with custom hooks and real-time API

## Tech Stack

### Frontend (web/)

- Next.js 14 with App Router
- TypeScript with strict mode
- Tailwind CSS 3.4.1 + DaisyUI 5.0.38
- TanStack Query for server state management
- React Hook Form + Zod for form validation
- Serwist for PWA functionality
- Deployed on Cloudflare Pages

### Backend Services

- **Cron**: Express.js + OpenAI API + Anthropic SDK
- **Database**: PocketBase with custom JavaScript hooks
- **AI Integration**: OpenAI GPT models for content generation

## Development Commands

### Database

```bash
pnpm db:dev              # Start PocketBase dev server (127.0.0.1:3001)
```

### Web Application

```bash
pnpm web:dev             # Start Next.js dev server (localhost:3000)
pnpm web:build           # Build for production
pnpm web:lint            # Run ESLint
pnpm web:preview         # Preview production build
pnpm web:cf-deploy       # Deploy to Cloudflare Pages
```

### Cron Service

```bash
pnpm cron:dev            # Start with ts-node
pnpm cron:build          # Build TypeScript
pnpm cron:start          # Start built service
```

## Architecture

### Feature Sliced Design (FSD)

The web application follows strict FSD principles with 5 layers:

1. **app/** - Routing and global providers (Next.js App Router)
2. **widgets/** - Complex UI compositions
3. **features/** - Business logic and user interactions
4. **entities/** - Domain models and entity-specific UI
5. **shared/** - Infrastructure and reusable utilities and components

**Import Rules**: Higher layers can import from lower layers only. No upward imports allowed.

### Key Directories

```
web/
├── app/                    # Next.js App Router (routes, layouts, providers)
├── entities/               # Domain models (auth, feed, category, tag, comment)
├── features/               # Business logic (auth workflows, feed management)
├── shared/                 # Infrastructure (PocketBase client, TanStack Query) & Shared UI components
├── widgets/                # UI compositions (feed grids, auth forms)
└── tailwind.config.ts      # Includes all FSD layers in content paths
```

## Development Patterns

### Database Integration

- Use PocketBase client from `shared/lib/pocketbase/client.ts`
- Server-side client available at `shared/lib/pocketbase/server/client.ts`
- TanStack Query for data fetching with proper query keys

### Form Handling

- React Hook Form with Zod validation
- Form-level validation using `zodResolver`
- Consistent error handling patterns

### AI Content Generation

- OpenAI integration in cron service
- Structured prompt templates for quality content
- Background processing for feed generation

## Common Tasks

### Adding New Features

1. If you need new ui, create core component in `shared/ui/`
1. Start with entity models in `entities/[domain]/lib/`
1. Create feature logic in `features/[feature]/lib/`
1. Build UI and feature components in `features/[feature]/ui/`
1. Compose widgets in `widgets/[widget]/ui/`
1. Wire to app routes in `app/`

### Database Schema Changes

1. Create migration in `db/pb_migrations/`
2. Update TypeScript types in `db/pb_data/types.d.ts`
3. Update entity models in `entities/[domain]/lib/model.ts`

### Testing

- No test framework currently configured
- Manual testing through development servers
- Use TypeScript strict mode for type safety

## Environment Setup

### Required Environment Variables

- **Web**: Google OAuth2 credentials, PocketBase URL
- **Cron**: OpenAI API key, Anthropic API key, PocketBase credentials
- **DB**: PocketBase runs locally with file-based SQLite

### Development Workflow

1. Start database: `pnpm db:dev`
2. Start web app: `pnpm web:dev`
3. Start cron service (if needed): `pnpm cron:dev`
4. Access admin panel: http://127.0.0.1:3001/_/

## Code Quality

### Linting and TypeScript

- Always run `pnpm web:lint` before commits
- TypeScript strict mode enforced
- ESLint with Next.js and TanStack Query plugins

### Design Guidelines

- Follow FSD layer boundaries strictly
- Use descriptive component and variable names
- Implement proper error boundaries
- Maintain consistent UI patterns with DaisyUI

### AI Integration Best Practices

- Use structured prompts for consistent output
- Implement proper error handling for API calls
- Background processing for long-running tasks
- Quality control for generated content

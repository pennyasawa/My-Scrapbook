# replit.md

## Overview

This is a **New Year Boarding Pass** interactive web application that creates a nostalgic, travel-themed digital experience for end-of-year reflection. Users interact with a realistic boarding pass design to personalize their "journey" into 2026, selecting things to let go of, keep, and manifest for the new year. The experience saves progress to localStorage and supports exporting the customized boarding pass as an image.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite with custom configuration for path aliases
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React useState/useEffect for local state
- **Styling**: Tailwind CSS with custom theme configuration using CSS variables
- **UI Components**: shadcn/ui component library (Radix UI primitives with custom styling)
- **Animations**: Framer Motion for smooth transitions and interactions
- **Local Persistence**: localStorage for saving user progress between sessions

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts`
- **Session Management**: Express sessions with connect-pg-simple for PostgreSQL session storage

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with Zod schema validation via drizzle-zod
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Migrations**: Drizzle Kit with output to `./migrations` directory

### Project Structure
```
├── client/           # Frontend React application
│   └── src/
│       ├── components/   # UI components (shadcn/ui)
│       ├── hooks/        # Custom React hooks
│       ├── lib/          # Utilities and query client
│       └── pages/        # Page components
├── server/           # Backend Express application
├── shared/           # Shared types, schemas, and API definitions
├── attached_assets/  # Design reference files
└── migrations/       # Database migrations
```

### Key Design Decisions
1. **Monorepo Structure**: Single repository with client, server, and shared code for type safety across the stack
2. **Shared Schema**: Database schema and API types defined once in `shared/` and imported by both client and server
3. **Anonymous User Tracking**: Uses session IDs rather than full authentication for a frictionless experience
4. **Component Library**: shadcn/ui provides accessible, customizable components while maintaining consistent design

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **connect-pg-simple**: Session storage in PostgreSQL

### Frontend Libraries
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for interactive elements
- **html2canvas**: Export boarding pass as downloadable image
- **Radix UI**: Accessible component primitives (via shadcn/ui)
- **Tailwind CSS**: Utility-first styling

### Backend Libraries
- **Drizzle ORM**: Type-safe database queries
- **Zod**: Runtime schema validation
- **Express**: HTTP server framework

### Development Tools
- **Vite**: Frontend build and dev server
- **esbuild**: Production server bundling
- **drizzle-kit**: Database migration tooling
- **TypeScript**: Type checking across the entire codebase
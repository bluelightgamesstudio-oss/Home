# Bluelight Games Studio

## Overview

Bluelight Games Studio is a gaming company website built as a full-stack TypeScript application. The site showcases games, news updates, team members, and provides contact functionality. It features a futuristic cyberpunk aesthetic with multilingual support (English, French, Arabic) and user authentication via Replit Auth.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack Query for server state, React Context for global UI state (language)
- **Styling**: Tailwind CSS with custom cyberpunk/gaming theme, shadcn/ui component library
- **Animations**: Framer Motion for page transitions and scroll effects
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript (ESM modules)
- **API Pattern**: RESTful endpoints defined in `shared/routes.ts` with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: express-session with connect-pg-simple for PostgreSQL session storage

### Data Storage
- **Database**: PostgreSQL (requires DATABASE_URL environment variable)
- **Schema Location**: `shared/schema.ts` defines all tables (games, news, team, messages, users, sessions)
- **Migrations**: Drizzle Kit with `db:push` command for schema synchronization

### Authentication
- **Provider**: Replit Auth (OpenID Connect)
- **Implementation**: Passport.js with custom Replit OIDC strategy
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple
- **Protected Routes**: Middleware pattern with `isAuthenticated` guard

### Key Design Patterns
- **Shared Types**: Schema definitions in `shared/` directory are used by both frontend and backend
- **API Contract**: Routes defined with Zod schemas for request/response validation
- **Storage Pattern**: `IStorage` interface abstracts database operations for testability
- **Component Architecture**: Reusable UI components in `client/src/components/ui/` (shadcn)

### Build Configuration
- **Development**: Vite dev server with HMR, proxied through Express
- **Production**: Client built to `dist/public`, server bundled with esbuild to `dist/index.cjs`
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

## External Dependencies

### Database
- PostgreSQL database (connection via DATABASE_URL environment variable)
- Drizzle ORM for type-safe queries
- connect-pg-simple for session persistence

### Authentication
- Replit Auth (OpenID Connect provider)
- Requires REPL_ID and SESSION_SECRET environment variables
- Uses ISSUER_URL defaulting to https://replit.com/oidc

### UI Libraries
- shadcn/ui components (Radix UI primitives)
- Framer Motion for animations
- Lucide React for icons
- Google Fonts (Oxanium, Rajdhani, Space Mono)

### Development Tools
- Replit Vite plugins (cartographer, dev-banner, runtime-error-modal)
- TypeScript with strict mode
- Tailwind CSS with PostCSS/Autoprefixer
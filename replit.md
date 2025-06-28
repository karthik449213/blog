# ModernBlog - Professional Blog Platform

## Overview

ModernBlog is a full-stack blog platform built with React, Express.js, and PostgreSQL. The application features a modern responsive design with markdown support, SEO optimization, and a clean user interface for reading and managing blog posts.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: TailwindCSS with shadcn/ui component library
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with custom styling via shadcn/ui

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **API**: REST API with JSON responses
- **Validation**: Zod for runtime type validation

### Database Schema
- **Posts Table**: Contains id, title, content, tags (array), and created_at fields
- **Users Table**: Basic user structure with id, username, and password fields
- **Database Provider**: Neon PostgreSQL with connection pooling

## Key Components

### Frontend Components
- **Layout**: Responsive header with navigation and mobile menu
- **BlogCard**: Reusable component for displaying post previews with featured post variant
- **MarkdownRenderer**: Custom markdown parser for blog content rendering
- **Pages**: Home (post listing), BlogDetail (individual post), and NotFound
- **UI Library**: Complete shadcn/ui component set for consistent design

### Backend Components
- **Storage Layer**: Abstract storage interface with PostgreSQL implementation
- **Routes**: RESTful endpoints for CRUD operations on posts
- **Database**: Drizzle ORM with schema definitions and migrations
- **Error Handling**: Centralized error handling middleware

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data
2. **API Layer**: Express.js routes handle HTTP requests and validate input
3. **Storage Layer**: Abstract storage interface allows for different database implementations
4. **Database**: Drizzle ORM executes type-safe queries against PostgreSQL
5. **Response**: JSON data flows back through the same layers to the client

## External Dependencies

### Frontend Dependencies
- React ecosystem (React, React DOM, React Query)
- UI/UX libraries (Radix UI, shadcn/ui, TailwindCSS)
- Utility libraries (date-fns, clsx, class-variance-authority)
- Development tools (Vite, TypeScript, Wouter)

### Backend Dependencies
- Server framework (Express.js, TypeScript)
- Database tools (Drizzle ORM, Neon serverless client)
- Validation (Zod for schema validation)
- Development utilities (tsx for TypeScript execution, esbuild for production)

### Development Dependencies
- Replit-specific plugins for error handling and cartographer
- PostCSS and Autoprefixer for CSS processing
- Font Awesome for icons and Google Fonts for typography

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React application to `dist/public`
- **Backend**: esbuild bundles TypeScript server code to `dist/index.js`
- **Database**: Drizzle Kit handles schema migrations and database pushes

### Environment Configuration
- **Development**: Uses tsx for direct TypeScript execution
- **Production**: Runs compiled JavaScript with Node.js
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Hosting Considerations
- Static frontend can be served from Express.js or separate CDN
- Backend requires Node.js runtime with PostgreSQL database access
- Database migrations handled via Drizzle Kit commands

## Changelog

```
Changelog:
- June 28, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
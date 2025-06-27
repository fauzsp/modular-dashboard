# Dashboard Application

## Overview

This is a full-stack dashboard application built with React, Express, and GraphQL. The application provides a comprehensive admin dashboard with metrics visualization, user statistics, analytics, and notifications management. It uses a modern tech stack with TypeScript, Tailwind CSS, and shadcn/ui components for a polished user experience.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: Redux Toolkit for global state management
- **Data Fetching**: Dual approach using both Apollo Client (GraphQL) and TanStack Query (REST)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **API Layer**: Hybrid approach with both GraphQL (Apollo Server) and REST endpoints
- **Real-time**: WebSocket support for GraphQL subscriptions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Express sessions with PostgreSQL store

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon (serverless)
- **ORM**: Drizzle ORM for type-safe database queries and migrations
- **In-Memory Storage**: Fallback memory storage implementation for development
- **Session Store**: PostgreSQL-backed session storage using connect-pg-simple

## Key Components

### Database Schema
The application uses a well-structured PostgreSQL schema with the following main tables:
- **users**: User accounts with authentication and profile information
- **metrics**: Dashboard KPI metrics with values, changes, and display properties
- **userStats**: User engagement statistics and session data
- **analytics**: Page view and visitor analytics with chart data
- **notifications**: User notification system with read/unread states

### Authentication & Authorization
- Role-based access control with user roles (admin, user)
- Session-based authentication using Express sessions
- Password hashing and secure user management

### Real-time Features
- WebSocket connections for live updates
- GraphQL subscriptions for real-time data synchronization
- Live dashboard metrics updates

### UI Components
- Modular dashboard components (MetricsOverview, UserStats, Analytics, Notifications)
- Responsive design with mobile-first approach
- Dark/light theme support with CSS custom properties
- Comprehensive UI component library from shadcn/ui

## Data Flow

1. **Client Requests**: Frontend components dispatch Redux actions or use Apollo Client queries
2. **API Layer**: Express server handles both REST endpoints and GraphQL resolvers
3. **Data Access**: Storage layer abstracts database operations with Drizzle ORM
4. **Real-time Updates**: WebSocket connections enable live data synchronization
5. **State Management**: Redux store maintains client-side state with normalized data
6. **UI Updates**: React components automatically re-render based on state changes

## External Dependencies

### Development Tools
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast bundling for production builds
- **Drizzle Kit**: Database migration and schema management
- **Vite Plugins**: Development tools including error overlay and cartographer

### UI & Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Class Variance Authority**: Component variant management

### Data & API
- **Apollo Client/Server**: GraphQL implementation
- **TanStack Query**: Server state management for REST APIs
- **Recharts**: Chart visualization library
- **GraphQL WS**: WebSocket transport for GraphQL subscriptions

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:
- **Development**: `npm run dev` - Runs both client and server in development mode
- **Build**: `npm run build` - Creates optimized production build
- **Production**: `npm run start` - Serves the built application
- **Database**: Uses Neon PostgreSQL with connection pooling
- **Static Assets**: Served from dist/public directory
- **Port Configuration**: Configured for port 5000 with external port 80

### Environment Configuration
- NODE_ENV-based configuration switching
- DATABASE_URL environment variable for database connection
- Replit-specific optimizations and error handling
- PostgreSQL module integration for production database connectivity

## Changelog

Changelog:
- June 27, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.
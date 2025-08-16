# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview & Goals

FundAFriend is an online platform that makes it easy for friends and family to financially support each other's projects. The platform addresses two key pain points:

1. **Reducing awkwardness** around asking for financial support from personal networks
2. **Maintaining accountability** through transparent project updates and progress tracking

### User Stories

**Project Creator**: "As a person working on a project, I want to make it less awkward to get funding from friends and family, and I want to stay accountable on my projects."

**Supporter**: "As a person who wants to support their friend's projects and passions, I want to be able to support them financially while seeing where the money is being spent."

### Core Features

1. **Shareable Project Pages**: Each project has a dedicated page showing title, description, goals, funding rationale, and contribution CTA. These pages are designed to be shared via social media, text messages, and direct outreach.

2. **Creator Dashboard**: Shows contribution analytics, supporter details, funding progress over time, and tools to create project updates.

3. **Supporter Dashboard**: Displays all projects the user supports with contribution history and recent updates.

4. **Project Updates Feed**: Creators can post updates that appear on project pages and supporter dashboards, maintaining transparency and accountability.

## Development Commands

- `npm run dev` - Start development server (uses --turbopack for fast refresh)
- `npm run build` - Build for production 
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technical Architecture

This is a Next.js 15 platform built with TypeScript, Tailwind CSS, and a custom in-memory data store optimized for rapid prototyping and development.

### Core Application Structure

- **Single Page Application**: The main app logic is in `src/app/page.tsx` with view routing handled via React state
- **View System**: Uses a `ViewType` enum to switch between: `projects`, `project-detail`, `creator`, `supporter`, `update`
- **Data Management**: Custom TypeScript data store (`src/lib/dataStore.ts`) with localStorage persistence via React hooks
- **Component Architecture**: Page-level components for each view, plus reusable UI components

### Data Layer

The application uses a custom in-memory data store pattern:

- **DataStore Class** (`src/lib/dataStore.ts`): Singleton pattern with methods for data operations
- **useDataStore Hook** (`src/hooks/useDataStore.tsx`): React hook providing persistence and data access
- **Type Definitions** (`src/lib/types.ts`): Comprehensive TypeScript interfaces for all data entities

Key data entities: `User`, `Project`, `Contribution`, `Update`, `ProjectSupporter`, `Category`

### UI Components

Located in `src/components/ui/` with standardized patterns:
- Uses `class-variance-authority` for component variants
- Tailwind CSS with custom design tokens
- All components export TypeScript interfaces
- Index file (`src/components/ui/index.ts`) for clean imports

### Page Components & Feature Mapping

Major page components in `src/components/` aligned with core features:

- `ProjectOverview.tsx` - Main project listing (entry point for discovering projects)
- `ProjectPage.tsx` - **Shareable project pages** - Individual project detail view with contribution CTA and recent updates
- `CreatorDashboard.tsx` - **Creator dashboard** - Project management, analytics, and update creation tools
- `SupporterDashboard.tsx` - **Supporter dashboard** - Shows all supported projects with contribution history
- `UpdateDetail.tsx` - **Project updates feed** - Detailed view of project updates for transparency

### Key Development Patterns

- **Path Aliases**: Uses `@/*` to reference `src/*` (configured in `tsconfig.json`)
- **State Management**: React useState for local state, custom hooks for data persistence
- **Navigation**: Programmatic view switching rather than Next.js routing
- **Styling**: Tailwind with consistent color palette and component variants
- **TypeScript**: Strict mode enabled, comprehensive type coverage

### Data Flow

1. Application initializes with `useDataStore()` hook
2. Data loads from localStorage on mount (if available)
3. Views access data through the DataStore singleton
4. Changes persist automatically to localStorage
5. Components receive data via props from parent page component

## Development Principles

### User Experience Focus
- **Shareability**: Project pages must work well when shared via social media, text, or email
- **Transparency**: All financial contributions and project progress should be visible to supporters
- **Accountability**: Creators are encouraged to post regular updates to maintain supporter trust
- **Low Friction**: Minimize barriers to both asking for and providing financial support

### Technical Decisions
- **Prototype-First**: Uses localStorage and in-memory data store for rapid iteration
- **Component Reusability**: Consistent UI patterns across all views
- **Type Safety**: Comprehensive TypeScript coverage for reliable development
- **Mobile-First**: Responsive design optimized for sharing on mobile devices
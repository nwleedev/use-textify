# Use Textify

**Share your awesome prompts with users** - A comprehensive platform for creating, managing, and sharing AI/LLM prompts with advanced features like variables, notices, and community collaboration.

## 📖 Table of Contents

- [📋 Project Overview](#-project-overview)
  - [🎯 What is Use Textify?](#-what-is-use-textify)
  - [✨ Key Features](#-key-features)
  - [🏗️ Repository Type](#️-repository-type)
- [🔧 Tech Stack](#-tech-stack)
  - [📱 Frontend (Web)](#-frontend-web)
  - [🖥️ Backend Services](#️-backend-services)
  - [📊 Database](#-database)
- [🎨 Architecture](#-architecture)
  - [📐 Feature Sliced Design (FSD)](#-feature-sliced-design-fsd)
  - [🏛️ Layer Structure](#️-layer-structure)
  - [📦 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
  - [📋 Prerequisites](#-prerequisites)
  - [⚙️ Installation](#️-installation)
  - [🏃‍♂️ Running the Application](#️-running-the-application)
- [📖 Usage Guide](#-usage-guide)
  - [👤 User Features](#-user-features)
  - [🤖 AI Integration](#-ai-integration)
- [🛠️ Development](#️-development)
  - [📁 Directory Structure](#-directory-structure)
  - [🔄 Available Scripts](#-available-scripts)
  - [🎯 Development Workflow](#-development-workflow)

## 📋 Project Overview

### 🎯 What is Use Textify?

Use Textify is a modern web platform designed to help users create, share, and discover high-quality AI/LLM prompts. The platform enables prompt creators to build sophisticated prompt templates with dynamic variables, helpful notices, and community-driven categorization.

### ✨ Key Features

- **📝 Advanced Prompt Creation**

  - Rich text prompt editor with markdown support
  - Dynamic variable system for reusable prompts
  - Contextual notices and warnings for prompt usage
  - Category-based organization with visual icons

- **🔍 Discovery & Search**

  - Advanced search functionality with filters
  - Category-based browsing with intuitive icons
  - Tag-based filtering and discovery
  - Infinite scroll pagination for seamless browsing

- **👥 Community Features**

  - User authentication via Google OAuth2
  - Public prompt sharing and collaboration
  - Community-driven tagging system
  - User profiles and contribution tracking

- **🤖 AI-Powered Generation**

  - Automated prompt generation using OpenAI GPT
  - Concept-based prompt creation
  - Quality-controlled content generation
  - Scheduled background processing for content creation

- **📱 Modern User Experience**
  - Progressive Web App (PWA) capabilities
  - Mobile-responsive design with Tailwind CSS
  - DaisyUI components for consistent styling
  - Service worker for offline functionality

### 🏗️ Repository Type

This is a **monorepo** managed with **pnpm workspaces**, containing three main packages:

- `web/` - Next.js frontend application
- `cron/` - Node.js background service for AI generation
- `db/` - PocketBase database with custom hooks and migrations

## 🔧 Tech Stack

### 📱 Frontend (Web)

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**:
  - Tailwind CSS 3.4.1
  - DaisyUI 5.0.38 for component library
  - Custom design system with consistent theming
- **State Management**:
  - TanStack Query for server state
  - React Hook Form for form management
  - Zod for schema validation
- **UI Components**:
  - Lucide React for icons
  - Custom component library following FSD architecture
- **Development Tools**:
  - ESLint with Next.js configuration
  - TypeScript strict mode
  - TanStack Query ESLint plugin

### 🖥️ Backend Services

- **Cron Service**:

  - Node.js with Express
  - OpenAI API integration
  - TypeScript with ts-node for development
  - Environment-based configuration with dotenv

- **Database Backend**:
  - PocketBase as primary database and API
  - Custom JavaScript hooks for business logic
  - Real-time subscriptions and authentication
  - File upload and management capabilities

### 📊 Database

- **Primary Database**: PocketBase (SQLite-based)
- **Key Collections**:
  - `feeds` - Main prompt/feed storage
  - `categories` - Prompt categorization
  - `tags` - Flexible tagging system
  - `feed_variables` - Dynamic prompt variables
  - `feed_notices` - Usage warnings and tips
  - `comments` - Community interaction
  - `usernames` - User profile management

## 🎨 Architecture

### 📐 Feature Sliced Design (FSD)

Use Textify follows the **Feature Sliced Design** architectural methodology, providing a scalable and maintainable code organization. FSD enforces strict dependency rules and promotes modular development.

### 🏛️ Layer Structure

The application is organized into five distinct layers with clear dependency rules:

1. **`app/` - Application Layer (Highest)**

   - Next.js App Router pages and layouts
   - Route handlers and server actions
   - Global providers and configuration
   - Can import from: `widgets`, `features`, `entities`, `shared`

2. **`widgets/` - UI Composition Layer**

   - Complex UI blocks combining multiple features
   - Page-level components and layouts
   - Navigation and structural elements
   - Can import from: `features`, `entities`, `shared`

3. **`features/` - Business Logic Layer**

   - User interactions and workflows
   - API integrations and data mutations
   - Business rules and validation logic
   - Can import from: `entities`, `shared`

4. **`entities/` - Domain Models Layer**

   - Domain types and interfaces
   - Core business models
   - Entity-specific UI components
   - Can import from: `shared` only

5. **`shared/` - Infrastructure Layer (Lowest)**
   - Reusable utilities and helpers
   - UI component library
   - Configuration and constants
   - Cannot import from any other layer

### 📦 Project Structure

```
use-textify/
├── web/                          # Next.js Frontend Application
│   ├── app/                      # App Router (FSD: Application Layer)
│   │   ├── (entry)/             # Route groups for organization
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout with providers
│   │   └── providers/           # Global React providers
│   ├── entities/                # FSD: Domain Models Layer
│   │   ├── auth/                # Authentication domain
│   │   ├── category/            # Category management
│   │   ├── comment/             # Comment system
│   │   ├── feed/                # Core prompt/feed domain
│   │   ├── tag/                 # Tagging system
│   │   └── username/            # User profile management
│   ├── features/                # FSD: Business Logic Layer
│   │   ├── auth/                # Authentication workflows
│   │   ├── category/            # Category management features
│   │   ├── comment/             # Comment functionality
│   │   ├── feed/                # Feed/prompt management
│   │   ├── tag/                 # Tag management
│   │   └── utils/               # Feature-specific utilities
│   ├── shared/                  # FSD: Infrastructure Layer
│   │   ├── lib/                 # Shared libraries and utilities
│   │   └── ui/                  # Reusable UI components
│   └── widgets/                 # FSD: UI Composition Layer
│       ├── auth/                # Authentication UI blocks
│       ├── category/            # Category display widgets
│       ├── comment/             # Comment UI components
│       └── feeds/               # Feed/prompt display widgets
├── cron/                        # Background Processing Service
│   ├── src/
│   │   ├── app.ts              # Express server entry point
│   │   └── lib/
│   │       ├── client/         # API clients (OpenAI)
│   │       ├── prompt/         # Prompt generation logic
│   │       ├── schema/         # Data validation schemas
│   │       └── service/        # Business services
│   └── package.json            # Service dependencies
├── db/                          # PocketBase Database
│   ├── pb_hooks/               # Custom PocketBase hooks
│   │   ├── feed.pb.js          # Feed management logic
│   │   ├── generate.pb.js      # AI generation workflows
│   └── pb_migrations/          # Database schema migrations
├── package.json                # Root package configuration
├── pnpm-workspace.yaml         # Monorepo workspace config
└── pnpm-lock.yaml             # Dependency lock file
```

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js**
- **pnpm**
- **OpenAI API**
- **Git** for version control
- **Google OAuth2** credentials for authentication

### ⚙️ Installation

Before installation, we should configure environment variables.

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd use-textify
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   # Create environment files for each service
   cp web/.env.example web/.env.local
   cp cron/.env.example cron/.env
   ```

### 🏃‍♂️ Running the Application

1. **Start the database**

   ```bash
   pnpm db:dev
   ```

2. **Start the web application**

   ```bash
   pnpm web:dev
   ```

3. **Start the cron service** (optional, for AI generation)

   ```bash
   pnpm cron:dev
   ```

4. **Access the application**
   - Web App: http://localhost:3000
   - Database Admin: http://127.0.0.1:3001/_/

## 📖 Usage Guide

### 👤 User Features

- **🔐 Authentication**

  - Sign in with Google OAuth2
  - Automatic profile creation and management
  - Secure session management with PocketBase

- **📝 Prompt Creation**

  - Create detailed prompts with title, description, and main content
  - Add dynamic variables for prompt customization
  - Include helpful notices and usage warnings
  - Categorize prompts for better organization
  - Tag prompts for improved discoverability

- **🔍 Discovery**

  - Browse prompts by category using visual icons
  - Search prompts by keywords, tags, or categories
  - Filter results with advanced search options
  - Infinite scroll for seamless browsing experience

- **👥 Community Interaction**
  - View and comment on community prompts
  - Share your own prompts publicly
  - Follow tags and categories of interest

### 🤖 AI Integration

- **Automated Prompt Generation**
  - Uses OpenAI GPT models for content creation
  - Generates prompts based on provided concepts
  - Includes proper variable definitions and usage notices
  - Maintains quality standards through structured prompts

## 🛠️ Development

### 📁 Directory Structure

The project follows FSD principles with clear separation of concerns:

- **Entities**: Core domain models and types
- **Features**: Business logic and user interactions
- **Widgets**: Complex UI compositions
- **Shared**: Reusable infrastructure code
- **App**: Route definitions and global setup

### 🔄 Available Scripts

**Root Level Commands:**

```bash
# Database management
pnpm db:dev              # Start PocketBase development server

# Web application
pnpm web:dev             # Start Next.js development server
pnpm web:build           # Build for production
pnpm web:preview         # Preview production build locally
pnpm web:cf-deploy       # Deploy to Cloudflare Pages
pnpm web:cf-typegen      # Generate Cloudflare types

# Cron service
pnpm cron:dev            # Start cron service in development
pnpm cron:build          # Build cron service
pnpm cron:start          # Start built cron service
```

**Individual Package Commands:**

```bash
# Install dependencies for specific workspace
pnpm --filter web install

# Run scripts in specific workspace
pnpm --filter web dev
pnpm --filter cron build
```

### 🎯 Development Workflow

1. **Feature Development**

   - Follow FSD layer principles (as soon as possible)
   - Start with entities (domain models)
   - Build features (business logic)
   - Create widgets (UI compositions)
   - Wire modules to pages and layouts which are in app layer

2. **Code Organization**

   - Keep related code together in feature slices
   - Maintain strict import dependencies (no upward imports)
   - Use TypeScript for type safety
   - Follow naming conventions and file structure

3. **Quality Assurance**

   - Use ESLint for code quality
   - Follow TypeScript strict mode
   - Write meaningful commit messages
   - Test features thoroughly before deployment

4. **Deployment**
   - Build and test locally first
   - Use provided deployment scripts
   - Monitor application performance
   - Review and approve community content

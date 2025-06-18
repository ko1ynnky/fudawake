# Claude Code Instructions for Fudawake

## Project Overview

**Fudawake** is a Next.js web application for competitive karuta (Japanese card game) practice. The app generates random card division rules for training purposes, specifically for organizing the 100 cards used in competitive karuta matches.

### Project Type & Main Technologies

- **Framework**: Next.js 14.2.5 with TypeScript
- **UI Library**: Chakra UI with Emotion for styling
- **Animation**: Framer Motion
- **Deployment**: Vercel with analytics
- **Language**: TypeScript with strict mode enabled
- **Build Tool**: SWC for minification

## Available Scripts

- `npm run dev` - Start development server on localhost:3000
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with ChakraProvider and Analytics
│   ├── page.tsx           # Home page (dynamically imports KarutaApp)
│   ├── globals.css        # Global styles
│   └── favicon.ico        # App icon
├── components/            # React components
│   ├── KarutaApp.tsx     # Main application component
│   ├── Footer.tsx        # Footer with social links
│   └── Providers.tsx     # Context providers (if any)
├── utils/                # Utility functions
│   ├── ruleGenerators.ts # Rule generation logic
│   ├── helperFunctions.ts# Helper utilities
│   └── kimarijiMap.ts    # Karuta card mappings (決まり字)
└── types.ts              # TypeScript type definitions

public/                   # Static assets
├── robots.txt           # SEO robots file
├── sitemap.xml          # Generated sitemap
└── *.svg               # SVG assets

Configuration files:
├── next.config.mjs      # Next.js configuration
├── tsconfig.json        # TypeScript configuration
├── vercel.json          # Vercel deployment config
├── next-sitemap.config.js # Sitemap generation
└── postcss.config.mjs   # PostCSS configuration
```

## Key Application Features

### Core Functionality
The app generates random rules for dividing karuta cards during practice:
- **Position-based rules**: Select cards by ones/tens digit
- **Number-based rules**: Select 3 specific numbers
- **Mixed rules**: Select 3 from each digit position
- **Split rules**: 4-2 or 2-4 distribution between ones/tens

### Rule Types (from types.ts)
- `position`: Basic digit position rules
- `threeNumbers`: Select 3 specific numbers
- `threeFromEach`: 3 from ones + 3 from tens
- `fourTwoSplit`: 4 from ones + 2 from tens  
- `twoFourSplit`: 2 from ones + 4 from tens

### Special Features
- **決まり字 (Kimariji) mapping**: Shows the distinctive syllables for excluded cards
- **Local storage**: Persists rule generation history (max 10 items)
- **Client-side only**: Uses `dynamic` import with `ssr: false`

## Development Guidelines

### Code Style
- Uses TypeScript strict mode
- Functional components with hooks
- Chakra UI component system for consistent styling
- ESLint with Next.js configuration for code quality

### State Management
- React hooks for local state (useState, useEffect, useCallback)
- localStorage for persistence
- No external state management library

### Styling Approach
- Chakra UI components with theme system
- Responsive design with base/md breakpoints
- Emotion for CSS-in-JS styling

## Configuration Notes

### Next.js Setup
- App Router architecture (not Pages Router)
- React Strict Mode enabled
- SWC minification for better performance
- Path aliases: `@/*` maps to `./src/*`

### SEO & Analytics
- Japanese language (`lang="ja"`)
- Vercel Analytics integration
- Sitemap generation with next-sitemap
- Proper meta tags for karuta/competitive card game keywords

### Build & Deployment
- Configured for Vercel deployment
- GitHub Actions CI/CD pipeline
- Dependabot for weekly dependency updates
- No test suite currently configured

## Working with This Codebase

### Key Components to Understand
1. **KarutaApp.tsx**: Main application logic, rule generation, and UI
2. **ruleGenerators.ts**: Core business logic for different rule types
3. **kimarijiMap.ts**: Essential karuta card reference data
4. **types.ts**: Complete type definitions for the rule system

### Common Development Tasks
- **Adding new rule types**: Update `types.ts`, add to `RULE_POSITIONS`, implement in `ruleGenerators.ts`
- **UI modifications**: Work with Chakra UI components in `KarutaApp.tsx`
- **Styling changes**: Use Chakra UI props or extend theme
- **Data persistence**: Modify localStorage logic in `KarutaApp.tsx`

### Important Implementation Details
- The app uses Japanese text and is specifically designed for competitive karuta
- Card numbering follows karuta conventions (1-100, with special handling for card 100/0)
- Rule exclusions show both numbers and corresponding 決まり字 (distinctive syllables)
- History management is client-side only with 10-item limit

### Testing & Quality
- ESLint configured with Next.js rules
- No unit tests currently implemented
- CI pipeline runs build validation
- Manual testing recommended for rule generation logic

## External Dependencies

### Production Dependencies
- `@chakra-ui/react` + `@chakra-ui/icons`: UI component library
- `@emotion/react` + `@emotion/styled`: CSS-in-JS styling
- `framer-motion`: Animation library (required by Chakra UI)
- `react-icons`: Icon components
- `@vercel/analytics`: Analytics tracking
- `next-sitemap`: SEO sitemap generation

### Development Dependencies
- Standard Next.js TypeScript setup
- ESLint with Next.js configuration
- PostCSS for CSS processing

This is a focused, single-purpose application with clean architecture and modern React/Next.js patterns. The codebase is well-organized and follows Next.js best practices.
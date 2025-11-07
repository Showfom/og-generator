# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a dynamic Open Graph (OG) image generator built with Next.js. It generates social media preview images (the images you see when sharing links on Twitter/Discord) via API endpoints. The project is forked from Railway's og-generator and uses Puppeteer to render HTML templates as PNG/JPEG images.

## Core Architecture

### Image Generation Flow

1. **Request Flow**: User configures image via UI → Query params sent to API → HTML template rendered → Puppeteer screenshots HTML → Image returned
2. **Key API Endpoints**:
   - `/api/image` - Returns the generated OG image (PNG/JPEG)
   - `/api/html` - Returns the raw HTML that would be screenshotted (useful for debugging)

### Layout System

Layouts define different OG image styles. Each layout is an object implementing the `ILayout` interface (src/types.ts:10-15):

- **name**: Unique identifier for the layout
- **properties**: Array of configurable properties (text inputs, colors, selects, etc.)
- **getCSS**: Optional function that returns CSS string based on config
- **Component**: React component that renders the layout content

Available layouts are exported from `src/layouts/index.ts` and include:
- Simple, Starter, Railway, Blog, Docs, Pattern

To add a new layout:
1. Create a new file in `src/layouts/` (e.g., `myLayout.tsx`)
2. Define the `ILayout` object with name, properties, getCSS, and Component
3. Export it from `src/layouts/index.ts` by adding it to the `layouts` array

### Image Rendering Pipeline

Located in `src/pages/api/_lib/`:

- **parser.ts**: Parses request query parameters into config object
- **template.tsx**: Converts config into HTML string using React SSR
- **chromium.ts**: Uses Puppeteer to screenshot the HTML at 2048x1070px (OG_WIDTH x OG_HEIGHT from src/constants.ts)
- **sanitizer.ts**: Sanitizes HTML for security
- **options.ts**: Configures Puppeteer browser options

### State Management

The UI uses custom React hooks for state:

- `useConfig` - Global config (fileType, layoutName) stored in localStorage
- `useLayoutConfig` - Layout-specific properties stored in localStorage
- Both configs are merged into query params for the image API

## Development Commands

```bash
# Install dependencies
npm install
# or
yarn install

# Run development server (http://localhost:3000)
npm run dev
# or
yarn dev

# Build for production
npm run build
# or
yarn build

# Start production server (uses PORT env var, defaults to 3000)
npm run start
# or
yarn start

# Clean build artifacts
npm run clean
# or
yarn clean
```

## Tech Stack

- **Framework**: Next.js 10.2.0 (Pages Router, not App Router)
- **Styling**: styled-components + twin.macro (Tailwind CSS in JS)
- **Rendering**: Puppeteer Core for HTML-to-image conversion
- **State**: localStorage via use-local-storage-state
- **Typography**: Inter font from Google Fonts
- **Icons**: react-feather

## Important Notes

- Image dimensions are hardcoded: 2048x1070px (src/constants.ts)
- Development mode checks `!process.env.RAILWAY_STATIC_URL` (src/pages/api/image.ts:6)
- Images are cached for 1 year via Cache-Control headers
- The UI debounces image updates by 200ms to avoid excessive API calls
- All layout properties must have a `type` of: text, number, select, or color (src/types.ts:23-44)

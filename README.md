# Muhammad Wasif Athar - Finance Portfolio

## Project Overview

A modern portfolio website showcasing expertise in Finance, Economics, and Quantitative Analysis.

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Three Fiber (for 3D components)
- Framer Motion (for animations)

## Google Analytics 4 Setup

This project includes Google Analytics 4 (GA4) tracking with the measurement ID: `G-YB4Y2HZBXP`.

### Implementation Details:
- **Global Setup**: GA4 script is loaded in `index.html` with consent defaults and debug mode enabled
- **SPA Tracking**: Automatic page view tracking for client-side route changes using React Router
- **Development Helper**: `window.gaTest()` function available in development for testing events

### Code Locations:
- **Main GA4 Script**: `index.html` (lines 31-50)
- **Analytics Utilities**: `src/lib/analytics.ts`
- **Tracking Hook**: `src/hooks/useGaTracking.ts`
- **App Integration**: `src/App.tsx` (useGaTracking hook)

### Testing Analytics:
1. **Real-time Reports**: Check Google Analytics → Reports → Realtime
2. **Debug View**: Enable in GA4 Admin → DebugView (debug_mode is enabled)
3. **Development Testing**: Open browser console and run `window.gaTest()` to send test events
4. **Network Tab**: Verify requests to `https://www.google-analytics.com/g/collect`

### Content Security Policy:
If implementing CSP, ensure these domains are allowed:
- `script-src: https://www.googletagmanager.com`
- `connect-src: https://www.google-analytics.com https://region1.google-analytics.com`

## Deployment

This project can be deployed to any static hosting service such as:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

Build the project with:
```sh
npm run build
```

The output will be in the `dist/` directory.

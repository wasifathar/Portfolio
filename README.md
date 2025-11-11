# Muhammad Wasif Athar - Portfolio Website

A modern, high-performance portfolio website showcasing expertise in Quantitative Finance, Economics, and Data Analytics. Built with cutting-edge web technologies to deliver a smooth, interactive experience.

## 🌟 Features

- **Multi-Page Architecture**: Optimized page-based navigation for better performance
- **Interactive Animations**: Smooth transitions and hover effects using Framer Motion
- **3D Visualizations**: WebGL-powered particle backgrounds and interactive components
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Performance Optimized**: Lazy loading, code splitting, and optimized animations
- **Modern UI/UX**: Clean, professional design with Bloomberg Terminal-inspired aesthetics

## 🚀 Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite (fast HMR and optimized builds)
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth transitions
- **3D Graphics**: OGL (WebGL library) for particle effects
- **UI Components**: shadcn/ui component library
- **Routing**: React Router v6 with page transitions
- **State Management**: React Hooks and Context API

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm (recommended: use [nvm](https://github.com/nvm-sh/nvm))

### Setup

```bash
# Clone the repository
git clone https://github.com/wasifathar/Portfolio.git

# Navigate to project directory
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:8080`

## 🏗️ Project Structure

```
src/
├── components/     # Reusable React components
├── pages/          # Page components (Hero, About, Education, etc.)
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and configurations
└── assets/         # Static assets and images
```

## 📄 Pages

- **Hero**: Introduction with profile and resume viewer
- **About**: Executive profile with core competencies
- **Education**: Academic qualifications with university logos
- **Experience**: Professional experience timeline
- **Projects**: Featured projects showcase
- **Certificates**: Professional certifications gallery
- **Research**: Published research papers and publications
- **Contact**: Contact form and social links

## 🎨 Key Components

- **Particles**: WebGL particle background system
- **ElectricBorder**: Animated SVG border effects
- **TiltedCard**: 3D tilt effect cards for education section
- **DecayCard**: Image cards with displacement effects
- **StockTicker**: Live market data ticker
- **Navigation**: Dock-style navigation bar

## 🚀 Deployment

Build for production:

```bash
npm run build
```

The optimized build will be in the `dist/` directory, ready for deployment to:

- **Vercel**: `vercel deploy`
- **Netlify**: Connect GitHub repository
- **GitHub Pages**: Use GitHub Actions
- **AWS S3 + CloudFront**: Upload `dist/` folder

## 📊 Performance Optimizations

- Code splitting and lazy loading
- Optimized WebGL animations
- IntersectionObserver for viewport-based rendering
- Memoized components to prevent unnecessary re-renders
- CSS-based animations where possible
- Reduced particle counts for better performance

## 🔧 Configuration

- **Port**: Configured in `vite.config.ts` (default: 8080)
- **Analytics**: Google Analytics 4 integration (ID: G-YB4Y2HZBXP)
- **Environment**: Development and production builds optimized

## 📝 License

This project is private and proprietary.

## 👤 Author

**Muhammad Wasif Athar**
- MSc Economics & Finance (University of Milan)
- CFA Level I Candidate
- Quantitative Finance & Data Analytics Specialist

---

Built with ❤️ using React, TypeScript, and modern web technologies.

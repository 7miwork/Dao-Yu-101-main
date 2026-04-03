# Dao-Yu Frontend Application

This is the frontend application for the Dao-Yu EdTech Platform, built with React, TypeScript, TailwindCSS, and Vite.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   ├── professional/   # Professional UI components
│   │   ├── gamified/       # Gamified UI components
│   │   └── shared/         # Shared components
│   ├── contexts/           # React contexts (Auth, i18n)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions and configurations
│   ├── pages/              # Page components
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript type definitions
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── index.html              # HTML entry point
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # TailwindCSS configuration
├── vite.config.ts          # Vite configuration
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- Git

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Create a `.env.local` file with the following variables:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-key
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview the production build
- `pnpm type-check` - Check TypeScript types
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

## Features

### Authentication
- User registration and login
- Role-based access control
- Protected routes

### Professional UI
- Dashboard with statistics
- Course management
- Student/class management
- Analytics

### Gamified UI
- Archipelago-based learning map
- Island navigation
- Lesson player
- XP, levels, and streaks
- Progress tracking

### Internationalization
- Support for English, German, and Traditional Chinese
- Language switcher
- Fully translatable UI

## Technology Stack

- **React 18**: UI library
- **TypeScript**: Type safety
- **TailwindCSS**: Utility-first CSS
- **Vite**: Fast build tool
- **React Router**: Client-side routing
- **Supabase**: Backend and authentication

## Development Guidelines

### Component Structure

Components are organized by feature:
- `components/auth/` - Authentication-related components
- `components/professional/` - Professional UI components
- `components/gamified/` - Gamified UI components
- `components/shared/` - Shared/reusable components

### State Management

- **Auth Context**: User authentication state
- **i18n Context**: Language and translation state
- **Local Storage**: Persistent user preferences

### Styling

- Use TailwindCSS utility classes
- Follow the design system defined in `tailwind.config.ts`
- Keep custom CSS minimal

### Type Safety

- Always define TypeScript types in `src/types/`
- Use strict mode in `tsconfig.json`
- Run `pnpm type-check` before committing

## Building for Production

To build the application for production:

```bash
pnpm build
```

The output will be in the `dist/` directory, ready for deployment to GitHub Pages or any static hosting service.

## Deployment to GitHub Pages

1. Build the application:
   ```bash
   pnpm build
   ```

2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "build: Deploy to GitHub Pages"
   git push origin main
   ```

3. Configure GitHub Pages in your repository settings to deploy from the `gh-pages` branch.

## Contributing

Please follow the established code structure and conventions. Run `pnpm type-check` and `pnpm lint` before submitting pull requests.

## License

MIT

---

**Last Updated**: March 2026

**Status**: Development Phase 1 - Core Scaffold Complete

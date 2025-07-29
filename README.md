# react-ts

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines React, React Router, Express, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **React Router** - Declarative routing for React
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Express** - Fast, unopinionated web framework
- **Node.js** - Runtime environment
- **Mongoose** - TypeScript-first ORM
- **MongoDB** - Database engine
- **Authentication** - Email & password authentication with Better Auth
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
pnpm install
```
## Database Setup

This project uses MongoDB with Mongoose.

1. Make sure you have MongoDB set up.
2. Update your `apps/server/.env` file with your MongoDB connection URI.

3. Apply the schema to your database:
```bash
pnpm db:push
```


Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the web application.
The API is running at [http://localhost:3000](http://localhost:3000).



## Project Structure

```
react-ts/
├── apps/
│   ├── web/         # Frontend application (React + React Router)
│   └── server/      # Backend API (Express)
```

## Available Scripts

- `pnpm dev`: Start all applications in development mode
- `pnpm build`: Build all applications
- `pnpm dev:web`: Start only the web application
- `pnpm dev:server`: Start only the server
- `pnpm check-types`: Check TypeScript types across all apps
- `pnpm db:push`: Push schema changes to database
- `pnpm db:studio`: Open database studio UI

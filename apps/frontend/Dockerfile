# Production Next.js container for frontend
FROM node:20-alpine AS base
WORKDIR /app

# Enable corepack to use pnpm
RUN corepack enable

# Only copy files needed to install dependencies at the workspace level
COPY package.json pnpm-lock.yaml turbo.json ./
COPY apps/frontend/package.json apps/frontend/package.json

# Install dependencies for the workspace
RUN pnpm install --frozen-lockfile

# Copy the full repo (needed to build the app)
COPY . .

# Build-time public API URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build only the frontend app (env is baked at build time)
RUN pnpm --filter frontend build

# Runtime
WORKDIR /app/apps/frontend
EXPOSE 3000
CMD ["node","node_modules/next/dist/bin/next","start","-p","3000","-H","0.0.0.0"]

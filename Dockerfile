# ---------- deps (cache layer) ----------
FROM node:20-slim AS deps
WORKDIR /app

# Install build dependencies for Debian
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

COPY corona-control-ultimate/package.json corona-control-ultimate/package-lock.json ./
RUN npm ci

# ---------- build ----------
FROM node:20-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY corona-control-ultimate/ .
RUN npm run build

# ---------- runtime ----------
FROM node:20-slim AS runner
WORKDIR /app

# Install tools for Hugging Face Dev Mode
RUN apt-get update && apt-get install -y \
    git \
    git-lfs \
    wget \
    curl \
    procps \
    bash \
    htop \
    vim \
    nano \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV=production
ENV PORT=7860

# Ensure /app is owned by user 1000 for Dev Mode
RUN chown -R 1000:1000 /app

COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/server.cjs ./server.cjs

USER 1000
EXPOSE 7860
CMD ["node", "server.cjs"]

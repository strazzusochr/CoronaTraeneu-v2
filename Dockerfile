# ---------- deps (cache layer) ----------
FROM node:20-alpine AS deps
WORKDIR /app
COPY corona-control-ultimate/package*.json ./
RUN npm ci

# ---------- build ----------
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY corona-control-ultimate/ .
RUN npm run build

# ---------- runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=7860

COPY --from=build /app/package*.json ./
RUN npm ci --only=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/server.cjs ./server.cjs

EXPOSE 7860
CMD ["node", "server.cjs"]

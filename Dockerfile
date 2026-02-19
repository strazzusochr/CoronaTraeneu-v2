# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app
COPY corona-control-ultimate/package*.json ./corona-control-ultimate/
WORKDIR /app/corona-control-ultimate
RUN npm ci
COPY corona-control-ultimate ./
RUN npm run build

# Stage 2: Minimal Runner (NO npm install needed!)
FROM node:22-alpine AS runner
RUN apk add --no-cache git
RUN deluser node 2>/dev/null; adduser -D -u 1000 user || true

WORKDIR /home/user/app

# Only copy the built static files and the minimal server
COPY --from=build --chown=1000:1000 /app/corona-control-ultimate/dist ./dist
COPY --chown=1000:1000 corona-control-ultimate/server.cjs ./server.cjs

RUN chown -R 1000:1000 /home/user

USER 1000

ENV NODE_ENV=production
ENV PORT=7860

EXPOSE 7860

CMD ["node", "server.cjs"]

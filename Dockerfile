FROM node:20-alpine AS build
WORKDIR /app
COPY corona-control-ultimate/package*.json ./corona-control-ultimate/
WORKDIR /app/corona-control-ultimate
RUN npm ci
COPY corona-control-ultimate ./
RUN npm run build

FROM node:20-alpine AS runner
# Preparation for Hugging Face (UID 1000)
RUN apk add --no-cache git
WORKDIR /app
COPY corona-control-ultimate/package*.json ./corona-control-ultimate/
RUN npm --prefix ./corona-control-ultimate ci --only=production
COPY --from=build /app/corona-control-ultimate/dist ./corona-control-ultimate/dist
COPY corona-control-ultimate/server.cjs ./corona-control-ultimate/server.cjs
COPY corona-control-ultimate/server ./corona-control-ultimate/server

# Hugging Face runs as user with UID 1000
RUN chown -R 1000:1000 /app
USER 1000

ENV NODE_ENV=production
ENV PORT=7860
ENV HOST=0.0.0.0

EXPOSE 7860

ENTRYPOINT ["node", "corona-control-ultimate/server.cjs"]

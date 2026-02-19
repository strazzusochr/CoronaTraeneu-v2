# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY corona-control-ultimate/package*.json ./corona-control-ultimate/
WORKDIR /app/corona-control-ultimate
RUN npm ci
COPY corona-control-ultimate ./
RUN npm run build

# Stage 2: Runner
FROM node:20-alpine AS runner

# Install git for HF compatibility
RUN apk add --no-cache git

# Hugging Face standard user/home setup
# node user in alpine already has UID 1000, so we delete it first to avoid conflict
RUN deluser node && adduser -D -u 1000 user
ENV HOME=/home/user
WORKDIR /home/user/app

# Copy production files
COPY --from=build --chown=user:user /app/corona-control-ultimate/dist ./dist
COPY --chown=user:user corona-control-ultimate/server.cjs ./server.cjs
COPY --chown=user:user corona-control-ultimate/server ./server
COPY --chown=user:user corona-control-ultimate/package*.json ./

# Selective install (production only)
RUN npm ci --only=production

# Ensure everything is owned by the user
RUN chown -R 1000:1000 /home/user

# Switch to the non-root user HF expects
USER user

ENV NODE_ENV=production
ENV PORT=7860
ENV HOST=0.0.0.0

# Expose the HF port
EXPOSE 7860

# No internal healthcheck to avoid conflict with HF
ENTRYPOINT ["node", "server.cjs"]

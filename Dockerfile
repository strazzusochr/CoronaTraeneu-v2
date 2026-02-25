# Stage 1: Build the React Game
FROM node:22-alpine AS build
WORKDIR /app
COPY corona-control-ultimate/package*.json ./corona-control-ultimate/
WORKDIR /app/corona-control-ultimate
RUN npm ci
COPY corona-control-ultimate ./
RUN npm run build

# Stage 2: Neko Cloud Browser (CPU-Only / Free Tier)
# Documentation: https://m1k1o.net/neko/
FROM ghcr.io/m1k1o/neko/google-chrome:latest

# Switch to root to configure the environment
USER root

# Setup working directory (fixes /app nonexistent error)
WORKDIR /app

# Install Python 3 for a lightweight absolute zero-dependency static file server
RUN apt-get update && apt-get install -y python3 && rm -rf /var/lib/apt/lists/*

# Copy the built game files from Stage 1
COPY --from=build /app/corona-control-ultimate/dist /var/www/game

# Create a Supervisor configuration file for our Python static file server
# We drop this into all typical supervisor config folders just to be absolutely safe
RUN mkdir -p /etc/neko/supervisord /etc/supervisord.d /etc/supervisor/conf.d && \
    echo '[program:game-server]\n\
    command=python3 -m http.server 8000\n\
    directory=/var/www/game\n\
    autorestart=true\n\
    user=root\n\
    ' | tee /etc/neko/supervisord/game-server.conf \
    /etc/supervisord.d/game-server.conf \
    /etc/supervisor/conf.d/game-server.conf > /dev/null

RUN echo "Configuring Chrome policies for auto-startup..." && \
    mkdir -p /etc/opt/chrome/policies/managed && \
    echo '{"RestoreOnStartup": 4, "RestoreOnStartupURLs": ["http://localhost:8000/"]}' > /etc/opt/chrome/policies/managed/startup.json

# ---- Neko Environment Configuration ----
# Bind the Neko web interface to 7860 (Hugging Face default)
ENV NEKO_BIND=:7860

# We disable authentication for instant seamless access
ENV NEKO_PASSWORD=neko
ENV NEKO_PASSWORD_ADMIN=admin

# High Quality Streaming Settings
ENV NEKO_SCREEN=1920x1080@60
# Wir nutzen keinen NVENC mehr, da HF keine GPU-Hardware bezahlt ist (CPU Fallback)
# ENV NEKO_HWENC=nvenc

# Since Hugging Face only exposes 7860, we tell WebRTC to multiplex over TCP 7860
ENV NEKO_TCPMUX=7860
# Some environments require ICE muxing explicitly
ENV NEKO_ICELITE=true

# Expose the single port HF allows
EXPOSE 7860

# We do NOT override ENTRYPOINT or CMD. 
# We let m1k1o/neko supervisor start normally and pick up our game-server.conf !

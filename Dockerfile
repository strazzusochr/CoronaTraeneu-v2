# Stage 1: Build the React Game
FROM node:22-alpine AS build
WORKDIR /app
COPY corona-control-ultimate/package*.json ./corona-control-ultimate/
WORKDIR /app/corona-control-ultimate
RUN npm ci
COPY corona-control-ultimate ./
RUN npm run build

# Stage 2: Neko Cloud Browser with NVIDIA GPU support
# Documentation: https://m1k1o.net/neko/
FROM ghcr.io/m1k1o/neko/nvidia-google-chrome:latest

# Switch to root to configure the environment
USER root

# Install Python 3 for a lightweight absolute zero-dependency static file server
RUN apt-get update && apt-get install -y python3 && rm -rf /var/lib/apt/lists/*

# Copy the built game files from Stage 1
COPY --from=build /app/corona-control-ultimate/dist /var/www/game

# Create an entrypoint startup script
# This script will:
# 1. Start the Python HTTP server to host the game on port 8000 internally.
# 2. Configure Google Chrome to automatically open localhost:8000 on startup.
# 3. Hand over control to Neko's standard supervisord.
RUN echo '#!/bin/bash\n\
    echo "Starting internal game server on port 8000..."\n\
    cd /var/www/game && python3 -m http.server 8000 &\n\
    \n\
    echo "Configuring Chrome policies for auto-startup..."\n\
    mkdir -p /etc/opt/chrome/policies/managed\n\
    echo "{\"RestoreOnStartup\": 4, \"RestoreOnStartupURLs\": [\"http://localhost:8000/\"]}" > /etc/opt/chrome/policies/managed/startup.json\n\
    \n\
    echo "Starting Neko Cloud Gaming Environment..."\n\
    exec /neko/supervisord\n\
    ' > /app/start.sh && chmod +x /app/start.sh

# ---- Neko Environment Configuration ----
# Bind the Neko web interface to 7860 (Hugging Face default)
ENV NEKO_BIND=:7860

# We disable authentication for instant seamless access
ENV NEKO_PASSWORD=neko
ENV NEKO_PASSWORD_ADMIN=admin

# High Quality Streaming Settings
ENV NEKO_SCREEN=1920x1080@60
ENV NEKO_HWENC=nvenc

# Since Hugging Face only exposes 7860, we tell WebRTC to multiplex over TCP 7860
ENV NEKO_TCPMUX=7860
# Some environments require ICE muxing explicitly
ENV NEKO_ICELITE=true

# Expose the single port HF allows
EXPOSE 7860

# Run our custom entrypoint
CMD ["/app/start.sh"]

FROM node:18-alpine

WORKDIR /app

# Package-Dateien kopieren für effizientes Docker-Caching
COPY package*.json ./
RUN npm install

# Quellcode kopieren
COPY . .

# Production-Build der Vite/React-App
RUN npm run build

# HuggingFace Expose Port 8080 (gemäß Readme)
ENV PORT=8080
EXPOSE 8080

# Production-Server starten
CMD ["npm", "run", "start"]

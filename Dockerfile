FROM node:20-alpine AS build
WORKDIR /app
COPY corona-control-ultimate/package*.json ./corona-control-ultimate/
WORKDIR /app/corona-control-ultimate
RUN npm ci
COPY corona-control-ultimate ./
RUN npm run build

FROM node:20-alpine AS runner
# Non-root user for Hugging Face (UID 1000)
RUN adduser -D -u 1000 user
WORKDIR /app
COPY corona-control-ultimate/package*.json ./corona-control-ultimate/
RUN npm --prefix ./corona-control-ultimate ci --only=production
COPY --from=build /app/corona-control-ultimate/dist ./corona-control-ultimate/dist
COPY corona-control-ultimate/server.cjs ./corona-control-ultimate/server.cjs
COPY corona-control-ultimate/server ./corona-control-ultimate/server
RUN chown -R user:user /app
USER user

ENV NODE_ENV=production
ENV PORT=7860
ENV HOST=0.0.0.0

EXPOSE 7860
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=5 CMD node -e "require('http').get('http://127.0.0.1:7860/health', r => { if (r.statusCode === 200) process.exit(0); else process.exit(1); }).on('error', () => process.exit(1));"

ENTRYPOINT ["node", "corona-control-ultimate/server.cjs"]

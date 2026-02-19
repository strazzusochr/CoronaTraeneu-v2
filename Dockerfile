FROM node:20-alpine AS build
WORKDIR /app
COPY corona-control-ultimate/package*.json ./corona-control-ultimate/
WORKDIR /app/corona-control-ultimate
RUN npm ci
COPY corona-control-ultimate ./
RUN npm run build

FROM node:20-alpine AS runner
RUN apk add --no-cache git
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=7860
ENV HOST=0.0.0.0
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=20 CMD node -e "require('http').get('http://127.0.0.1:'+process.env.PORT+'/health', r => { if (r.statusCode === 200) process.exit(0); else process.exit(1); }).on('error', () => process.exit(1));"
COPY corona-control-ultimate/package*.json ./corona-control-ultimate/
RUN npm --prefix ./corona-control-ultimate ci --only=production
COPY --from=build /app/corona-control-ultimate/dist ./corona-control-ultimate/dist
COPY corona-control-ultimate/server.cjs ./corona-control-ultimate/server.cjs
EXPOSE 7860
ENTRYPOINT ["node", "corona-control-ultimate/server.cjs"]

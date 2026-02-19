FROM node:20-alpine AS build
WORKDIR /app
COPY corona-control-ultimate/package*.json ./corona-control-ultimate/
WORKDIR /app/corona-control-ultimate
RUN npm ci
COPY corona-control-ultimate ./
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=7860
COPY corona-control-ultimate/package*.json ./corona-control-ultimate/
RUN npm --prefix ./corona-control-ultimate ci --only=production
COPY --from=build /app/corona-control-ultimate/dist ./corona-control-ultimate/dist
COPY corona-control-ultimate/server.cjs ./corona-control-ultimate/server.cjs
EXPOSE 7860
ENTRYPOINT ["node", "corona-control-ultimate/server.cjs"]

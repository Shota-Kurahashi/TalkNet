# deps
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

# builder
FROM node:18 AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_IMAGE_PATH=http://minio:9000/images

RUN npx prisma generate  
RUN npm run build

# runner
FROM node:18-alpine AS runner
RUN apk add --no-cache netcat-openbsd

WORKDIR /app

COPY --from=builder /app/package.json  package.json
COPY --from=builder /app/public        public
COPY --from=builder /app/.next         .next
COPY --from=builder /app/prisma        ./prisma
COPY --from=builder /app/node_modules  node_modules
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh
EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV PORT 3000

# エントリーポイントスクリプトを実行
CMD ["./entrypoint.sh"]

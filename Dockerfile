FROM node:20-slim AS client-build

WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ ./
RUN npm run build

FROM node:20-slim

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY server/package.json server/package-lock.json ./
COPY server/prisma ./prisma/
RUN DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy" npm install

COPY server/ ./

COPY --from=client-build /app/client/dist ./public

EXPOSE ${PORT:-4000}

CMD ["sh", "-c", "npx prisma migrate deploy && npx tsx src/index.ts"]

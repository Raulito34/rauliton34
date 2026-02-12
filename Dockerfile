FROM node:20-slim

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY server/package.json server/package-lock.json ./
RUN npm install

COPY server/ ./

RUN npx prisma generate

EXPOSE ${PORT:-4000}

CMD ["sh", "-c", "npx prisma migrate deploy && npx tsx src/index.ts"]

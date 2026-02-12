FROM node:20-slim

RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma/
RUN npm ci

COPY . ./

EXPOSE ${PORT:-4000}

CMD ["sh", "-c", "npx prisma migrate deploy && npx tsx src/index.ts"]

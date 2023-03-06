FROM node:18-alpine
RUN apk add --no-cache libc6-compat python3 make g++
RUN apk update && apk upgrade
WORKDIR /app

COPY tsconfig.json package.json pnpm-lock.yaml ./
COPY src /app/src
RUN npm install -g pnpm
RUN pnpm i

RUN addgroup --system --gid 1001 nodejs

CMD [ "npm", "run", "start:prod" ]

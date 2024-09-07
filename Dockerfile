FROM node:18-alpine as builder
WORKDIR /clinica

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run config
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /clinica
COPY --from=builder /clinica/package.json .
COPY --from=builder /clinica/package-lock.json .
COPY --from=builder /clinica/next.config.js ./
COPY --from=builder /clinica/public ./public
COPY --from=builder /clinica/.next/standalone ./
COPY --from=builder /clinica/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
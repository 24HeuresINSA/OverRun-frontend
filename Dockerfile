# build stage
FROM node:16.17.1-alpine3.16 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# production stage
FROM node:16.17.1-alpine3.16

ENV NODE_ENV production

WORKDIR /app

RUN chown -R node:node /app

USER node

RUN npm install serve --silent

COPY --chown=node:node --from=builder /app/dist ./dist

EXPOSE 80

CMD ["./node_modules/.bin/serve", "--single", "--listen", "80", "dist"]

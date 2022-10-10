FROM node:alpine

RUN mkdir -p /usr/src/next-app && chown -R node:node /usr/src/next-app

WORKDIR /usr/src/next-app

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

RUN yarn build

EXPOSE 3000

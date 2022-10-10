FROM node:alpine

ENV KYRA_BACKEND_URL="http://backend:5000/v1"
ENV NEXT_PUBLIC_KYRA_API_DOCS="http://localhost:5000/v1/docs"

RUN mkdir -p /usr/src/next-app && chown -R node:node /usr/src/next-app

WORKDIR /usr/src/next-app

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000

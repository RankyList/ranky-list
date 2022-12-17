FROM node:lts-alpine3.16

WORKDIR /usr/src/nest

COPY ./nest/package.json ./nest/yarn.lock ./

RUN yarn install

USER node

CMD ["yarn", "start:dev"]

FROM node:lts-alpine3.16

WORKDIR /usr/src/nest

COPY ./nest/package.json ./nest/yarn.lock ./

RUN yarn install

CMD ["yarn", "start:dev"]

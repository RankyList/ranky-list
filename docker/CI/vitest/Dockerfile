FROM node:current-alpine3.17

WORKDIR /home/node/svelte-kit

COPY ./svelte-kit ./

RUN corepack enable && yarn install

CMD [ "yarn", "dev" ]

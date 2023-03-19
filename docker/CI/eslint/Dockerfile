FROM node:current-alpine3.17

WORKDIR /home/node/svelte-kit

COPY --chown=node:node ./svelte-kit ./

USER node

RUN yarn install && \
    yarn prisma:generate && \
    yarn check

CMD [ "yarn", "lint" ]

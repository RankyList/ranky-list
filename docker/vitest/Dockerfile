FROM node:current-alpine3.17

WORKDIR /home/node/testing

RUN apk add xdg-utils

USER node

ENTRYPOINT [ "yarn", "test:unit:ui" ]

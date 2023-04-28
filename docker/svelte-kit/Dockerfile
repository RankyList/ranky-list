FROM node:current-alpine3.17

WORKDIR /home/node/svelte-kit

RUN apk add xdg-utils

USER node

ENTRYPOINT [ "/bin/sh", "./scripts/dev.sh" ]

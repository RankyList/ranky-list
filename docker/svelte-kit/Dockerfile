FROM node:current-alpine3.18

WORKDIR /home/node/svelte-kit

RUN apk add xdg-utils

USER node

ENTRYPOINT [ "/bin/sh", "./scripts/dev.sh" ]

FROM node:current-alpine3.17

WORKDIR /home/node/svelte-kit

RUN apk add xdg-utils supervisor && \
    mkdir /var/log/supervisor && \
    chown node:node /var/log/supervisor

USER node

ENTRYPOINT [ "/bin/sh", "./scripts/dev.sh" ]

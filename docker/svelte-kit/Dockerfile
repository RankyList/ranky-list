FROM node:lts

WORKDIR /usr/src/svelte-kit

COPY ./svelte-kit/package.json ./svelte-kit/yarn.lock ./

RUN yarn install && \
    mkdir playwright && \
    npx playwright install-deps

USER node

ENTRYPOINT [ "/bin/bash", "./scripts/dev.sh" ]

FROM node:lts

WORKDIR /usr/src/svelte-kit

COPY ./svelte-kit/package.json ./svelte-kit/yarn.lock ./

RUN yarn install && \
    mkdir playwright && \
    npx playwright install && \
    npx playwright install-deps

CMD ["yarn", "dev"]

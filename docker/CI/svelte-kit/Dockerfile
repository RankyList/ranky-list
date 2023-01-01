FROM node:lts

WORKDIR /usr/src/svelte-kit

COPY ./svelte-kit/package.json ./svelte-kit/yarn.lock ./svelte-kit ./

RUN yarn install && \
    mkdir playwright && \
    npx playwright install-deps && \
    npx playwright install

CMD ["yarn", "dev"]

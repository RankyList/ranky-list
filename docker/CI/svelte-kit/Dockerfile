FROM node:lts

WORKDIR /usr/src/svelte-kit

COPY . ./

RUN yarn install && \
    mkdir playwright && \
    npx playwright install-deps && \
    npx playwright install

USER node

CMD ["yarn", "dev"]

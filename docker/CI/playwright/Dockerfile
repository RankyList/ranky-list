FROM mcr.microsoft.com/playwright:v1.31.2-focal

WORKDIR /testing

COPY ./svelte-kit ./

RUN yarn install

ENTRYPOINT [ "/bin/sh", "./scripts/ci.sh" ]

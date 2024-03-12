FROM mcr.microsoft.com/playwright:v1.37.0-focal

WORKDIR /testing

COPY ./svelte-kit ./

RUN corepack enable && yarn install

ENTRYPOINT [ "/bin/sh", "./scripts/ci.sh" ]

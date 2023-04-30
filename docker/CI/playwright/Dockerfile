FROM mcr.microsoft.com/playwright:v1.33.0-focal

WORKDIR /testing

COPY ./svelte-kit ./

RUN yarn install

ENTRYPOINT [ "/bin/sh", "./scripts/ci.sh" ]

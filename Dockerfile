FROM oven/bun:1.3.0

COPY package.json bun.lock ./

RUN bun install

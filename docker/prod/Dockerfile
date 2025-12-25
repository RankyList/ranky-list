FROM oven/bun AS builder

WORKDIR /home/bun

COPY . .

RUN bun install && bun run build

FROM oven/bun

ENV PORT=3000

WORKDIR /home/bun

USER bun

COPY --from=builder --chown=bun:bun /home/bun/build ./build
COPY --from=builder --chown=bun:bun /home/bun/docker/prod/start.sh ./start.sh

ENTRYPOINT [ "./start.sh" ]

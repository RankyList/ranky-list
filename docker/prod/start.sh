#!/bin/sh

# Exit gracefully
trap "exit" SIGINT
trap "exit" SIGTERM

echo "Starting SvelteKit production server..."
ls
bun run ./build/index.js

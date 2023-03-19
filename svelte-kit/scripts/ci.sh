#!/usr/bin/env bash

# Exit gracefully
trap "exit" SIGINT
trap "exit" SIGTERM

echo "Generate & deploy"

yarn prisma:generate
yarn prisma:migrate-deploy

echo "Run Playwright"

yarn test

#!/usr/bin/env bash

# Exit gracefully
trap "exit" SIGINT
trap "exit" SIGTERM

# TODO add the Pocketbase migration here

echo "Run Playwright"

yarn test

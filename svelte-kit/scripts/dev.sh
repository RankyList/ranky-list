#!/usr/bin/env bash

# Exit gracefully
trap "exit" SIGINT
trap "exit" SIGTERM

echo "Installing dependencies"

yarn install

echo "Starting dev server"

yarn dev
/home/yam/Documents/Projects/project-zomboid
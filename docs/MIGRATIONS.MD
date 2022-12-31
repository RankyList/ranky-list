# Migrations

This section concerns migrations for the DB. Migrations are **required** whenever you make a change to a Prisma entity which is mapped to the database.

## Content

- [Create a migration](#create-a-migration)
- [Run a migration](#run-a-migration)
- [Go further](#go-further)

## Create a migration

To create a migration, go into the `svelte-kit` container with `make ssh` and...

- *RUN* `yarn prisma migrate dev --name {MIGRATION_NAME}` (where `MIGRATION_NAME` is the name of your migration) to automatically generate a migration based on the changes you've made...
- *OR* run `yarn prisma migrate dev --create-only` to create an empty migration if no changes are present (or create a migration without running it). Not recommended unless you really know what you're doing.

## Run a migration

To run a migration, go into the `svelte-kit` container and run `yarn prisma:migrate-dev` to execute pending migrations, or `yarn prisma:migrate-reset` to reset the database.

:bulb: You can also run `make migrate` to automatically run `yarn prisma:migrate-dev` without going into the container.

## Go further

To go further, you can take a look at the [Prisma documentation on migrations](https://www.prisma.io/docs/concepts/components/prisma-migrate/get-started).

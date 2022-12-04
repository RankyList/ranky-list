# Migrations

This section concerns migrations for the API. Migrations are **required** whenever you make a change to an entity which is mapped to the database.

## Content

- [Create a migration](#create-a-migration)
- [Run a migration](#run-a-migration)
- [Go further](#go-further)

## Create a migration

To create a migration, go into the `nest` container with `make ssh-nest` and...

- *RUN* `yarn typeorm migration:generate -d migrations/migration.configuration.ts -p migrations/generated/{YOUR_MIGRATION_NAME}` to automatically generate a migration based on the changes you've made...
- *OR* run `yarn typeorm migration:create migrations/generated/{YOUR_MIGRATION_NAME}` to create an empty migration. Not recommended unless you really know what you're doing.

## Run a migration

To run a migration, go into the `nest` container and run `yarn migration:up` to execute pending migrations, or `migration:down` to revert.

:bulb: You can also run `make migration` to automatically run `yarn migration:up` without going into the container.

## Go further

To go further, you can take a look at the [TypeORM documentation on migrations](https://orkhan.gitbook.io/typeorm/docs/migrations).

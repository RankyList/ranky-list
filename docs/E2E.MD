# E2E Testing

This section concerns E2E testing in the app. E2E testing is done using [Playwright](https://playwright.dev/).

> **Note**
> Playwright is not run using Docker, unlike the rest of the app. You will need to have at least Bun and the Playwright browsers installed on your machine. A Make command will maybe be added in the future to run the tests from a temporary container.

- [E2E Testing](#e2e-testing)
  - [How to run E2E tests](#how-to-run-e2e-tests)

## How to run E2E tests

Copy the `compose.override.yml.dist` file to `compose.override.yml`:

```sh
cp compose.override.yml.dist compose.override.yml
```

Then, restart the containers:

```sh
make restart
# or
docker compose restart
```

This will allow you to run in a different environment optimised for tests.
It will also create another database for testing purposes, which you can safely reset using the `make fixtures` command.
Your development database will not be affected.

Now, go into the `playwright` directory:

```sh
cd playwright
```

If not done before, install the Playwright browsers:

```sh
bunx playwright install --with-deps
```

Then, run the tests:

```sh
bunx playwright test
```

For ease of use, the test commands are available in Makefiles in the root directory as well as the `playwright` directory.

Once you are done testing, don't forget to comment out or remove the `compose.override.yml` file.
You can then restart the containers again to go back to the development environment.

```sh
# Remove the file (it is ignored by Git)
rm compose.override.yml

# Restart the containers
make restart
# or
docker compose restart
```

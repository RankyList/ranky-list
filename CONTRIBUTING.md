# Contributing to the project

How to contribute to the project?
There are 2 ways of contributing: reporting a bug or proposing a feature, and making changes to the code.

- [Contributing to the project](#contributing-to-the-project)
  - [How to contribute by reporting a bug/proposing a feature?](#how-to-contribute-by-reporting-a-bugproposing-a-feature)
  - [How to contribute to the code?](#how-to-contribute-to-the-code)
    - [Branches](#branches)
    - [Prerequisites](#prerequisites)
    - [Launch the project locally](#launch-the-project-locally)
    - [What do I need to check before making a PR?](#what-do-i-need-to-check-before-making-a-pr)
    - [Docker services](#docker-services)
      - [Hosts file](#hosts-file)
    - [Make commands](#make-commands)
    - [Environment files](#environment-files)
    - [The database](#the-database)
    - [IDEs](#ides)
      - [VSCode](#vscode)
    - [Additional documentation](#additional-documentation)
    - [Good to know](#good-to-know)

## How to contribute by reporting a bug/proposing a feature?

You can [open an issue](https://github.com/RankyList/ranky-list/issues/new/choose) with the appropriate template, but make sure a similar issue doesn't already exist.

If no template satisfies you, feel free to create one from scratch, but do include as many details as possible. Never make an empty issue.

## How to contribute to the code?

You should always create a new branch, with an explicit name, and create a pull request once done.

Everything you need to know to use this project and contribute to it is written below.

### Branches

- The [master](https://github.com/RankyList/ranky-list/tree/master) branch is **not** the default branch. It is used to represent what is currently in *production*.
- The [develop](https://github.com/RankyList/ranky-list) branch is the default branch. This is the default target branch for pull requests and new branches.
- Other branches are created freely but should respect a certain name coherence, for example, if you are adding a new feature, your branch name should look like `feature/my-feature`.
- **Always** make sure that your branch is up to date with its parent branch before submitting a pull request.

### Prerequisites

- [Docker](https://www.docker.com/) (with Docker Compose).
- [Git](https://git-scm.com/).
- This is obvious, but having experience with Node/JavaScript is a must.

### Launch the project locally

- Fork the project (if you are not part of the RankyList team).
- Clone the project with `git@github.com:RankyList/ranky-list.git` *OR* `git@github.com:your-username/ranky-list.git` if you forked the project.
- Add the necessary Traefik URLs to your `hosts` file (see [Docker services](#docker-services)).
- (Optional) Add a `compose.override.yml` file to override the default `docker-compose.yml` file for your needs.
- Create your own branch from `develop` or any branch other than `master` (eg: `feature/my-feature`).
- Launch the project using `make start` if you have Make installed, or `docker compose build && docker compose up -d` otherwise (you may need additional steps to have the project working, check what's inside the Makefile).
- Go to [http://local.ranky-list.com](http://local.ranky-list.com) to access the app and [http://local.pocketbase.ranky-list.com](http://local.pocketbase.ranky-list.com/_/#) to access the PocketBase admin panel.
- From there, you can add your own code and tests in the appropriate folders.

> **Warning**
> Docker is required. We do not recommend running this project without it.

### What do I need to check before making a PR?

Make sure of the following :

- Your PR is up to date with its parent branch
- Your PR includes tests (not always needed but is very recommended)
- Your PR describes everything the reviewers need to know.
- Your PR follows the [code of conduct](CODE_OF_CONDUCT.md).
- The linter does not fail (or at least not because of your PR).
- You avoided the usage of an external dependency (only use one if you need to).

### Docker services

List of all the Docker services.

To add the necessary hosts for Caddy, open your `hosts` file (usually `/etc/hosts` on Linux) and add a newline for each service.
For example, add `127.0.0.1 local.ranky-list.com` to be able to access the app on [http://local.ranky-list.com](http://local.ranky-list.com).

| Service       | Description                                                                                                | Port(s)        | URL                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------ |
| `caddy`       | The web server proxying all other services.                                                                | `80` and `443` |                                                                                      |
| `svelte-kit`  | The main service running the SvelteKit app.                                                                |                | [http://local.ranky-list.com](http://local.ranky-list.com)                           |
| `histoire`    | Service responsible for running Histoire and its UI. Shares the same volume as the `svelte-kit` container. |                | [http://local.histoire.ranky-list.com](http://local.histoire.ranky-list.com)         |
| `mailcatcher` | SMTP service used to catch emails during development.                                                      |                | [http://local.mailcatcher.ranky-list.com](http://local.mailcatcher.ranky-list.com)   |
| `pocketbase`  | Service running PocketBase, including the SQLite DB and API. Also serves as a Go backend.                  |                | [http://local.pocketbase.ranky-list.com](http://local.pocketbase.ranky-list.com/_/#) |

> **Note**
> The URLs are both prefixed with `local.` and suffixed with `.ranky-list.com` to avoid conflicts with real domains, while still being considered valid domains for OAuth providers.

#### Hosts file

Add the following lines to your `hosts` file to be able to access the services.

```plaintext
127.0.0.1 local.ranky-list.com
127.0.0.1 local.histoire.ranky-list.com
127.0.0.1 local.mailcatcher.ranky-list.com
127.0.0.1 local.pocketbase.ranky-list.com
```

### Make commands

List of the available make commands.

| Command                  | Description                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `start`                  | Builds the containers and starts them, then runs the `fixtures` command.                             |
| `start-nocache`          | Builds the containers without using cache and starts them, then runs the `fixtures` command.         |
| `up [env_file]`          | Starts the containers in detached mode, using the specified environment file if provided.            |
| `build`                  | Builds all containers without using cache.                                                           |
| `restart`                | Restarts all stopped and running services.                                                           |
| `stop`                   | Stops the containers.                                                                                |
| `down`                   | Stops and removes the containers, networks, and volumes.                                             |
| `ssh`                    | Connects to the `svelte-kit` container via SSH.                                                      |
| `ssh-pocketbase`         | Connects to the `pocketbase` container via SSH.                                                      |
| `list-containers`        | Lists all containers, including those not running.                                                   |
| `healthcheck-svelte-kit` | Shows the health status of the `svelte-kit` container.                                               |
| `healthcheck-pocketbase` | Shows the health status of the `pocketbase` container.                                               |
| `logs`                   | Displays logs from all containers.                                                                   |
| `logs-svelte-kit`        | Displays logs from the `svelte-kit` container.                                                       |
| `logs-pocketbase`        | Displays logs from the `pocketbase` container.                                                       |
| `upgrade`                | Runs an interactive upgrade of dependencies in the `svelte-kit` container.                           |
| `migrate`                | Runs the Pocketbase migration create command in the `pocketbase` container.                          |
| `migrate-collections`    | Runs the Pocketbase migration collections command in the `pocketbase` container.                     |
| `history-sync`           | Runs the Pocketbase migration history-sync command in the `pocketbase` container.                    |
| `generate`               | Generates Pocketbase type definitions in ./src/lib/types/pocketbase.ts, based on the Pocketbase API. |
| `fixtures`               | Runs the fixtures script to generate mock data in the `svelte-kit` container.                        |
| `lint`                   | Runs linting in the `svelte-kit` container using Prettier and ESLint.                                |
| `format`                 | Runs linting and formats code in the `svelte-kit` container using Prettier and ESLint.               |
| `test`                   | Runs the Vitest tests in the `svelte-kit` container.                                                 |
| `test-watch`             | Runs the `test` command in watch mode.                                                               |
| `e2e`                    | Loads fixtures and runs tests in the `playwright` folder.                                            |
| `e2e-ui`                 | Like the `e2e` command but with the Playwright UI.                                                   |
| `e2e-report`             | Shows the report of the latest Playwright run.                                                       |
| `perm`                   | Fix bad permissions that could happen (check the command for more details).                          |

### Environment files

We use `.env` files to store sensitive data or data that needs to be changed for certain environments (like Windows users).

To override a value from a `.env` file, create a `.env.local` file (which will not be committed on GitHub). Do not directly modify the `.env` file.

### The database

RankyList currently uses PocketBase as its DB, which itself uses SQLite under the hood.
You can easily access it with a friendly GUI by going to [http://local.pocketbase.ranky-list.com](http://local.pocketbase.ranky-list.com/_/#).

Assuming you did not change the credentials in the root `.env` file :

- User : `root@root.com`,
- Password : `root`.

> **Note**
> Migrations are applied automatically and the database is kept on your host machine, so you will not lose data even after deleting the container.

### IDEs

You can use any IDE you'd like. We of course recommend VSCode, which this project already includes a `workspace.code-workspace` file for with everything configured.

Feel free to add documentation for your IDE here.

#### VSCode

The configuration for VSCode is already set and ready to use in `.vscode/settings.json`. Simply copy it from the `.vscode.dev` folder.

Of course, it will require some VSCode extensions to work properly :

- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) for Dockerfile and Docker Compose file support,
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for formatting generic files (HTML, JSON, SCSS, etc...),
- [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) for Markdown files support and linting,
- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) for Svelte files support and linting,
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for Typescript and Svelte files linting.

That should be all you need.

### Additional documentation

All the documentation you need to safely develop on RankyList. Feel free to add anything you think is missing!

- [Migrations](docs/MIGRATIONS.MD)
- [Fixtures](docs/FIXTURES.MD)
- [Emails](docs/EMAILS.MD)
- [E2E Testing](docs/E2E.MD)
- [What technologies is RankyList currently using?](https://github.com/RankyList/ranky-list/issues/22)

### Good to know

Your PR will always be checked as soon as possible. You need to make sure you do everything you can to make it easier to review it.

You can look at other PRs if you are not too sure about something. Also, make sure to link any issue related to the PR you created.

Finally, thank you for the interest you have in this project! Don't worry, everyone here is very friendly.

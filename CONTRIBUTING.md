# Contributing to the project

How to contribute to the project?
There are 2 ways of contributing: reporting a bug or proposing a feature, and making changes to the code.

## Content

- [How to contribute by reporting a bug/proposing a feature?](#how-to-contribute-by-reporting-a-bugproposing-a-feature)
- [How to contribute to the code?](#how-to-contribute-to-the-code)
  - [Branches](#branches)
  - [Prerequisites](#prerequisites)
  - [Launch the project locally](#launch-the-project-locally)
  - [What do I need to check before making a PR?](#what-do-i-need-to-check-before-making-a-pr)
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
- This is obvious, but having experience with node/javascript is a must.

### Launch the project locally

- Fork the project (if you are not part of the RankyList team).
- Clone the project with `git@github.com:RankyList/ranky-list.git` *OR* `git@github.com:your-username/ranky-list.git` if you forked the project.
- Create your own branch from `develop` or any branch other than `master` (eg: `feature/my-feature`).
- Launch the project using `make start` if you have Make installed, or `docker compose build && docker compose up -d` otherwise (you may need additional steps to have the project working, check what's inside the Makefile).
- Go to `localhost:5173` to access the app.
- From there, you can add your own code and tests in the appropriate folders.

⚠️ Docker is required ⚠️

### What do I need to check before making a PR?

Make sure of the following :

- Your PR is up to date with its parent branch
- Your PR includes tests (not always needed but is very recommended)
- Your PR describes everything the reviewers need to know.
- Your PR follows the [code of conduct](CODE_OF_CONDUCT.md).
- The linter does not fail (or at least not because of your PR).
- You avoided the usage of an external dependency (only use one if you need to).

### Make commands

List of the available make commands.

| Command               | Description                                                                                                                                                                                                   |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `start`               | Builds the containers and starts them, then runs `make generate` and `make migrate`.                                                                                                                          |
| `up`                  | Starts the containers. You can provide a custom `.env` file if you want to override settings, eg: `make up .env.local`                                                                                        |
| `stop`                | Stops all running containers.                                                                                                                                                                                 |
| `down`                | Removes all containers.                                                                                                                                                                                       |
| `ssh-svelte-kit`      | Runs `bash` in the `svelte-kit` container.                                                                                                                                                                    |
| `ssh-maria`           | Runs `bash` in the `mariadb` container.                                                                                                                                                                       |
| `lint`                | Runs `yarn lint` in the `svelte-kit` container. Will not run any fixes. This is also the command used in the Github CI for linting.                                                                           |
| `format`              | Runs `yarn format` in the `svelte-kit` container. Will run fixes.                                                                                                                                             |
| `test`                | Runs `yarn test` in the `svelte-kit` container. This is also the command used in the Github CI for tests. :warning: The first run might be slow because Playwright will install browsers needed for tests.    |
| `generate`            | Generates all the Prisma types (based on the current schema) needed in the SvelteKit app by running `yarn prisma:generate` in the `svelte-kit` container.                                                     |
| `migrate`             | Executes pending migrations by running `yarn prisma:migrate-dev` in the `svelte-kit` container.                                                                                                               |
| `reset`               | Resets the database by running `yarn prisma:migrate-reset` in the `svelte-kit` container.                                                                                                                     |
| `deploy`              | Runs `yarn prisma:migrate-deploy` in the `svelte-kit` container. :warning: This is only for production.                                                                                                       |

### Environment files

We use `.env` files to store sensitive data or data that needs to be changed for certain environments (like Windows users).

To override a value from a `.env` file, create a `.env.local` file (which will not be committed on GitHub). Do not directly modify the `.env` file.

### The database

RankyList currently uses MariaDB as database. You can easily access it with a friendly GUI thanks to PHPMyAdmin by going to `localhost:8080`.

Assuming you did not change the credentials in the root `.env` file :

- Server : `mariadb`,
- User : `root`,
- Password : `root`.

You can then access the current database named `ranky_list`.

:grey_question: The database is kept on your host in a `data` folder at the root of the project.

### IDEs

You can use any IDE you'd like. We of course recommend VSCode, which this project already includes a `settings.json` file for with everything configured.

Feel free to add documentation for your IDE here.

#### VSCode

The configuration for VSCode is already set and ready to use in `.vscode/settings.json`. Simply copy it from the `.vscode.dev` folder.

Of course, it will require some VSCode extensions to work properly :

- [Docker](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker) for Dockerfile and docker-compose files support,
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for formatting generic files (HTML, JSON, SCSS, etc...),
- [Markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) for Markdown files support and linting,
- [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) for Svelte files support and linting,
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for Typescript and Svelte files linting.

That should be all you need.

### Additional documentation

All the documentation you need to safely develop on RankyList. Feel free to add anything you think is missing!

- [Migrations](docs/MIGRATIONS.MD)
- [What technologies is RankyList currently using?](https://github.com/RankyList/ranky-list/issues/22)

### Good to know

Your PR will always be checked as soon as possible. You need to make sure you do everything you can to make it easier to review it.

You can look at other PRs if you are not too sure about something. Also, make sure to link any issue related to the PR you created.

Finally, thank you for the interest you have in this project! Don't worry, everyone here is very friendly.

# Contributing to the project
How to contribute to the project?
There are 2 ways of contributing: reporting a bug or proposing a feature, and making changes to the code.

# How to contribute by reporting a bug/proposing a feature?
You can [open an issue](https://github.com/RankyList/ranky-list/issues/new/choose) with the appropriate template, but make sure a similar issue doesn't already exist.

If no template satisfies you, feel free to create one from scratch, but do include as many details as possible. Never make an empty issue.

# How to contribute to the code?
You should always create a new branch, with an explicit name, and create a pull request once done.

Everything you need to know to use this project and contribute to it is written below.

## Branches
- The [master](https://github.com/RankyList/ranky-list/tree/master) branch is **not** the default branch. It is used to represent what is currently in *production*.
- The [develop](https://github.com/RankyList/ranky-list) branch is the default branch. This is the default target branch for pull requests and new branches.
- Other branches are created freely but should respect a certain name coherence, for example, if you are adding a new feature, your branch name should look like `feature/my-feature`.
- **Always** make sure that your branch is up to date with its parent branch before submitting a pull request.

## Prerequisites
- [Docker](https://www.docker.com/) (with Docker Compose).
- [Git](https://git-scm.com/).
- This is obvious, but having experience with node/javascript is a must.

## Launch the project locally
- Fork the project (if you are not part of the RankyList team).
- Clone the project with `git@github.com:RankyList/ranky-list.git` *OR* `git@github.com:your-username/ranky-list.git` if you forked the project.
- Create your own branch from `develop` or any branch other than `master` (eg: `feature/my-feature`).
- Launch the project using `make start` if you have Make installed, or `docker compose build && docker compose up -d` otherwise (you may need additional steps to have the project working, check what's inside the Makefile).
- Go to `localhost:3000`.
- From there, you can add your own code and tests in the appropriate folders.

⚠️ Docker is required ⚠️

## What do I need to check before making a PR?
Make sure of the following :
- Your PR is up to date with its parent branch
- Your PR includes tests (not always needed but is very recommended)
- Your PR describes everything the reviewers need to know.
- Your PR follows the [code of conduct](CODE_OF_CONDUCT.md).
- The linter does not fail (or at least not because of your PR).
- You avoided the usage of an external dependency (only use one if you need to).

## Make commands
List of the available make commands.

| Command               | Description  |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `start`               | Builds the containers, start them and syncs `node_modules` folders. Use for first run.                                                                                    |
| `up`                  | Starts the containers. You can provide a custom `.env` file if you want to override settings, eg: `make up .env.local`                                                    |
| `stop`                | Stops all running containers.                                                                                                                                             |
| `down`                | Removes all containers.                                                                                                                                                   |
| `ssh-svelte-kit`      | Runs `bash` in the `svelte-kit` container.                                                                                                                                |
| `ssh-nest`            | Runs `sh` in the `nest` container.                                                                                                                                        |
| `ssh-mongo`           | Runs `sh` in the `mongo` container.                                                                                                                                       |
| `lint`                | Runs `lint-svelte-kit` and `lint-nest`, in that order.                                                                                                                    |
| `lint-svelte-kit`     | Runs `yarn lint` in the `svelte-kit` container. Will not run any fixes.                                                                                                   |
| `lint-nest`           | Runs `yarn lint` in the `nest` container. Will run fixes.                                                                                                                 |
| `format`              | Runs `format-svelte-kit` and `format-nest`, in that order.                                                                                                                |
| `format-svelte-kit`   | Runs `yarn format` in the `svelte-kit` container. Will run fixes.                                                                                                         |
| `format-nest`         | Runs `yarn format` in the `nest` container. Will run fixes (only for `.json` files).                                                                                      |
| `test`                | Runs `test-svelte-kit` and `test-nest`, in that order.                                                                                                                    |
| `test-svelte-kit`     | Runs `yarn test` in the `svelte-kit` container.                                                                                                                           |
| `test-nest`           | Runs `yarn test` in the `nest` container.                                                                                                                                 |
| `perm`                | Runs `perm-svelte-kit` and `perm-nest`, in that order. ⚠️ Only works on Linux at the moment.                                                                              |
| `perm-svelte-kit`     | Gives you ownership of files in the `svelte-kit` folder. Can be useful when having problems with the `sync` command for example. ⚠️ Only works on Linux at the moment.    |
| `perm-nest`           | Gives you ownership of files in the `nest` folder. Can be useful when having problems with the `sync` command for example. ⚠️ Only works on Linux at the moment.          |
| `sync`                | Runs `sync-svelte-kit` and `sync-nest`, in that order.                                                                                                                    |
| `sync-svelte-kit`     | Copies the `node_modules` folder from the `svelte-kit` container onto the host. Useful for intellisense in IDEs.                                                          |
| `sync-nest`           | Copies the `node_modules` folder from the `nest` container onto the host. Useful for intellisense in IDEs.                                                                |

## Good to know
Your PR will always be checked as soon as possible. You need to make sure you do everything you can to make it easier to review it.

You can look at other PRs if you are not too sure about something. Also, make sure to link any issue related to the PR you created.

Finally, thank you for the interest you have in this project! Don't worry, everyone here is very friendly.

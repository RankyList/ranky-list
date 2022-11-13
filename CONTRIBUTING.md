# Contributing to the project
How to contribute to the project?
There are 2 ways of contributing : reporting a bug or proposing a feature, and making changes to the code.

# How to contribute by reporting a bug/proposing a feature?
You can [open an issue](https://github.com/RankyList/ranky-list/issues) with the appropriate template.

If no template satisfies you, feel free to create one from scratch, but do include as many details as possible. Never make an empty issue.

# How to contribute to the code?
You should always create a new branch, with an explicit name, and create a pull request once done.

Everything you need to know to use this project and contribute to it is writen below.

## Prerequisites
- [Docker](https://www.docker.com/) (with Docker Compose).
- [Git](https://git-scm.com/).
- This is obvious, but having experience with node/javascript is a must.

## Launch the project locally
- Clone the project with `git@github.com:RankyList/ranky-list.git`.
- Fork the project (if you are not part of the RankyList team)
- Create your own branch from `develop` or any branch other than master (eg: `feature/my-feature`). You can point directly on master only if your change is very minor (eg: documentation).
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
- You avoided the usage of an external dependency (only use one if you actually need to).

## Make commands
List of the available make commands.

TODO

## Good to know
Your PR will always be checked as soon as possible. You need to make sure you do everything you can do to make it easier to review it.

You can look at other PRs if you are not too sure about something. Also make sure to link any issue related to the PR you created.

Finally, thank you for the interest you have in this project! Don't worry, everyone here is very friendly.

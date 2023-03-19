COMPOSE=docker compose
COMPOSECI=$(COMPOSE) -f docker-compose.ci.yml
EXECSVELTEKIT=$(COMPOSE) exec svelte-kit
EXECMARIA=$(COMPOSE) exec mariadb
EXECVITESTCI=$(COMPOSECI) exec vitest
ifeq (up,$(firstword $(MAKECMDGOALS)))
  # use the second argument for "up"
  UP_ENV_FILE := $(wordlist 2, 2, $(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(UP_ENV_FILE):;@:)
endif

# Starting and stopping the project
start:
	$(COMPOSE) build --force-rm
	$(COMPOSE) up -d --remove-orphans --force-recreate
	make generate
	make migrate

start-nocache:
	$(COMPOSE) build --force-rm --no-cache
	$(COMPOSE) up -d --remove-orphans --force-recreate
	make generate
	make migrate

up:
ifndef UP_ENV_FILE
	$(COMPOSE) up -d --remove-orphans
else
	$(COMPOSE) --env-file ${UP_ENV_FILE} up -d --remove-orphans
endif

stop:
	$(COMPOSE) stop

down:
	$(COMPOSE) down

# SSH
ssh:
	$(EXECSVELTEKIT) sh

ssh-maria:
	$(EXECMARIA) sh

bash-maria:
	$(EXECMARIA) bash

# Linting
lint:
	$(EXECSVELTEKIT) yarn lint

format:
	$(EXECSVELTEKIT) yarn format

# Testing
test: playwright vitest

playwright:
	$(COMPOSE) up playwright

vitest:
	$(EXECSVELTEKIT) yarn coverage

vitest-watch:
	$(EXECSVELTEKIT) yarn test:unit

# Prisma
generate:
	$(EXECSVELTEKIT) yarn prisma:generate

migrate:
	$(EXECSVELTEKIT) yarn prisma:migrate-dev

reset:
	$(EXECSVELTEKIT) yarn prisma:migrate-reset

deploy:
	$(EXECSVELTEKIT) yarn prisma:migrate-deploy

# For CI only
ci-maria:
	$(COMPOSECI) rm -f
	$(COMPOSECI) build --no-cache --force-rm
	$(COMPOSECI) up mariadb -d

ci-playwright:
	$(COMPOSECI) up playwright

ci-vitest:
	$(COMPOSECI) up -d vitest
	$(EXECVITESTCI) yarn prisma:generate
	$(EXECVITESTCI) yarn prisma:migrate-deploy
	$(EXECVITESTCI) yarn coverage

ci-eslint:
	$(COMPOSECI) up eslint

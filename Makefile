COMPOSE=docker compose
EXECSVELTEKIT=$(COMPOSE) exec svelte-kit
EXECNEST=$(COMPOSE) exec nest
EXECMARIA=$(COMPOSE) exec mariadb
ifeq (up,$(firstword $(MAKECMDGOALS)))
  # use the second argument for "up"
  UP_ENV_FILE := $(wordlist 2, 2, $(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(UP_ENV_FILE):;@:)
endif

start:
	$(COMPOSE) build --force-rm
	$(COMPOSE) up -d --remove-orphans --force-recreate

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

ssh-svelte-kit:
	$(EXECSVELTEKIT) bash

ssh-nest:
	$(EXECNEST) sh

ssh-maria:
	$(EXECMARIA) bash

lint: lint-svelte-kit lint-nest

lint-svelte-kit:
	$(EXECSVELTEKIT) yarn lint

lint-nest:
	$(EXECNEST) yarn lint

format: format-svelte-kit format-nest

format-svelte-kit:
	$(EXECSVELTEKIT) yarn format

format-nest:
	$(EXECNEST) yarn format

test: test-svelte-kit test-nest

test-svelte-kit:
	$(EXECSVELTEKIT) npx playwright install
	$(EXECSVELTEKIT) yarn test

test-nest:
	$(EXECNEST) yarn test

migration:
	$(EXECNEST) yarn migration:up

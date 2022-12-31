COMPOSE=docker compose
EXECSVELTEKIT=$(COMPOSE) exec svelte-kit
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

ssh:
	$(EXECSVELTEKIT) bash

ssh-maria:
	$(EXECMARIA) bash

lint:
	$(EXECSVELTEKIT) yarn lint

format:
	$(EXECSVELTEKIT) yarn format

test:
	$(EXECSVELTEKIT) npx playwright install
	$(EXECSVELTEKIT) yarn test

generate:
	$(EXECSVELTEKIT) yarn prisma:generate

migrate:
	$(EXECSVELTEKIT) yarn prisma:migrate-dev

reset:
	$(EXECSVELTEKIT) yarn prisma:migrate-reset

deploy:
	$(EXECSVELTEKIT) yarn prisma:migrate-deploy

COMPOSE=docker compose
COMPOSECI=$(COMPOSE) -f docker-compose.ci.yml
EXECSVELTEKIT=$(COMPOSE) exec svelte-kit
EXECPOCKETBASE=$(COMPOSE) exec pocketbase
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
	$(COMPOSE) up -d svelte-kit storybook mailcatcher pocketbase --remove-orphans --force-recreate

start-nocache:
	$(COMPOSE) build --force-rm --no-cache
	$(COMPOSE) up -d svelte-kit storybook mailcatcher pocketbase --remove-orphans --force-recreate

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

bash:
	$(EXECSVELTEKIT) bash

ssh-pocketbase:
	$(EXECPOCKETBASE) sh

bash-pocketbase:
	$(EXECPOCKETBASE) bash

# Containers & healthcheck
list-containers:
	docker compose ps -a

healthcheck-svelte-kit:
	docker inspect --format "{{json .State.Health }}" svelte-kit

healthcheck-pocketbase:
	docker inspect --format "{{json .State.Health }}" pocketbase

# Logs
logs:
	$(COMPOSE) logs

logs-svelte-kit:
	$(COMPOSE) logs svelte-kit

logs-pocketbase:
	$(COMPOSE) logs pocketbase

# Pocketbase
migrate:
	$(EXECPOCKETBASE) go run main.go migrate create

migrate-collections:
	$(EXECPOCKETBASE) go run main.go migrate collections

history-sync:
	$(EXECPOCKETBASE) go run main.go migrate history-sync

generate:
	$(EXECSVELTEKIT) npx pocketbase-typegen -u http://pocketbase:8090 -e root@ranky-list.com -p "changeThisLater" -o ./src/lib/types/pocketbase.ts

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

# For CI only
ci-pocketbase:
	$(COMPOSECI) rm -f
	$(COMPOSECI) build --no-cache --force-rm
	$(COMPOSECI) up pocketbase -d

ci-playwright:
	$(COMPOSECI) up playwright

ci-vitest:
	$(COMPOSECI) up -d vitest
	$(EXECVITESTCI) yarn coverage

ci-eslint:
	$(COMPOSECI) up eslint

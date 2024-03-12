COMPOSE=docker compose
EXECSVELTEKIT=$(COMPOSE) exec svelte-kit
EXECPOCKETBASE=$(COMPOSE) exec pocketbase
POCKETBASEURL ?= http://pocketbase:8090
POCKETBASEEMAIL ?= "root@root.com"
POCKETBASEPASSWORD ?= "root"
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
	make fixtures

start-nocache:
	$(COMPOSE) build --force-rm --no-cache
	$(COMPOSE) up -d --remove-orphans --force-recreate
	make fixtures

up:
ifndef UP_ENV_FILE
	$(COMPOSE) up -d --remove-orphans
else
	$(COMPOSE) --env-file ${UP_ENV_FILE} up -d --remove-orphans
endif

build:
	$(COMPOSE) build --force-rm --no-cache

restart:
	$(COMPOSE) restart

stop:
	$(COMPOSE) stop

down:
	$(COMPOSE) down

# SSH
ssh:
	$(EXECSVELTEKIT) sh

ssh-pocketbase:
	$(EXECPOCKETBASE) sh

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

# Bun
upgrade:
	$(EXECSVELTEKIT) bunx npm-check-updates -i

# Pocketbase
migrate:
	$(EXECPOCKETBASE) go run main.go migrate create

migrate-collections:
	$(EXECPOCKETBASE) go run main.go migrate collections

history-sync:
	$(EXECPOCKETBASE) go run main.go migrate history-sync

generate:
	$(EXECSVELTEKIT) bunx pocketbase-typegen -u $(POCKETBASEURL) -e $(POCKETBASEEMAIL) -p "$(POCKETBASEPASSWORD)" -o ./src/lib/types/pocketbase.ts
	$(EXECSVELTEKIT) bun run eslint --fix ./src/lib/types/pocketbase.ts

fixtures:
	$(EXECSVELTEKIT) bun run fixtures -f

# Linting
lint:
	$(EXECSVELTEKIT) bun run check
	$(EXECSVELTEKIT) bun run lint

format:
	$(EXECSVELTEKIT) bun run format

# Testing
test:
	$(EXECSVELTEKIT) bun test

# Permissions
perm:
	sudo chown -R 1000:$$USER svelte-kit/.svelte-kit svelte-kit/build
	sudo chmod -R 770 svelte-kit/.svelte-kit svelte-kit/build

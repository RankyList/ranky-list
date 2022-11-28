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
	make sync

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
	$(EXECSVELTEKIT) yarn test

test-nest:
	$(EXECNEST) yarn test

perm: perm-svelte-kit perm-nest

perm-svelte-kit:
	sudo chown -R ${USER}:${USER} svelte-kit/node_modules svelte-kit/yarn.lock svelte-kit/src

perm-nest:
	sudo chown -R ${USER}:${USER} nest/node_modules nest/yarn.lock nest/src

sync: sync-svelte-kit sync-nest

sync-svelte-kit:
	@echo Syncing svelte-kit node_modules dependencies...
ifeq ($(OS)$(SHELL),Windows_NTsh.exe)
	if exist ./svelte-kit/node_modules rmdir ./svelte-kit/node_modules /S /Q
else
	rm -rf ./svelte-kit/node_modules
endif
	mkdir ./svelte-kit/node_modules
	docker cp rl-svelte-kit:/usr/src/svelte-kit/node_modules ./svelte-kit/
	@echo svelte-kit dependencies synced!

sync-nest:
	@echo Syncing nest node_modules dependencies...
ifeq ($(OS)$(SHELL),Windows_NTsh.exe)
	if exist ./nest/node_modules rmdir ./nest/node_modules /S /Q
else
	rm -rf ./nest/node_modules
endif
	mkdir ./nest/node_modules
	docker cp rl-nest:/usr/src/nest/node_modules ./nest/
	@echo nest dependencies synced!

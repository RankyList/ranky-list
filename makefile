start:
	docker compose up -d --build --force-recreate --remove-orphans

up:
	docker compose stop && docker compose up -d

# Variables
DOCKER_COMPOSE = docker compose
SERVICE = web

# Start services
up:
	$(DOCKER_COMPOSE) up

# Stop services
down:
	$(DOCKER_COMPOSE) down

# Run Prisma migrations inside the container
migrate-dev:
	npm run db:migrate


# Open Prisma Studio (interactive console)
studio:
	npx prisma studio

# Rebuild images
build:
	npm run build

# Run tests
test:
	npm run test
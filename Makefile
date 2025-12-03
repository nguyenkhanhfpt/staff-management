up-full:
	docker-compose -f docker-compose.local.yml up -d

down:
	docker-compose -f docker-compose.local.yml down

restart:
	down up-full

up:
	docker-compose -f docker-compose.local.yml up -d api database redis

api:
	docker-compose -f docker-compose.local.yml exec api sh
build:
	cd frontend && $(MAKE) build
	cd server && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down
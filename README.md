docker build:
docker build -t ticketing-frontend .
docker run -it -p 8080:80 --rm --name ticketing-frontend ticketing-frontend

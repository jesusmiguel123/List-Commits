# Test

Take-Home test

## Local
To run project in local follow the next steps.

1. Install `Node version ^18`
2. Install `pnpm` [Instructions here](https://pnpm.io/es/installation)

### Backend
In `/backend` directory run the next command:
```
pnpm install
```
To run the development server execute:
```
pnpm start:dev
```

### Frontend
In `/frontend` directory run the next command:
```
pnpm install
```
To run the development server execute:
```
pnpm run dev
```
## Docker
Execute the following commands to run the App with Docker
### Creating network
```
docker network create back-front
```
### Backend
#### Building Docker image in `backend/` directory
```
docker build -f Dockerfile.dev --rm -t back .
```
#### Creating container to develop in `/`
```
docker run \
   --rm \
   --network back-front \
   --hostname back \
   --name back \
   -v $PWD/backend:/home/app \
   -p 3000:3000 \
   -it \
   back
```
### Frontend
#### Building Docker image in `frontend/` directory
```
docker build -f Dockerfile.dev --rm -t front .
```
#### Creating container to develop in `/`
```
docker run \
   --rm \
   --network back-front \
   --hostname front \
   --name front \
   -v $PWD/frontend:/home/app \
   -p 5173:5173 \
   -it \
   front
```
## Docker Compose
You must have `Docker Compose V2`. Check it with the following command:
```
docker compose --help
```
If you don't have that version use the following command on Linux:
```
sudo sh install-docker-compose-v2.sh
```
### Development
Run the next command to start development mode in main project's directory `/`:
```
docker compose -f docker-compose.dev.yml up
```

## Development server
In all cases the server is running on:
```
http://127.0.0.1:5173
```
# DOCKER CONTAINERS

Node.js + Express app
MongoDB to store application data
Redis to store session data
Nginx as proxy and load balancer

# COMMANDS USED

docker build -t node-app-image .

docker run -v ${pwd}:/app:ro -v /app/node_modules --env-file ./.env -p 3000:4000 -d --name node-app node-app-image

docker exec -it node-app bash

docker exec -it node-docker-app-mongo-1 mongosh -u "root" -p "12345"   

docker builder prune

docker-compose up -d --build

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build -V

docker-compose down -v

docker logs node-docker-app-node-app-1 -f

docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-app=2
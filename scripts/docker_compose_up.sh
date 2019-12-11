#!/bin/bash

#Get first argument of executable
export GIT_COMMIT=$1
export API_URL=$2

echo $GIT_COMMIT
echo "Docker compose up api url here:"
echo $API_URL

docker-compose down
docker-compose up -d
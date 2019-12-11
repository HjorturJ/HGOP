#!/bin/bash

#Get first argument of executable
export GIT_COMMIT=$1
export API_URL=$2
export ENVIRONMENT=$3

echo $GIT_COMMIT
echo "Docker compose up api url here:"
echo $API_URL
echo $ENVIRONMENT

docker-compose down
docker-compose up -d
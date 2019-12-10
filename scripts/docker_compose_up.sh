#!/bin/bash

#Get first argument of executable
export GIT_COMMIT=$1
PUB_URL=$2

docker-compose down
API_URL=$PUB_URL docker-compose up -d
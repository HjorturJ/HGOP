#!/bin/bash

#Get first argument of executable!!
export GIT_COMMIT=$1

docker-compose down
docker-compose up -d
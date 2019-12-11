#!/bin/bash

# Get arguments into correctly named variables and export them for the scripts we run at the bottom
export GIT_COMMIT=$1
export API_URL=$2
export ENVIRONMENT=$3

# Echo here to just have it in the log to make sure everything went smoothly
echo $GIT_COMMIT
echo "Docker compose up api url here:"
echo $API_URL
echo $ENVIRONMENT

# Run these scripts, which will use our exported variables at the top
docker-compose down
docker-compose up -d
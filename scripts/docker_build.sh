#!/bin/bash

#set -e exits if any command fails
set -e

#Get first argument of executable!
GIT_COMMIT=$1

docker build -t hjorturj/hgop:$GIT_COMMIT game_api/
(cd game_client && npm run build)
docker build -t hjorturj/hgopclient:$GIT_COMMIT game_client/
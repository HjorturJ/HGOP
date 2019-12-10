#!/bin/bash

set -euxo pipefail

docker build game_api -t hjorturj/game_api:dev
(cd game_client && npm build)
docker build game_client -t hjorturj/game_client:dev

API_URL=localhost GIT_COMMIT=dev docker-compose up
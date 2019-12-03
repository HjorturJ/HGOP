#!/bin/bash

#Get first argument of executable!
GIT_COMMIT=$1

docker build -t hjorturj/hgop:$GIT_COMMIT game_api/

# TODO exit on error if any command fails
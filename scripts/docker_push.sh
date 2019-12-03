#!/bin/bash

#set -e exits if any command fails
set -e

#Get first argument of executable!
GIT_COMMIT=$1

docker push hjorturj/hgop:$GIT_COMMIT
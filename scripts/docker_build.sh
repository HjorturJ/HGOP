#!/bin/bash

GIT_COMMIT=$1

docker build -t hjorturj/hgop:$GIT_COMMIT item_repository/

# TODO exit on error if any command fails
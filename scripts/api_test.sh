#!/bin/bash

GIT_COMMIT=$1

sh "./scripts/jenkins_deploy.sh ${GIT_COMMIT} apitest"
API_URL=$(cd /var/lib/jenkins/terraform/hgop/apitest && terraform output public_ip)
cd game_api
sh "API_URL=${API_URL}:3000 npm run test:api"
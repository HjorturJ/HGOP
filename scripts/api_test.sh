#!/bin/bash

GIT_COMMIT=$1

API_IP=$(cd /var/lib/jenkins/terraform/hgop/apitest && terraform output public_ip)

echo $API_IP

cd -

API_URL=http://${API_IP}:3000 npm run test:api
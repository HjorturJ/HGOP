#!/bin/bash

API_IP=$(cd /var/lib/jenkins/terraform/hgop/apitest && terraform output public_ip)

echo $API_IP

sleep 15

API_URL=http://${API_IP}:3000 npm run test:api
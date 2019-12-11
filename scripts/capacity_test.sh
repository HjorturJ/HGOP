#!/bin/bash

# Move to the correct directory to be able to grab the public ip that terraform gives us access too.
API_IP=$(cd /var/lib/jenkins/terraform/hgop/capacitytest && terraform output public_ip)

# Echo just for debug logs
echo $API_IP

# Sleep for 15 seconds to make sure everything is ready to receive when we run the api tests
sleep 15

# Run this test script with the correct API_URL variable set
API_URL=http://${API_IP}:3000 npm run test:capacity
#!/bin/bash

cd ..

#terraform destroy -auto-approve

#terraform init

#terraform apply -auto-approve

terraform output public_ip

#ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"

cd ./scripts

curl $(terraform output public_ip):3000/status
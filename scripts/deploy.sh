#!/bin/bash

# Destroy current instances if there are any
terraform destroy -auto-approve

# Apply without prompting the user for input
terraform apply -auto-approve

#Log into the cloud via ssh and run the initialize script on the virtual machine (which installs and runs docker-compose)
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
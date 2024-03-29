#!/bin/bash

# Exit if any command fails
set -e

# Get variables from parameters
GIT_COMMIT=$1
CURR_ENV=$2

# We need to move some files around, because of the terraform state limitations.
mkdir -p /var/lib/jenkins/terraform/hgop/"${CURR_ENV}"
mkdir -p /var/lib/jenkins/terraform/hgop/"${CURR_ENV}"/scripts
rm -f /var/lib/jenkins/terraform/hgop/"${CURR_ENV}"/scripts/initialize_game_api_instance.sh
cp scripts/initialize_game_api_instance.sh /var/lib/jenkins/terraform/hgop/"${CURR_ENV}"/scripts/initialize_game_api_instance.sh
rm -f /var/lib/jenkins/terraform/hgop/"${CURR_ENV}"/scripts/docker_compose_up.sh
cp scripts/docker_compose_up.sh /var/lib/jenkins/terraform/hgop/"${CURR_ENV}"/scripts/docker_compose_up.sh
rm -f /var/lib/jenkins/terraform/hgop/"${CURR_ENV}"/docker-compose.yml
cp docker-compose.yml /var/lib/jenkins/terraform/hgop/"${CURR_ENV}"/docker-compose.yml

# Delete all .tf files from /var/lib/jenkins/terraform/hgop/production
rm -f /var/lib/jenkins/terraform/hgop/"${CURR_ENV}"/*.tf

# Copy all .tf files from repository to /var/lib/jenkins/terraform/hgop/production
cp *.tf /var/lib/jenkins/terraform/hgop/"${CURR_ENV}"/

cd /var/lib/jenkins/terraform/hgop/"${CURR_ENV}"
terraform init # In case terraform is not initialized.
terraform destroy -auto-approve -var environment="${CURR_ENV}" || exit 1
terraform apply -auto-approve -var environment="${CURR_ENV}" || exit 1

# Print out piblic ip here just so its easy to grab it in the logs
echo PUBLIC_ADDR=$(terraform output public_ip)

# Create a variable to contain the full route to the api url to pass into our docker_compose_up
FULL_ADDR="http://$(terraform output public_ip):3000"

# SSH into the newly created VM and start scripts on them with collected parameters
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./docker_compose_up.sh $GIT_COMMIT $FULL_ADDR $CURR_ENV"

exit 0
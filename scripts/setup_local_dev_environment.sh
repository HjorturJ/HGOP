#!/bin/bash

# Execute script while loging to a file and printing to console.
exec > >(tee log_file.txt)

# Storing date time of script start.
start_datetime=$(date)

# Display date and time of script start.
echo "Dev environment script started on: $start_datetime..."

# Prompts the user with info on what the script does and what operating system it is running on 
echo "Welcome $USER! This script installs required programs/dependencies (Git, CURL, Brew, PIP3, NodeJS, NPM, AWS CLI and Terraform) on your $OSTYPE machine!"

# Run this command to make sure everything is up to date so download and installations have a higher chance of running successfully.
sudo apt-get update

# Check OSTYPE since we need to install git before we install homebrew on linux and linux doesnt have curl default installed.
if [[ $OSTYPE == darwin* ]]; then
        # Check if Homwbrew is already installed. Install it if not. 
        if test ! $(which brew); then
            # Display that we are now starting to install homebrew.
            echo "Installing homebrew..."
            ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
        fi

        # Check if git is already installed. Install it if not. 
        if test ! $(which git); then
            # Display that we are now starting to install git.
            echo "Installing git..."
            brew install git 
        fi
else
    if test ! $(which git); then
        # Display that we are now starting to install git.
        echo "Installing git..."

        # Install git.
        sudo apt-get install git
    fi

    if test ! $(which curl); then
        # Display that we are now starting to install curl.
        echo "Installing CURL..."

        # Installing CURL to download packages for other programs
        sudo apt-get install curl
    fi

    if test ! $(which brew); then
        # Display that we are now starting to install homebrew.
        echo "Installing homebrew..."
        
        # Download and install homebrew from this path
        sh -c "$(curl -fsSL https://raw.githubusercontent.com/Linuxbrew/install/master/install.sh)"

        # These test commands ensure that the homebrew PATH is correctly setup to use homebrew using command line.
        test -d ~/.linuxbrew && eval $(~/.linuxbrew/bin/brew shellenv)
        test -d /home/linuxbrew/.linuxbrew && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)
        test -r ~/.bash_profile && echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.bash_profile
        echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.profile
    fi
fi

 # Check if NodeJs and npm is already installed. Install it if not. 
if test ! $(which node); then
    echo "Downloading and Installing NodeJs..."
    brew install node
else 
    # Upgrade Node
    echo "Upgrade node..."
    brew upgrade node
fi

echo "Downloading AWS CLI v1"

# Install the AWS CLI version 1 without Sudo and pip 
curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"

# Unzip the file we downloaded
unzip awscli-bundle.zip

# Intalling aws cli
./awscli-bundle/install -b ~/bin/aws

# Removing files that we downloaded after installing
rm -r awscli-bundle.zip
rm -r awscli-bundle

# Terraform installed with brew 
echo "Installing Terraform"
brew install terraform

# Storing date time of script completion.
finished_datetime=$(date)

# Display date time of the script completion.
echo -e "Dev environment script completed on: $finished_datetime \nVersions..."

# Display install version of brew for macOS
brew --version

# Display installed version of git.
git --version

# Display installed versions of NodeJs and NPM with extra descriptions to know which is which, -ne flag for no newlines.
echo -ne "NodeJs version "
node --version

echo -ne "NPM version "
npm --version

aws --version

terraform --version
#!/bin/bash

# Execute script while loging to a file and printing to console.
exec > >(tee log_file.txt)

# Storing date time of script start.
start_datetime=$(date)

# Display date and time of script start.
echo "Dependency script started on: $start_datetime..."

# Prompts the user with info on what the script does and what operating system it is running on 
echo "Welcome $USER! This script installs required programs/dependencies
(Git and NodeJS) on your $OSTYPE machine! 
Note that Brew will be installed if you are running on macOs."

    # Makes sure to check if the operating system is running on macOs and then using 
    # Homebrew to install following required programs/dependencies
    if [[ $OSTYPE == darwin* ]]; then
        # Check if Homwbrew is already installed. Install it if not. 
        if test ! $(which brew); then
            echo "Installing homebrew:"
            ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
        else 
            # Update Homebre
            echo "Updating homebrew:"
            brew update
        fi
        # Check if git is already installed. Install it if not. 
        if test ! $(which git); then
            echo "Installing git:"
            brew install git 
        else 
            # Upgrate git 
            echo "Upgrate git: "
            brew upgrade git 
        fi
        # Check if NodeJs and npm is already installed. Install it if not. 
        if test ! $(which node); then
            echo "Downloading and Installing NodeJs:"
            brew install node
        else 
            # Upgrate Node
            echo "Upgrate node:"
            brew upgrade node
        fi
    else 
        #Display that we are now starting to install git.
        echo "Installing git:"

        #Run this command to make sure everything is up to date so download and installations have a higher chance of running successfully.
        sudo apt-get update

        #Install git.
        sudo apt-get install git

        echo "Installing CURL:"
        sudo apt-get install curl

        echo "Downloading and installing NodeJs:"

        #GET NodeJs setup.
        curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

        #Install NodeJs.
        sudo apt-get install -y nodejs
    fi

# Storing date time of script completion.
finished_datetime=$(date)

# Display date time of the script completion.
echo -e "Dependency script completed on: $finished_datetime \nVersions:"

# Display install version of brew for macOS
if [[ $OSTYPE == darwin* ]]; then
    brew --version
fi
# Display installed version of git.
git --version

# Display installed versions of NodeJs and NPM with extra descriptions to know which is which, -ne flag for no newlines.
echo -ne "NodeJs version "
node --version

echo -ne "NPM version "
npm --version




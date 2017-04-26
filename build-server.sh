#!/bin/bash

################################################################################
################               Server build script              ################
################################################################################

### Functions

function prod_mode
{

    echo 'not implemented yet :('

}

function dev_mode
{

    echo '####################################'
    echo '##  Building in development mode  ##'
    echo '####################################'

    cd /home/turnero/turnero-ute

    # git commands
    git reset --hard HEAD
    git checkout master
    git reset --hard HEAD
    git pull

    cd /home/turnero/turnero-ute/server

    # build commands
    mvn clean package -DskipTests

    # Deploy commands
    sudo cp -f /opt/api/api.jar /opt/api/api-last.jar
    sudo cp -f /home/turnero/turnero-ute/server/target/turnero-web-0.0.1-SNAPSHOT.jar /opt/api/api.jar
    sudo systemctl restart api.service
    
}

function help()
{
    echo 'Usage'
    echo
    echo 'for only deploy to test server'
    echo $0 --dev
    echo
    echo 'for only deploy to prod server'
    echo $0 --prod
}

### MAIN FUNCTION

case "$1"
in
    --prod) prod_mode;;
    --dev) dev_mode;;
    *) help;;
esac

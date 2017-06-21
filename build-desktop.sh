#!/bin/bash

################################################################################
################              Desktop build script              ################
################################################################################

### Functions

# params #1 : branch
function checkout
{
    git reset --hard HEAD
    git checkout #1
    git reset --hard HEAD
    git pull
}

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
    
    checkout master
    
    cd /home/turnero/turnero-ute/desktop
    
    yarn
    npm run build 
    sudo rm -rf /var/www/html/turnero.folderit.net/public_html/*
    cd /home/turnero/turnero-ute/desktop/dist/
    sudo cp -rf * /var/www/html/turnero.folderit.net/public_html/
    
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

case "$1" in
    --prod) prod_mode;;
    --dev) dev_mode;;
    *) help;;
esac

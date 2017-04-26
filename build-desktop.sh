#!/bin/bash

################################################################################
################              Desktop build script              ################
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

    cd /home/turnero/turnero-ute/desktop

    # build commands
    yarn
    npm run build

    # Deploy commands
    rm -rf /var/www/html/turnero.folderit.net/public_html/*
    cd /home/turnero/turnero-ute/desktop/dist/
    cp -rf * /var/www/html/turnero.folderit.net/public_html/

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

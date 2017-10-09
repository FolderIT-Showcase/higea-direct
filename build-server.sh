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
    mvn clean package -DskipTests && \

    # Deploy commands
    sudo cp -f /opt/api/api.jar /opt/api/api-last.jar && \
    sudo cp -f /home/turnero/turnero-ute/server/target/turnero-web-0.0.1-SNAPSHOT.jar /opt/api/api.jar && \
    sudo systemctl restart api.service
    
}

function server_dev_mode
{

    WORKSPACE="/home/turnero/turnero-ute"

    cd $WORKSPACE

    # git commands
    git reset --hard HEAD
    git checkout master
    git reset --hard HEAD
    git pull

    cd microservices

    mvn clean package -DskipTests

    cd $WORKSPACE/microservices/core-server
	if [ -f /opt/api/core-server.jar ]; then
    		sudo cp -f /opt/api/core-server.jar /opt/api/core-server-last.jar
	fi
    sudo cp -f $WORKSPACE/microservices/core-server/target/core-server-0.0.1-SNAPSHOT.jar /opt/api/core-server.jar
 
    cd $WORKSPACE/microservices/eureka-server
	if [ -f /opt/api/eureka-server.jar ]; then
    		sudo cp -f /opt/api/eureka-server.jar /opt/api/eureka-server-last.jar
	fi
    sudo cp -f $WORKSPACE/microservices/eureka-server/target/eureka-server-0.0.1-SNAPSHOT.jar /opt/api/eureka-server.jar

    cd $WORKSPACE/microservices/gateway
	if [ -f /opt/api/gateway.jar ]; then
    		sudo cp -f /opt/api/gateway.jar /opt/api/gateway-last.jar
	fi
    sudo cp -f $WORKSPACE/microservices/gateway/target/gateway-0.0.1-SNAPSHOT.jar /opt/api/gateway.jar

   

    cd $WORKSPACE/microservices/higea-profesional-microservice
	if [ -f /opt/api/higea-profesional-microservice.jar ]; then
	    sudo cp -f /opt/api/higea-profesional-microservice.jar /opt/api/higea-profesional-microservice-last.jar
	fi
    sudo cp -f $WORKSPACE/microservices/higea-profesional-microservice/target/higea-profesional-microservice-0.0.1-SNAPSHOT.jar /opt/api/higea-profesional-microservice.jar

    cd $WORKSPACE/microservices/higea-turnos-microservice
	if [ -f /opt/api/higea-turnos-microservice.jar ]; then
	    sudo cp -f /opt/api/higea-turnos-microservice.jar /opt/api/higea-turnos-microservice-last.jar
	fi
    sudo cp -f $WORKSPACE/microservices/higea-turnos-microservice/target/higea-turnos-microservice-0.0.1-SNAPSHOT.jar /opt/api/higea-turnos-microservice.jar

    cd $WORKSPACE/microservices/higea-metadata-microservice
	if [ -f /opt/api/higea-metadata-microservice.jar ]; then
	    sudo cp -f /opt/api/higea-metadata-microservice.jar /opt/api/higea-metadata-microservice-last.jar
	fi
    sudo cp -f $WORKSPACE/microservices/higea-metadata-microservice/target/higea-metadata-microservice-0.0.1-SNAPSHOT.jar /opt/api/higea-metadata-microservice.jar

    cd $WORKSPACE/microservices/higea-paciente-microservice
	if [ -f /opt/api/higea-paciente-microservice.jar ]; then
	    sudo cp -f /opt/api/higea-paciente-microservice.jar /opt/api/higea-paciente-microservice-last.jar
	fi
    sudo cp -f $WORKSPACE/microservices/higea-paciente-microservice/target/higea-paciente-microservice-0.0.1-SNAPSHOT.jar /opt/api/higea-paciente-microservice.jar



    # Deploy commands
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
    --dev) server_dev_mode;;
    *) help;;
esac

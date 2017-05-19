#!/bin/sh

function startServices {

    /usr/bin/java -jar /opt/api/eureka-server.jar &
    /usr/bin/java -jar /opt/api/gateway.jar &
    /usr/bin/java -jar /opt/api/core-server.jar &
    /usr/bin/java -jar /opt/api/higea-especialidad-microservice.jar &
    /usr/bin/java -jar /opt/api/higea-profesional-microservice.jar &
    /usr/bin/java -jar /opt/api/higea-turnos-microservice.jar &

}

function stopServices {

    /usr/bin/kill -9 `jps -v |grep -w eureka-server.jar|cut -f1 -d " "`
    /usr/bin/kill -9 `jps -v |grep -w gateway.jar|cut -f1 -d " "`
    /usr/bin/kill -9 `jps -v |grep -w core-server.jar|cut -f1 -d " "`;\
    /usr/bin/kill -9 `jps -v |grep -w higea-especialidad-microservice.jar|cut -f1 -d " "`
    /usr/bin/kill -9 `jps -v |grep -w higea-profesional-microservice.jar|cut -f1 -d " "`
    /usr/bin/kill -9 `jps -v |grep -w higea-turnos-microservice.jar|cut -f1 -d " "`

}

function help()
{
    echo 'Usage'
    echo
    echo 'para iniciar microservicios'
    echo $0 --start
    echo
    echo 'para detener microservicios'
    echo $0 --stop
}

case "$1"
in
    --start) startServices;;
    --stop) stopServices;;
    *) help;;
esac


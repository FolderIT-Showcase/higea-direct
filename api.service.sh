#!/bin/sh

function startServices {

<<<<<<< HEAD
    JAVA_OPTS=-Xms32m -Xmx64m -XX:PermSize=32m -XX:MaxPermSize=64m -XX:+UseG1GC -Djava.security.egd=file:/dev/urandom
=======
    JAVA_OPTS=-Xms64m -Xmx128m -XX:PermSize=32m -XX:MaxPermSize=64m -XX:+UseG1GC -Djava.security.egd=file:/dev/urandom
>>>>>>> 38bf9fb6a5478b0e3ef24255c04f1869bcc039d6

    /usr/bin/java $JAVA_OPTS -jar /opt/api/eureka-server.jar &
    /usr/bin/java $JAVA_OPTS -jar /opt/api/gateway.jar &
    /usr/bin/java $JAVA_OPTS -jar /opt/api/core-server.jar &
    /usr/bin/java $JAVA_OPTS -jar /opt/api/higea-especialidad-microservice.jar &
    /usr/bin/java $JAVA_OPTS -jar /opt/api/higea-profesional-microservice.jar &
    /usr/bin/java $JAVA_OPTS -jar /opt/api/higea-turnos-microservice.jar &

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


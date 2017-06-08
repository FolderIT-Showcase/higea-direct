#!/bin/sh

function startServices {

    JAVA_OPTS="-server -Xms48m -Xmx48m -XX:MaxMetaspaceSize=64m -Xmn8m -XX:+UseConcMarkSweepGC -XX:+CMSParallelRemarkEnabled -XX:+UseCMSInitiatingOccupancyOnly -XX:+ScavengeBeforeFullGC -XX:+CMSScavengeBeforeRemark -Djava.security.egd=file:/dev/urandom"

    /usr/bin/java $JAVA_OPTS -jar /opt/api/eureka-server.jar < /dev/null &> /dev/null &
    /usr/bin/java $JAVA_OPTS -jar /opt/api/gateway.jar < /dev/null &> /dev/null &
    # /usr/bin/java $JAVA_OPTS -jar /opt/api/higea-especialidad-microservice.jar < /dev/null &> /dev/null &
    /usr/bin/java $JAVA_OPTS -jar /opt/api/higea-profesional-microservice.jar < /dev/null &> /dev/null &
    /usr/bin/java $JAVA_OPTS -jar /opt/api/higea-turnos-microservice.jar < /dev/null &> /dev/null &
    /usr/bin/java $JAVA_OPTS -jar /opt/api/higea-paciente-microservice.jar < /dev/null &> /dev/null &

    JAVA_OPTS="-server -Xms64m -Xmx64m -XX:MaxMetaspaceSize=96m -Xmn32m -XX:+UseConcMarkSweepGC -XX:+CMSParallelRemarkEnabled -XX:+UseCMSInitiatingOccupancyOnly -XX:+ScavengeBeforeFullGC -XX:+CMSScavengeBeforeRemark -Djava.security.egd=file:/dev/urandom"
    /usr/bin/java $JAVA_OPTS -jar /opt/api/core-server.jar < /dev/null &> /dev/null &
    /usr/bin/java $JAVA_OPTS -jar /opt/api/higea-metadata-microservice.jar < /dev/null &> /dev/null &

}

function stopServices {

    /usr/bin/kill -9 `jps -v |grep -w eureka-server.jar|cut -f1 -d " "`
    /usr/bin/kill -9 `jps -v |grep -w gateway.jar|cut -f1 -d " "`
    /usr/bin/kill -9 `jps -v |grep -w core-server.jar|cut -f1 -d " "`;\
    /usr/bin/kill -9 `jps -v |grep -w higea-especialidad-microservice.jar|cut -f1 -d " "`
    /usr/bin/kill -9 `jps -v |grep -w higea-profesional-microservice.jar|cut -f1 -d " "`
    /usr/bin/kill -9 `jps -v |grep -w higea-turnos-microservice.jar|cut -f1 -d " "`
    /usr/bin/kill -9 `jps -v |grep -w higea-metadata-microservice.jar|cut -f1 -d " "`
    /usr/bin/kill -9 `jps -v |grep -w higea-paciente-microservice.jar|cut -f1 -d " "`

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


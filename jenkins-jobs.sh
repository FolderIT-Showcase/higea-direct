function desktop_dev_mode
{
    cd $WORKSPACE/desktop

    # build commands
    yarn
    npm run build

    # Deploy commands
    sudo rm -rf /var/www/html/turnero.folderit.net/public_html/*
    cd $WORKSPACE/desktop/dist/
    sudo cp -rf * /var/www/html/turnero.folderit.net/public_html/

}

function server_dev_mode
{

    cd $WORKSPACE/microservices/core-server
    mvn clean package -DskipTests
    sudo cp -f /opt/api/core-server.jar /opt/api/core-server-last.jar
    sudo cp -f $WORKSPACE/server/target/core-server-0.0.1-SNAPSHOT.jar /opt/api/core-server.jar
 
    cd $WORKSPACE/microservices/eureka-server
    mvn clean package -DskipTests
    sudo cp -f /opt/api/eureka-server.jar /opt/api/eureka-server-last.jar
    sudo cp -f $WORKSPACE/server/target/eureka-server-0.0.1-SNAPSHOT.jar /opt/api/eureka-server.jar

    cd $WORKSPACE/microservices/gateway
    mvn clean package -DskipTests
    sudo cp -f /opt/api/gateway.jar /opt/api/gateway-last.jar
    sudo cp -f $WORKSPACE/server/target/gateway-0.0.1-SNAPSHOT.jar /opt/api/gateway.jar

    cd $WORKSPACE/microservices/higea-especialidad-microservice
    mvn clean package -DskipTests
    sudo cp -f /opt/api/higea-especialidad-microservice.jar /opt/api/higea-especialidad-microservice-last.jar
    sudo cp -f $WORKSPACE/server/target/higea-especialidad-microservice-0.0.1-SNAPSHOT.jar /opt/api/higea-especialidad-microservice.jar

    cd $WORKSPACE/microservices/higea-profesional-microservice
    mvn clean package -DskipTests
    sudo cp -f /opt/api/higea-profesional-microservice.jar /opt/api/higea-profesional-microservice-last.jar
    sudo cp -f $WORKSPACE/server/target/higea-profesional-microservice-0.0.1-SNAPSHOT.jar /opt/api/higea-profesional-microservice.jar

    cd $WORKSPACE/microservices/higea-turnos-microservice
    mvn clean package -DskipTests
    sudo cp -f /opt/api/higea-turnos-microservice.jar /opt/api/higea-turnos-microservice-last.jar
    sudo cp -f $WORKSPACE/server/target/higea-turnos-microservice-0.0.1-SNAPSHOT.jar /opt/api/higea-turnos-microservice.jar


    # Deploy commands
    sudo systemctl restart api.service
    
}
source /etc/profile
server_dev_mode
desktop_dev_mode

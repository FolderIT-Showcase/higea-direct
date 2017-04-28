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
    cd $WORKSPACE/server

    # build commands
    mvn clean package -DskipTests

    # Deploy commands
    sudo cp -f /opt/api/api.jar /opt/api/api-last.jar
    sudo cp -f $WORKSPACE/server/target/turnero-web-0.0.1-SNAPSHOT.jar /opt/api/api.jar
    sudo systemctl restart api.service
    
}
source /etc/profile
server_dev_mode
desktop_dev_mode

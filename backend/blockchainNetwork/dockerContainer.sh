echo "Deleting exiting containers"

docker rm -f $(docker ps -aq)

echo "Deleting existing networks"

docker network prune

echo "Deleting existing volumes"

docker volume rm $(docker volume ls)

set -e


# docker rmi $(docker images -q)

echo "Docker is cleared"


echo "Orderer container up"
cd orderer
sh start_container.sh

echo "Orderer container up successfully"


echo "Org1 container up"
cd ../org1
sh start_container.sh

echo "Org1 container up successfully"

echo "org2 container up"
cd ../org2
sh start_container.sh

echo "org2 container up successfully"

echo "org3 container up"
cd ../org3
sh start_container.sh

echo "org3 container up successfully"

cd ..
sh packageinstallchaincode.sh

sh approve_chaincodeAtOnce.sh

cd org1

sh commit_chaincode.sh

set -e

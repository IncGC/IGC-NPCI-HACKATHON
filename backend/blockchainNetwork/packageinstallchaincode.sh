
echo "Entering into Org1 container to package and install chaincodes "
cd org1
sh packintall_chaincode.sh
echo " packageInstallation is completed for Org1  successfully"

echo "Entering into org2 container to package and install chaincodes "
cd ../org2
sh packintall_chaincode.sh

echo " packageInstallation is completed for org2  successfully"

echo "Entering into org3 container to package and install chaincodes "
cd ../org3
sh packintall_chaincode.sh

echo " packageInstallation is completed for org3  successfully"



set -e

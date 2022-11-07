

echo "Approval for Org1 container is started "
cd org1

sh approve_chaincode.sh

echo "Approval by Org1 container  successfully"

echo "Approval for org2 container is started "
cd ../org2

sh approve_chaincode.sh

echo "Approval by Org2 container  successfully"

echo "Approval for org3 container is started "
cd ../org3

sh approve_chaincode.sh

echo "Approval by Org3 container  successfully"

echo "Approval for org4 container is started "
cd ../org4

sh approve_chaincode.sh

echo "Approval by Org4 container  successfully"


echo "Approval for org5 container is started "
cd ../org5

sh approve_chaincode.sh

echo "Approval by Org5 container  successfully"

set -e

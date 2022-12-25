#!/bin/bash
            
echo "************ Package Tokenize chaincode **********" 
pushd /opt/gopath/src/github.com/chaincode/Tokenize/
GO111MODULE=on go mod vendor
popd

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode package Tokenize.tar.gz --path /opt/gopath/src/github.com/chaincode/Tokenize/ --lang golang --label Tokenize_1.0


echo "************ Package Transactions chaincode **********" 
pushd /opt/gopath/src/github.com/chaincode/Transactions/
GO111MODULE=on go mod vendor
popd

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode package Transactions.tar.gz --path /opt/gopath/src/github.com/chaincode/Transactions/ --lang golang --label Transactions_1.0


echo "***************** Install Tokenize chaincode ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode install Tokenize.tar.gz


echo "***************** Install Transactions chaincode ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode install Transactions.tar.gz



#!/bin/bash

echo "************ Package Transactions chaincode **********" 
pushd /opt/gopath/src/github.com/chaincode/Transactions/
GO111MODULE=on go mod vendor
popd

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode package Transactions.tar.gz --path /opt/gopath/src/github.com/chaincode/Transactions/ --lang golang --label Transactions_1.0

echo "***************** Install Transactions chaincode ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode install Transactions.tar.gz

echo "************ Package Bond chaincode **********" 
pushd /opt/gopath/src/github.com/chaincode/Bond/
GO111MODULE=on go mod vendor
popd

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode package Bond.tar.gz --path /opt/gopath/src/github.com/chaincode/Bond/ --lang golang --label Bond_1.0

echo "***************** Install Bond chaincode ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode install Bond.tar.gz


echo "************ Package BondHolding chaincode **********" 
pushd /opt/gopath/src/github.com/chaincode/BondHolding/
GO111MODULE=on go mod vendor
popd

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode package BondHolding.tar.gz --path /opt/gopath/src/github.com/chaincode/BondHolding/ --lang golang --label BondHolding_1.0

echo "***************** Install BondHolding chaincode ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode install BondHolding.tar.gz

echo "************ Package TokenHolding chaincode **********" 
pushd /opt/gopath/src/github.com/chaincode/TokenHolding/
GO111MODULE=on go mod vendor
popd

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode package TokenHolding.tar.gz --path /opt/gopath/src/github.com/chaincode/TokenHolding/ --lang golang --label TokenHolding_1.0

echo "***************** Install TokenHolding chaincode ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode install TokenHolding.tar.gz


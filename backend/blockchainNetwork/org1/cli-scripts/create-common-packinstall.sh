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

echo "************ Package CBDCwallet chaincode **********" 
pushd /opt/gopath/src/github.com/chaincode/CBDCwallet/
GO111MODULE=on go mod vendor
popd

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode package CBDCwallet.tar.gz --path /opt/gopath/src/github.com/chaincode/CBDCwallet/ --lang golang --label CBDCwallet_1.0

echo "***************** Install CBDCwallet chaincode ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode install CBDCwallet.tar.gz


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


echo "************ Package BuyOrder chaincode **********" 
pushd /opt/gopath/src/github.com/chaincode/BuyOrder/
GO111MODULE=on go mod vendor
popd

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode package BuyOrder.tar.gz --path /opt/gopath/src/github.com/chaincode/BuyOrder/ --lang golang --label BuyOrder_1.0

echo "***************** Install BuyOrder chaincode ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode install BuyOrder.tar.gz

echo "************ Package MBEmarket chaincode **********" 
pushd /opt/gopath/src/github.com/chaincode/MBEmarket/
GO111MODULE=on go mod vendor
popd

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode package MBEmarket.tar.gz --path /opt/gopath/src/github.com/chaincode/MBEmarket/ --lang golang --label MBEmarket_1.0

echo "***************** Install MBEmarket chaincode ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode install MBEmarket.tar.gz


echo "************ Package PurchaseLog chaincode **********" 
pushd /opt/gopath/src/github.com/chaincode/PurchaseLog/
GO111MODULE=on go mod vendor
popd

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode package PurchaseLog.tar.gz --path /opt/gopath/src/github.com/chaincode/PurchaseLog/ --lang golang --label PurchaseLog_1.0

echo "***************** Install PurchaseLog chaincode ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode install PurchaseLog.tar.gz

echo "************ Package SellOrder chaincode **********" 
pushd /opt/gopath/src/github.com/chaincode/SellOrder/
GO111MODULE=on go mod vendor
popd

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode package SellOrder.tar.gz --path /opt/gopath/src/github.com/chaincode/SellOrder/ --lang golang --label SellOrder_1.0

echo "***************** Install SellOrder chaincode ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/users/Admin@org1.mbe.com/msp CORE_PEER_ADDRESS=peer0.org1.mbe.com:7051 CORE_PEER_LOCALMSPID="org1MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org1.mbe.com/peers/peer0.org1.mbe.com/tls/ca.crt 
peer lifecycle chaincode install SellOrder.tar.gz


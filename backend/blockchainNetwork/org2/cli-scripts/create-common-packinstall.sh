#!/bin/bash
            
echo "************ Package token chaincode **********" 
pushd /opt/gopath/src/github.com/chaincode/token/
GO111MODULE=on go mod vendor
popd

CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
peer lifecycle chaincode package token.tar.gz --path /opt/gopath/src/github.com/chaincode/token/ --lang golang --label token_1.0




echo "***************** Install token chaincode ***************"
CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
peer lifecycle chaincode install token.tar.gz


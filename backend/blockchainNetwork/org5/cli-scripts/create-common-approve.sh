#!/bin/bash
            
echo "***************** queryinstalled token chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.mbe.com/users/Admin@org5.mbe.com/msp CORE_PEER_ADDRESS=peer0.org5.mbe.com:7051 CORE_PEER_LOCALMSPID="org5MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.mbe.com/peers/peer0.org5.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode queryinstalled >&log.txt
                    { set +x; } 2>/dev/null
                    cat log.txt
                    PACKAGE_ID=$(sed -n "/token_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
echo "***************** ApproveforMyOrg token chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.mbe.com/users/Admin@org5.mbe.com/msp CORE_PEER_ADDRESS=peer0.org5.mbe.com:7051 CORE_PEER_LOCALMSPID="org5MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.mbe.com/peers/peer0.org5.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode approveformyorg -o orderer1.orderer.mbe.com:7050 --ordererTLSHostnameOverride orderer1.orderer.mbe.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.mbe.com-cert.pem --channelID common --name token --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
echo "***************** checkCommitReadiness token chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.mbe.com/users/Admin@org5.mbe.com/msp CORE_PEER_ADDRESS=peer0.org5.mbe.com:7051 CORE_PEER_LOCALMSPID="org5MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.mbe.com/peers/peer0.org5.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode checkcommitreadiness --channelID common --name token --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"

echo "***************** queryinstalled InvestorDetails chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.mbe.com/users/Admin@org5.mbe.com/msp CORE_PEER_ADDRESS=peer0.org5.mbe.com:7051 CORE_PEER_LOCALMSPID="org5MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.mbe.com/peers/peer0.org5.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode queryinstalled >&log.txt
                    { set +x; } 2>/dev/null
                    cat log.txt
                    PACKAGE_ID=$(sed -n "/InvestorDetails_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
echo "***************** ApproveforMyOrg InvestorDetails chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.mbe.com/users/Admin@org5.mbe.com/msp CORE_PEER_ADDRESS=peer0.org5.mbe.com:7051 CORE_PEER_LOCALMSPID="org5MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.mbe.com/peers/peer0.org5.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode approveformyorg -o orderer1.orderer.mbe.com:7050 --ordererTLSHostnameOverride orderer1.orderer.mbe.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.mbe.com-cert.pem --channelID common --name InvestorDetails --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"
                    
echo "***************** checkCommitReadiness InvestorDetails chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.mbe.com/users/Admin@org5.mbe.com/msp CORE_PEER_ADDRESS=peer0.org5.mbe.com:7051 CORE_PEER_LOCALMSPID="org5MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org5.mbe.com/peers/peer0.org5.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode checkcommitreadiness --channelID common --name InvestorDetails --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer','org4MSP.peer','org5MSP.peer' )"

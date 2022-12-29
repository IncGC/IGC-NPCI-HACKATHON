#!/bin/bash
            

echo "***************** queryinstalled Transactions chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode queryinstalled >&log.txt
                    { set +x; } 2>/dev/null
                    cat log.txt
                    PACKAGE_ID=$(sed -n "/Transactions_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
echo "***************** ApproveforMyOrg Transactions chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode approveformyorg -o orderer1.orderer.mbe.com:7050 --ordererTLSHostnameOverride orderer1.orderer.mbe.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.mbe.com-cert.pem --channelID common --name Transactions --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer')"
                    
echo "***************** checkCommitReadiness Transactions chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode checkcommitreadiness --channelID common --name Transactions --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer')"
echo "***************** queryinstalled CBDCwallet chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode queryinstalled >&log.txt
                    { set +x; } 2>/dev/null
                    cat log.txt
                    PACKAGE_ID=$(sed -n "/CBDCwallet_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
echo "***************** ApproveforMyOrg CBDCwallet chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode approveformyorg -o orderer1.orderer.mbe.com:7050 --ordererTLSHostnameOverride orderer1.orderer.mbe.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.mbe.com-cert.pem --channelID common --name CBDCwallet --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer')"
                    
echo "***************** checkCommitReadiness CBDCwallet chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode checkcommitreadiness --channelID common --name CBDCwallet --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer')"


echo "***************** queryinstalled BondHolding chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode queryinstalled >&log.txt
                    { set +x; } 2>/dev/null
                    cat log.txt
                    PACKAGE_ID=$(sed -n "/BondHolding_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
echo "***************** ApproveforMyOrg BondHolding chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode approveformyorg -o orderer1.orderer.mbe.com:7050 --ordererTLSHostnameOverride orderer1.orderer.mbe.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.mbe.com-cert.pem --channelID common --name BondHolding --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer')"
                    
echo "***************** checkCommitReadiness BondHolding chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode checkcommitreadiness --channelID common --name BondHolding --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer')"


echo "***************** queryinstalled TokenHolding chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode queryinstalled >&log.txt
                    { set +x; } 2>/dev/null
                    cat log.txt
                    PACKAGE_ID=$(sed -n "/TokenHolding_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
echo "***************** ApproveforMyOrg TokenHolding chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode approveformyorg -o orderer1.orderer.mbe.com:7050 --ordererTLSHostnameOverride orderer1.orderer.mbe.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.mbe.com-cert.pem --channelID common --name TokenHolding --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer')"
                    
echo "***************** checkCommitReadiness TokenHolding chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode checkcommitreadiness --channelID common --name TokenHolding --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer')"

echo "***************** queryinstalled BuyOrder chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode queryinstalled >&log.txt
                    { set +x; } 2>/dev/null
                    cat log.txt
                    PACKAGE_ID=$(sed -n "/BuyOrder_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
echo "***************** ApproveforMyOrg BuyOrder chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode approveformyorg -o orderer1.orderer.mbe.com:7050 --ordererTLSHostnameOverride orderer1.orderer.mbe.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.mbe.com-cert.pem --channelID common --name BuyOrder --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer')"
                    
echo "***************** checkCommitReadiness BuyOrder chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode checkcommitreadiness --channelID common --name BuyOrder --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer')"
echo "***************** queryinstalled MBEmarket chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode queryinstalled >&log.txt
                    { set +x; } 2>/dev/null
                    cat log.txt
                    PACKAGE_ID=$(sed -n "/MBEmarket_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
echo "***************** ApproveforMyOrg MBEmarket chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode approveformyorg -o orderer1.orderer.mbe.com:7050 --ordererTLSHostnameOverride orderer1.orderer.mbe.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.mbe.com-cert.pem --channelID common --name MBEmarket --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer')"
                    
echo "***************** checkCommitReadiness MBEmarket chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode checkcommitreadiness --channelID common --name MBEmarket --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer')"


echo "***************** queryinstalled SellOrder chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode queryinstalled >&log.txt
                    { set +x; } 2>/dev/null
                    cat log.txt
                    PACKAGE_ID=$(sed -n "/SellOrder_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
echo "***************** ApproveforMyOrg SellOrder chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode approveformyorg -o orderer1.orderer.mbe.com:7050 --ordererTLSHostnameOverride orderer1.orderer.mbe.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.mbe.com-cert.pem --channelID common --name SellOrder --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer')"
                    
echo "***************** checkCommitReadiness SellOrder chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode checkcommitreadiness --channelID common --name SellOrder --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer')"


echo "***************** queryinstalled PurchaseLog chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode queryinstalled >&log.txt
                    { set +x; } 2>/dev/null
                    cat log.txt
                    PACKAGE_ID=$(sed -n "/PurchaseLog_1.0/{s/^Package ID: //; s/, Label:.*$//; p;}" log.txt)
                    
echo "***************** ApproveforMyOrg PurchaseLog chaincode ***************"
                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode approveformyorg -o orderer1.orderer.mbe.com:7050 --ordererTLSHostnameOverride orderer1.orderer.mbe.com --tls --cafile /opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/orderer/tls/tlsca.orderer.mbe.com-cert.pem --channelID common --name PurchaseLog --version 1.0 --package-id $PACKAGE_ID --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer')"
                    
echo "***************** checkCommitReadiness PurchaseLog chaincode ***************"

                    CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/users/Admin@org2.mbe.com/msp CORE_PEER_ADDRESS=peer0.org2.mbe.com:7051 CORE_PEER_LOCALMSPID="org2MSP" CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/org2.mbe.com/peers/peer0.org2.mbe.com/tls/ca.crt 
                    peer lifecycle chaincode checkcommitreadiness --channelID common --name PurchaseLog --version 1.0 --sequence 1    --signature-policy "OR('org1MSP.peer','org2MSP.peer','org3MSP.peer')"

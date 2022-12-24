# Genesis Block
configtxgen -profile RaftOrderer -channelID colending-sys-channel -outputBlock ./channel-artifacts/genesis.block

#Channel

configtxgen -profile common -outputCreateChannelTx ./channel-artifacts/common.tx -channelID common

#Anchor Peer of Org1

configtxgen -profile common -outputAnchorPeersUpdate ./channel-artifacts/org1AnchorPeer.tx -channelID common -asOrg org1MSP

#Anchor peer of Org2

configtxgen -profile common -outputAnchorPeersUpdate ./channel-artifacts/org2AnchorPeer.tx -channelID common -asOrg org2MSP

#Anchor peer of Org3

configtxgen -profile common -outputAnchorPeersUpdate ./channel-artifacts/org3AnchorPeer.tx -channelID common -asOrg org3MSP
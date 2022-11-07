# Genesis Block
configtxgen -profile RaftOrderer -channelID common-sys-channel -outputBlock ./channel-artifacts/genesis.block

# Channel

configtxgen -profile common -outputCreateChannelTx ./channel-artifacts/common.tx -channelID common

#Anchor Peer of Org1

configtxgen -profile common -outputAnchorPeersUpdate ./channel-artifacts/org1AnchorPeer.tx -channelID common -asOrg org1MSP

#Anchor peer of Org2

configtxgen -profile common -outputAnchorPeersUpdate ./channel-artifacts/org2AnchorPeer.tx -channelID common -asOrg org2MSP

#Anchor peer of Org3

configtxgen -profile common -outputAnchorPeersUpdate ./channel-artifacts/org3AnchorPeer.tx -channelID common -asOrg org3MSP

#Anchor peer of Org4

configtxgen -profile common -outputAnchorPeersUpdate ./channel-artifacts/org4AnchorPeer.tx -channelID common -asOrg org4MSP

#Anchor peer of Org5

configtxgen -profile common -outputAnchorPeersUpdate ./channel-artifacts/org5AnchorPeer.tx -channelID common -asOrg org5MSP


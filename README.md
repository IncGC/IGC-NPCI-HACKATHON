# IGC-NPCI-HACKATHON

This repository consists of two major components. One for Blockchain & other for Api-Server

- blockchain-network
- api-server

## blockchain-network

- 3 Organization
- Raft Orderer Setup (5 ORDERER)
- Chaincode(Smart Contract)
- Shell Script to Start Containers
- Shell Script to package & install the chaincode
- Shell Script to approve chaincode
- Shell script to commit the chaincode

## api-server
Api server will have necessary API components. It includes the nodejs-sdk to invoke tranasction in blockchain. Such as invoke, read, etc., It contains, "Swagger" which list down all the API's that are created for this project.

> Enroll Admin & Register Wallet
> Invoke Txn & Query Txn

- app - contains the key componets which speaks to blockchain
- config - contains key/passport that are necessary for JWT token generation & also MongoDB URL
- crypto - contains all the necessary crypto files for all the HLF components such as (Org, Peer, Orderer, CA etc)
- routes - conttains the necessary api's for Participant, transation, assets, 
- swagger - contains swagger templates

## How to Run - Blockchain-network
To run this successfully, in your system. YOu should have the pre-requisites exected first.
```
git clone https://github.com/IncGC/IGC-NPCI-HACKATHON.git
```
Once the repository is cloned in your local machine, then 

```
chmod u+x prereqs-ubuntu.sh
sh prereqs-ubuntu.sh
```

Download necessary fabric images, this step will take 30 mins max to download all necessary files. It depends on your internet speed
```
curl -sSL https://bit.ly/2ysbOFE | bash -s -- 2.2.3 1.5.2
```

Make sure, you have the following node version to trigger API server
'''
nvm install 10.24.1
'''


Above steps will prep your machine and keep the environment ready

Now, it's time to run the blockchain-network
- blockchain-network will have (Orderer, Org1, Org2, Org3)
- Trigger the containers.. Like

To run all the docker containers go to the blockchainNetwork by

``` cd blockchainNetwork ```

- To run docker file you will find dockerContainer.sh

run this file by following the command

``` sh dockerContainer.sh ```

It will ensure, all the necessary containers are up & running, chaincodes are packaged, installed, approved and finally committed. By now, your blockchain is up & running & ready to listen for an event to occur

## How to Run Api-server

go to Api-server folder and run 
```
npm start
```
## Restart the stopped docker containers

```docker start $(docker ps -aq)```
## Clean-up Containers

```
docker rm -f $(docker ps -aq) 
docker volume rm $(docker volume ls)

```

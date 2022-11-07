#!/bin/bash

chmod u+x ./cli-scripts/*

sleep 1

mkdir -p $PWD/fabric-ca-server

docker-compose -f docker-compose-org4.yaml up -d

sleep 5
docker exec cli-org4 scripts/create-common-network.sh



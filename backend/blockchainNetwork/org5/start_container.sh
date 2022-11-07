#!/bin/bash

chmod u+x ./cli-scripts/*

sleep 1

mkdir -p $PWD/fabric-ca-server

docker-compose -f docker-compose-org5.yaml up -d

sleep 5
docker exec cli-org5 scripts/create-common-network.sh



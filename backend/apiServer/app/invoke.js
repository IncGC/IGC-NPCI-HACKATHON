const { getCCP, getWallets } = require("../utils/buildCCP");
const { Wallets, Gateway } = require('fabric-network');
const path = require("path");
const { buildWallet } = require('../utils/AppUtils');
const { CHAINCODE_ACTIONS } = require("../utils/helper");
const { getSchema } = require('../utils/Schema')


let defaultValue = { userName: "mbev1org1", org: "org1MSP" }

exports.invokeTransaction = async ({
    metaInfo = defaultValue,
    channelName,
    chainCodeName,
    chainCodeFunctionName,
    data,
    chainCodeAction
}) => {


    // console.log("hiihihihihih")
    // getting schema
    let schema = getSchema(chainCodeName)
    // console.log(chainCodeName);

    let num = Number(metaInfo.org.match(/\d/g).join(""));

    const ccp = getCCP(num);

    const walletPath = await getWallets(num);

    // console.log("wallet path is",walletPath);

    const wallet = await buildWallet(Wallets, walletPath);

    const gateway = new Gateway();

    await gateway.connect(ccp, {
        wallet,

        identity: metaInfo.userName,
        discovery: { enabled: true, asLocalhost: true } // using asLocalhost as this gateway is using a fabric network deployed locally
    });

    // Build a network instance based on the channel where the smart contract is deployed
    const network = await gateway.getNetwork(channelName);

    // Get the contract from the network.
    const contract = network.getContract(chainCodeName);

    // marshalling objects into string in specific order separated "^^"
    let arr = [];
    // when doing create or update transaction
    if (chainCodeAction == CHAINCODE_ACTIONS.CREATE || chainCodeAction == CHAINCODE_ACTIONS.UPDATE) {
        for (let i = 0; i < schema.length; i++) {
            let key = schema[i].name;
            arr.push(data[key] || "")
        }
    }

    if (chainCodeAction == CHAINCODE_ACTIONS.DELETE) {
        arr.push(data)
    }

    if (chainCodeAction == CHAINCODE_ACTIONS.GET) {
        arr.push(data)
    }

    let serializedData = arr.join("^^")

    console.log("SerializedData is ", serializedData)

    const transaction = contract.createTransaction(chainCodeFunctionName);
    const result = await transaction.submit(serializedData);

    console.log("Result:", result.toString())
    console.log("TxID:", transaction.getTransactionId());

    if (chainCodeAction == CHAINCODE_ACTIONS.GET) {
        return result.toString();
    }

    let obj = { "Success": true, "Txn ID": transaction.getTransactionId(), "statusCode": 200 };

    return obj;
}
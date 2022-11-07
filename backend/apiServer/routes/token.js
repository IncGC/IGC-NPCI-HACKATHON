const router = require('express').Router();

const{HandleError}= require('../utils/HandleResponseError');
const {CHAINCODE_ACTIONS, CHAIN_CHANNEL, CHAINCODE_NAMES, getNow, CHAINCODE_CHANNEL}=require('../utils/helper');
const {MOCK_LIVE_MARKET_DATA}=require('../utils/mockData');
const {invokeTransaction}= require('../app/invoke');

router.post('/liveMarket', async (req, res)=>{
    try{
        let{ securityCode, issuerName, couponRate, maturity, volume, price, yield, currency, noOfTokens}=req.body;
           
        
        const tokenValue= parseInt(volume)/parseInt(noOfTokens);
        let data = {
            securityCode, 
            issuerName, 
            couponRate,
            maturity,
            volume,
            price,
            yield,
            currency,
            tokenValue,
            CreatedOn: getNow(),
            CreatedBy:req.user.id,
            isDelete: false
        }
        let message = await invokeTransaction({
            metaInfo:{userName:req.user.email, org:"org1MSP"},
            chainCodeAction:CHAINCODE_ACTIONS.CREATE,
            channelName:CHAINCODE_CHANNEL,
            data:data,
            chainCodeFunctionName:'create',
            chainCodeName:CHAINCODE_NAMES.TOKEN
        })
        console.log(message);
        res.status(201).json(data);
    }catch(err){
        HandleError(err,res);
    }
})
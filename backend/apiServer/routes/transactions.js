const router = require('express').Router();

const{HandleError}= require('../utils/HandleResponseError');
const {CHAINCODE_ACTIONS, CHAIN_CHANNEL, CHAINCODE_NAMES, getNow, CHAINCODE_CHANNEL, generateId}=require('../utils/helper');
const {invokeTransaction}= require('../app/invoke');

router.post('/', async (req, res)=>{
    try{
        let{ PanCardNum, FirstName, LastName, SurName, Gender, FatherName, DOB, Address, Nationality,AadharNum}=req.body;
           
        
        const tokenValue= parseInt(volume)/parseInt(noOfTokens);
        let data = {
            Id:generateId(),
            CreatedOn: getNow(),
            CreatedBy:req.user.id,
            isDelete: false,
            PanCardNum,
            FirstName,
            SurName,
            Gender,
            FatherName,
            DOB,
            Address,
            Nationality,
            AadharNum
        }
        let message = await invokeTransaction({
            metaInfo:{userName:req.user.email, org:"org1MSP"},
            chainCodeAction:CHAINCODE_ACTIONS.CREATE,
            channelName:CHAINCODE_CHANNEL,
            data:data,
            chainCodeFunctionName:'create',
            chainCodeName:CHAINCODE_NAMES.INVESTORDETAILS
        })
        console.log(message);
        res.status(201).json(data);
    }catch(err){
        HandleError(err,res);
    }
})

module.exports = router;
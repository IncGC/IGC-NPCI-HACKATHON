const router = require('express').Router();

const {CHAINCODE_ACTIONS, CHAINCODE_NAMES, getNow, CHAINCODE_CHANNEL, generateId}=require('../utils/helper');
const {invokeTransaction}= require('../app/invoke');
const passport = require('passport')


const fs= require('fs');
const { parse } = require("csv-parse");

router.post('/', async (req, res)=>{
    try{
        let{ PanCardNum, FirstName, LastName, SurName, Gender, FatherName, DOB, Address, Nationality,AadharNum}=req.body;
           
        
        // const TokenValue= parseInt(volume)/parseInt(NumOfToken);
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
        res.send(err);
    }
})


router.post('/bondholdings',passport.authenticate("jwt", { session: false }), async(req,res)=>{
    try{

        let {MbeId}= req.user;

        // console.log(req.body);
        async function readFile() {
          fs.createReadStream('../data/bond.csv')
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", async function (row) {
              let obj = {
                // "Isin": row[0],
                Id: generateId(),
                CreatedOn: getNow(),
                CreatedBy: req.user.MbeId,
                IsDelete: 'false',
                IsHidden: 'false',
                IsTokenized: 'false',
                IsProcessed: 'false',
                Isin: row[0],
                MbeId: row[1],
                IssuerName: row[2],
                CouponRate: row[3],
                FaceValue: row[4],
                CreditRating  : row[5],
                MaturityDate: row[6],
                PurchasePrice: row[7],
                NumOfToken: row[8],
                CurrentPrice: row[9],
                LotQty: row[10],
                TokenizedLot: row[11],
                TotalTokenQty: row[12],
                RemainingToken: row[13],
              };
              // let record = new Bonds(obj);
              // record.save();
              let message = await invokeTransaction({
                metaInfo: { userName:req.user.MbeId, org: "org1MSP" },
                chainCodeAction: "create",
                channelName: "common",
                data: obj,
                chainCodeFunctionName: "create",
                chainCodeName: "BondHolding",
              });
              // console.log("hi ");
            
    
            })
            .on("end", function () {
              console.log("end");
            });
        }
    
     readFile()
    
    }catch(err){
        res.status(404).json({
            status:404,
            message:"Not Found"
    })}
}) 

module.exports = router;
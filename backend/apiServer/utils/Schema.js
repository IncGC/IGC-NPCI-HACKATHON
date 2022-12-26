const { CustomError } = require("./HandleResponseError")
const { CHAINCODE_NAMES } = require("./helper")

const Bond_SCHEMA = [
    { "name": "Id" },
    { "name": "CreatedOn" },
    { "name": "CreatedBy" },
    { "name": "IsDelete" },
    { "name": "IsHidden" },
    { "name": "isin" },
    { "name": "IssuerName" },
    { "name": "CouponRate" },
    { "name": "faceValue" },
    { "name": "Ltp" },
    { "name": "CreditRating" },
    { "name": "MaturityDate" },
    { "name": "securityDescription" },
    { "name": "latestBidPrice" },
    { "name": "latestAskPrice" },
    { "name": "currency" },
    { "name": "NumToken" },
    { "name": "Detokenizedtoken" },
    { "name": "detokenizedValue" },
    { "name": "tradeValue" },

]

const TRASANSATIONS_SCHEMA = [
    { name: "Id" },
    { name: "CreatedOn" },
    { name: "CreatedBy" },
    { name: "IsDelete" },
    { name: "IsHidden" },
    { name: "trnxID" },
    { name: "isin" },
    { name: "userID" },
    { name: "noOfTokens" },
    { name: "date" },
    { name: "nature" },
    { name: "status" },
    { name: "authrization" },
    {name: "amout"},
    {name: "certificate"}
]

exports.getSchema = (chaincodeName)=>{
    switch(chaincodeName){
        case CHAINCODE_NAMES.Bond: return Bond_SCHEMA
        case CHAINCODE_NAMES.TRASANSATIONS: return TRASANSATIONS_SCHEMA
        default: 
            throw new CustomError({ code: 404, message: `Schema for chaincodename : ${chaincodeName} does not exists` })
    }
}
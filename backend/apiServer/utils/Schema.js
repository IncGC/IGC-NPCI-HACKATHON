const { CustomError } = require("./HandleResponseError")
const { CHAINCODE_NAMES } = require("./helper")

const TOKENIZE_SCHEMA = [
    { "name": "Id" },
    { "name": "CreatedOn" },
    { "name": "CreatedBy" },
    { "name": "IsDelete" },
    { "name": "IsHidden" },
    { "name": "isin" },
    { "name": "IssuerName" },
    { "name": "CouponRate" },
    { "name": "Price" },
    { "name": "MaturityDate" },
    { "name": "yield" },
    { "name": "Currency" },
    { "name": "NoOfTokenizes" },
    { "name": "TokenizeValue" }
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
        case CHAINCODE_NAMES.TOKENIZE: return TOKENIZE_SCHEMA
        case CHAINCODE_NAMES.TRASANSATIONS: return TRASANSATIONS_SCHEMA
        default: 
            throw new CustomError({ code: 404, message: `Schema for chaincodename : ${chaincodeName} does not exists` })
    }
}
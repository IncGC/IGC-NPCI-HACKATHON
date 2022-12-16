const { CustomError } = require("./HandleResponseError")
const { CHAINCODE_NAMES } = require("./helper")

const INVESTORDETAILS_SCHEMA = [
    { "name": "Id" },
    { "name": "CreatedOn" },
    { "name": "CreatedBy" },
    { "name": "IsDelete" },
    { "name": "PanCardNum" },
    { "name": "FirstName" },
    { "name": "LastName" },
    { "name": "SurName" },
    { "name": "Gender" },
    { "name": "FatherName" },
    { "name": "DOB" },
    { "name": "Address" },
    { "name": "Nationality" },
    { "name": "AadharNum" }
]

const TOKEN_SCHEMA = [
    { name: "Id" },
    { name: "SecurityCode" },
    { name: "CreatedOn" },
    { name: "CreatedBy" },
    { name: "IsDelete" },
    { name: "IssuerName" },
    { name: "CouponRate" },
    { name: "Maturity" },
    { name: "Volume" },
    { name: "Price" },
    { name: "yield" },
    { name: "Currency" },
    { name: "NoOfTokens" },
    { name: "TokenValue" },
]


exports.getSchema = (chaincodeName)=>{
    switch(chaincodeName){
        case CHAINCODE_NAMES.INVESTORDETAILS: return INVESTORDETAILS_SCHEMA
        case CHAINCODE_NAMES.TOKEN: return TOKEN_SCHEMA
        default: 
            throw new CustomError({ code: 404, message: `Schema for chaincodename : ${chaincodeName} does not exists` })
    }
}
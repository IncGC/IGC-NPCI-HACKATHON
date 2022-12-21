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

const USER_SCHEMA = [
    { name: "Id" },
    { name: "Participant_id" },
    { name: "CreatedOn" },
    { name: "CreatedBy" },
    { name: "IsDelete" },
    { name: "FirstName" },
    { name: "LastName" },
    { name: "FatherName" },
    { name: "Nationality" },
    { name: "Email" },
    { name: "PhoneNumber" },
    { name: "Gender" },
    { name: "Address" },
    { name: "DOB" },
    { name: "Role" },
    { name: "PanCard" },
    { name: "AadharCard" },
]

exports.getSchema = (chaincodeName)=>{
    switch(chaincodeName){
        case CHAINCODE_NAMES.INVESTORDETAILS: return INVESTORDETAILS_SCHEMA
        case CHAINCODE_NAMES.TOKEN: return TOKEN_SCHEMA
        case CHAINCODE_NAMES.USERS : return USER_SCHEMA
        default: 
            throw new CustomError({ code: 404, message: `Schema for chaincodename : ${chaincodeName} does not exists` })
    }
}
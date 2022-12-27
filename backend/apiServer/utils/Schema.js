const { CustomError } = require("./HandleResponseError");
const { CHAINCODE_NAMES } = require("./helper");

const BOND_SCHEMA = [
  { name: "id" },
  { name: "createdOn" },
  { name: "createdBy" },
  { name: "isDelete" },
  { name: "isHidden" },
  { name: "isin" },
  { name: "issuerName" },
  { name: "couponRate" },
  { name: "faceValue" },
  { name: "ltp" },
  { name: "creditRating" },
  { name: "maturityDate" },
  { name: "securityDescription" },
  { name: "latestBidPrice" },
  { name: "latestAskPrice" },
  { name: "currency" },
  { name: "numToken" },
  { name: "detokenizedtoken" },
  { name: "detokenizedValue" },
  { name: "tradeValue" },
];

const BONDHOLDING_SCHEMA = [
  { name: "Id" },
  { name: "CreatedOn" },
  { name: "CreatedBy" },
  { name: "IsDelete" },
  { name: "IsHidden" },
  { name: "isin" },
  { name: "mbeId" },
  { name: "IssuerName" },
  { name: "CouponRate" },
  { name: "faceValue" },
  { name: "CreditRating" },
  { name: "MaturityDate" },
  { name: "purchasePrice" },
  { name: "NumToken" },
  { name: "currentPrice" },
  { name: "numOfLots" },
  { name: "tokenizedLot" },
  { name: "totalTokenQty" },
  { name: "RemainingToken" },
];

const TOKENHOLDING_SCHEMA = [
  { name: "Id" },
  { name: "CreatedOn" },
  { name: "CreatedBy" },
  { name: "IsDelete" },
  { name: "IsHidden" },
  { name: "isin" },
  { name: "mbeId" },
  { name: "IssuerName" },
  { name: "CouponRate" },
  { name: "faceValue" },
  { name: "faceValue" },
  { name: "CreditRating" },
  { name: "MaturityDate" },
  { name: "latestBidPrice" },
  { name: "latestAskPrice" },
  { name: "purchasePrice" },
  { name: "NumToken" },
  { name: "currentPrice" },
  { name: "numOfLots" },
];
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
  { name: "authorization" },
  { name: "amout" },
  { name: "certificate" },
];

const BUYORDER_SCHEMA = [
  { name: "Id" },
  { name: "CreatedOn" },
  { name: "CreatedBy" },
  { name: "IsDelete" },
  { name: "IsHidden" },
  { name: "IsProcessed" },
  { name: "mbeId" },
  { name: "isin" },
  { name: "price" },
  { name: "noOfTokens" },
];

const SELLORDER_SCHEMA = [
  { name: "Id" },
  { name: "CreatedOn" },
  { name: "CreatedBy" },
  { name: "IsDelete" },
  { name: "IsHidden" },
  { name: "IsHidden" },
  { name: "IsProcessed" },
  { name: "mbeId" },
  { name: "isin" },
  { name: "price" },
  { name: "noOfTokens" },
];

const MBEMARTKET_SCHEMA = [
  { name: "Id" },
  { name: "CreatedOn" },
  { name: "CreatedBy" },
  { name: "IsDelete" },
  { name: "IsHidden" },
  { name: "isin" },
  { name: "mbeId" },
  { name: "IssuerName" },
  { name: "CouponRate" },
  { name: "faceValue" },
  { name: "Ltp" },
  { name: "CreditRating" },
  { name: "MaturityDate" },
  { name: "securityDescription" },
  { name: "latestBidPrice" },
  { name: "latestAskPrice" },
  { name: "currency" },
  { name: "numOfLots" },
  { name: "tokenizedLot" },
  { name: "totalTokenQty" },
  { name: "RemainingToken" },
  { name: "Detokenizedtoken" },
  { name: "detokenizedValue" },
];

const PURCHASELOG_SCHEMA = [
  { name: "Id" },
  { name: "CreatedOn" },
  { name: "CreatedBy" },
  { name: "IsDelete" },
  { name: "IsHidden" },
  { name: "IsProcessed" },
  { name: "IsAuthorize" },
  { name: "IsPurchase" },
  { name: "mbeId" },
  { name: "isin" },
  { name: "price" },
  { name: "noOfTokens" },
  { name: "tradeValue" },
];
exports.getSchema = (chaincodeName) => {
  switch (chaincodeName) {
    case CHAINCODE_NAMES.BOND:
      return BOND_SCHEMA;
    case CHAINCODE_NAMES.TRASANSATIONS:
      return TRASANSATIONS_SCHEMA;
    case CHAINCODE_NAMES.BONDHOLDING:
      return BONDHOLDING_SCHEMA;
    case CHAINCODE_NAMES.TOKENHOLDING:
      return TOKENHOLDING_SCHEMA;
    case CHAINCODE_NAMES.BUYORDER:
      return BUYORDER_SCHEMA;
    case CHAINCODE_NAMES.SELLORDER:
      return SELLORDER_SCHEMA;
    case CHAINCODE_NAMES.MBEMARKET:
      return MBEMARTKET_SCHEMA;
    case CHAINCODE_NAMES.PURCHASELOG:
      return PURCHASELOG_SCHEMA;

    default:
      throw new CustomError({
        code: 404,
        message: `Schema for chaincodename : ${chaincodeName} does not exists`,
      });
  }
};

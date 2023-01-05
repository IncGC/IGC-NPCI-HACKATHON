const { CustomError } = require("./HandleResponseError");
const { CHAINCODE_NAMES } = require("./helper");

const CBDCWALLET_SCHEMA = [
  { "name": "Id", "type": "string" },
  { "name": "CreatedOn", "type": "string" },
  { "name": "CreatedBy", "type": "string" },
  { "name": "IsDelete" },
  { "name": "IsHidden" },
  { "name": "IsUpdated" },
  { "name": "MbeId" , "type": "string"},
  { "name": "CBDCbalance", "type": "string" },
];

const BONDHOLDING_SCHEMA = [
  { "name": "Id" },
  { "name": "CreatedOn" },
  { "name": "CreatedBy" },
  { "name": "IsDelete" },
  { "name": "IsHidden" },
  { "name": "IsTokenized" },
  { "name": "IsProcessed" },
  { "name": "Isin" },
  { "name": "MbeId" },
  { "name": "IssuerName" },
  { "name": "CouponRate" },
  { "name": "FaceValue" },
  { "name": "Ltp" },
  { "name": "CreditRating" },
  { "name": "MaturityDate" },
  { "name": "SecurityDescription" },
  { "name": "Currency" },
  { "name": "LotQty" },
  { "name": "TokenizedLot" },
  { "name": "TotalTokenQty" },
  { "name": "RemainingToken" },
];

const TOKENHOLDING_SCHEMA = [
  { "name": "Id" },
  { "name": "CreatedOn" },
  { "name": "CreatedBy" },
  { "name": "IsDelete" },
  { "name": "IsHidden" },
  { "name": "Isin" },
  { "name": "MbeId" },
  { "name": "IssuerName" },
  { "name": "CouponRate" },
  { "name": "FaceValue" },
  { "name": "Ltp" },
  { "name": "CreditRating" },
  { "name": "MaturityDate" },
  { "name": "LatestBidPrice" },
  { "name": "LatestAskPrice" },
  { "name": "PurchasePrice" },
  { "name": "NumOfToken" },
  { "name": "CurrentPrice" },
  { "name": "LotQty" },
  { "name": "DetokenizedTokens" },
  { "name": "DetokenizedValue" },
];
const TRASANSATIONS_SCHEMA = [
  { "name": "Id" },
  { "name": "CreatedOn" },
  { "name": "CreatedBy" },
  { "name": "IsDelete" },
  { "name": "IsHidden" },
  { "name": "Isin" },
  { "name": "MbeId" },
  { "name": "IssuerName" },
  { "name": "NumOfToken" },
  { "name": "Date" },
  { "name": "TransactionsType" },
  { "name": "Status" },
  { "name": "Amount" },
  { "name": "SellOrderId" },
  { "name": "BuyOrderId" },
  { "name": "PurchaselogId" },
];

const BUYORDER_SCHEMA = [
  { "name": "Id" },
  { "name": "CreatedOn" },
  { "name": "CreatedBy" },
  { "name": "IsDelete" },
  { "name": "IsHidden" },
  { "name": "IsProcessed" },
  { "name": "MbeId" },
  { "name": "Isin" },
  { "name": "IssuerName" },
  { "name": "TransactionsType" },
  { "name": "Price" },
  { "name": "NumOfToken" },
];

const SELLORDER_SCHEMA = [
  { "name": "Id" },
  { "name": "CreatedOn" },
  { "name": "CreatedBy" },
  { "name": "IsDelete" },
  { "name": "IsHidden" },
  { "name": "IsProcessed" },
  { "name": "MbeId" },
  { "name": "Isin" },
  { "name": "IssuerName" },
  { "name": "TransactionsType" },
  { "name": "Price" },
  { "name": "NumOfToken" },
];

const MBEMARKET_SCHEMA = [
  { "name": "Id" },
  { "name": "CreatedOn" },
  { "name": "CreatedBy" },
  { "name": "IsDelete" },
  { "name": "IsHidden" },
  { "name": "Isin" },
  { "name": "MbeId" },
  { "name": "IssuerName" },
  { "name": "CouponRate" },
  { "name": "FaceValue" },
  { "name": "Ltp" },
  { "name": "CreditRating" },
  { "name": "MaturityDate" },
  { "name": "SecurityDescription" },
  { "name": "LatestBidPrice" },
  { "name": "LatestAskPrice" },
  { "name": "Currency" },
  { "name": "LotQty" },
  { "name": "TokenizedLot" },
  { "name": "TotalTokenQty" },
  { "name": "RemainingToken" },
  { "name": "Detokenizedtoken" },
  { "name": "DetokenizedValue" },
];

const PURCHASELOG_SCHEMA = [
  { "name": "Id" },
  { "name": "CreatedOn" },
  { "name": "CreatedBy" },
  { "name": "IsDelete" },
  { "name": "IsHidden" },
  { "name": "IsProcessed" },
  { "name": "IsAuthorize" },
  { "name": "IsPurchase" },
  { "name": "MbeId" },
  { "name": "Isin" },
  { "name": "Price" },
  { "name": "NumOfToken" },
  { "name": "TradeValue" },
  { "name": "BuyOrderId" },
  { "name": "SellOrderId" },
  { "name": "IssuerName" },
  { "name": "CouponRate" },
  { "name": "MaturityDate" },
];
exports.getSchema = (chaincodeName) => {
  switch (chaincodeName) {
    case CHAINCODE_NAMES.CBDCWALLET:
      return CBDCWALLET_SCHEMA;
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
      return MBEMARKET_SCHEMA;
    case CHAINCODE_NAMES.PURCHASELOG:
      return PURCHASELOG_SCHEMA;

    default:
      throw new CustomError({
        code: 404,
        message: `Schema for chaincodename : ${chaincodeName} does not exists`,
      });
  }
};

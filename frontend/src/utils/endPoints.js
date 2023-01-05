export const root = {
  baseUrl: "http://13.232.85.144:9090/api/v1/",
}

const endPoints = {
  register_user: 'create_investor',
  userlist: "",
  login: "login",
  forgotPass: "forgot",
  otpSending: "email_phone_otp",
  otpVerify: "email_phone_otp_verify",
  nseData: "nse_data",
  panCardData: "pancard_data",

  getUserDetails: "getUserDetails",

  tokenize: "trade/tokenize",
  detokenize: "trade/detokenize",
  numOfDetokenizeToken: "trade/detokenizedtoken",
  fetchInvestors: "trade/listInvestors",

  placeSellOrder: "trade/placeSellOrder",
  placeBuyOrder: "trade/placeBuyOrder",

  fetchSingleUserSellTransactions: "trade/sellOrderSingle",
  fetchSingleUserBuyTransactions: "trade/buyOrdersingle",

  fetchAllUserSellTransactions: "trade/sellOrder",
  fetchAllUserBuyTransactions: "trade/buyOrder",

  fetchMarket: "dashbord",
  fetchTokenHoldings: "getBonddetailsofUser",
  fetchCBDCBalance: "trade/balance",
  addBalance: "trade/walletbalanceAddition",

  tokenholding: "tokenholding",
  transactions: "trade/purchaselog",
  bondholding: "bondholding",
  purchaseLog: "trade/purchaselog",
  market: "market",

  bidPrice: "trade/buyOrder",
  askPrice: "trade/sellOrder",
}

export default endPoints
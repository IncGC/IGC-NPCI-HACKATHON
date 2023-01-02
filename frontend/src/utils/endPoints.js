export const root = {
  baseUrl: "http://127.0.0.1:9090/api/v1/",
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

  placeSellOrder: "trade/placeSellOrder",
  placeBuyOrder: "trade/placeBuyOrder",

  fetchSingleUserSellTransactions: "trade/sellOrderSingle",
  fetchSingleUserBuyTransactions: "trade/buyOrdersingle",

  fetchAllUserSellTransactions: "trade/sellOrder",
  fetchAllUserBuyTransactions: "trade/buyOrder",

  fetchMarket: "dashbord",
  fetchTokenHoldings: "getBonddetailsofUser",
  fetchCBDCBalance: "trade/balance",
  updateBalance:"trade/walletbalanceAddition",

  tokenholding: "tokenholding",
  transactions: "trade/purchaselog",
  bondholding: "bondholding",
  purchaseLog: "trade/purchaselog",
  market: "market",
}

export default endPoints
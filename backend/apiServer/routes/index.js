const router = require('express').Router()
const passport = require('passport')
router.use('/token', require('./bond'))
router.use('/transactions', require('./transactions'))

const otp= require("../controllers/otp")
const data = require("../controllers/data")
const order = require('../controllers/orderBook');
const investor = require("../controllers/investor");
const Bond = require("../controllers/Bond");
const ask = require('../controllers/ask');
const bid = require('../controllers/bid');
const buy = require('../controllers/buy');
const trasactions = require('../controllers/transactions');
const chaincode = require("../controllers/chaincodes");

router.route('/bond').post( chaincode.bond).get(chaincode.getbond);
router.route('/bondholding').post( chaincode.bondHoldings).get(chaincode.getbondHoldings);
router.route('/tokenholding').post( chaincode.TokenHolding).get(chaincode.getTokenHolding);
router.route('/transactions').post( chaincode.Transactions).get(chaincode.getTransaction);
router.route('/market').post(chaincode.mbeMarket).get(chaincode.getMbeMarket);
router.route('/sellOrder').post(chaincode.sellOrder).get(chaincode.getSellOrder);
router.route('/buyOrder').post(chaincode.buyOrder).get(chaincode.getBuyOrder);
router.route('/purchaseLog').post(chaincode.purchaseLog).get(chaincode.getPurchaseLog);
router.route('/ask').post( ask.askpost).get(ask.askGet);
router.route('/bid').post(bid.bidpost).get(bid.bidGet);
router.route('/buy').post( buy.buypost).get(buy.buyGet)
router.route('/transactions').post( trasactions.transaction);
router.get('/transactions/:_id', trasactions.getTrasactions)

router.post("/create_investor", investor.createInvestor);
router.post("/login", investor.login);

router.get("/",passport.authenticate("jwt", { session: false }),investor.getInvestor);
router.post("/forgot", investor.forgotPassword);

router.get("/getUserDetails", investor.InvestorDetails);


router.route('/order').post(order.orderbook).get(order.orderbookget);

router.route('/Bond').post(Bond.BondAPI).get(Bond.BondAPIGet)

router.route('/org').post(data.orgPost).get(data.orgGet)

router.route('/nse_data').post(data.NseMockData).get(data.getNseData)  
  
router.route("/pancard_data").post(data.PanCardMockData).get(data.getPancarddata)

router.post("/email_phone_otp", otp.phone_email_otp);

router.post('/email_phone_otp_verify',otp.phone_email_verification )

router.post("/panOtp",otp.panOtp);

router.post('/pancardotpverification', otp.panOtpVerification)

router.post("/aadharOtp", otp.aadharotp );

router.post('/aadharOtpVerification', otp.aadharOtpVerification)




module.exports = router
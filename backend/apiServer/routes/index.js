const router = require('express').Router()
const passport = require('passport')
// router.use('/token', require('./bond'))
// router.use('/transactions', require('./transactions'))

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

const dashBoard = require('../controllers/marketDashboard');

router.get('/dashbord',passport.authenticate("jwt", { session: false }), dashBoard.bonddetails);

const trade = require('../trade');

router.use('/trade', trade);

router.use('/bond', require('../routes/investor'));

                    /// CBDC wallet ///
router.post('/cbdcwallet', passport.authenticate("jwt", { session: false }),chaincode.cbdcwallet);
router.put('/cbdcwallet',passport.authenticate("jwt",{session: false} ), chaincode.cbdcwalletUpdate);
router.get('/cbdcwallet',passport.authenticate("jwt", { session: false }),chaincode.getcbdcwallet);


                    ///Bond Holdings ///

router.post('/bondHolding', passport.authenticate("jwt", {session:false}), chaincode.bondHoldings)
router.get('/bondHolding', passport.authenticate("jwt", {session:false}), chaincode.getbondHoldings);
router.put('/bondHolding', passport.authenticate("jwt", {session:false}), chaincode.updateBondHolding);



                    ///Token Holdings///

router.post('/tokenholding',passport.authenticate("jwt", { session: false }), chaincode.TokenHolding)




router.post('/SellOrderChaincode',passport.authenticate("jwt", { session: false }), chaincode.sellOrder);
// router.route('/cbdcwallet',passport.authenticate("jwt", { session: false })).post( chaincode.cbdcwallet).get(chaincode.getcbdcwallet);
// router.route('/bondholding',passport.authenticate("jwt", { session: false })).post( chaincode.bondHoldings).get(chaincode.getbondHoldings);
// router.route('/tokenholding',passport.authenticate("jwt", { session: false })).post( chaincode.TokenHolding).get(chaincode.getTokenHolding);
router.route('/transactions',passport.authenticate("jwt", { session: false })).post( chaincode.Transactions).get(chaincode.getTransaction);
router.route('/market',passport.authenticate("jwt", { session: false })).post(chaincode.mbeMarket).get(chaincode.getMbeMarket);
// router.route('/SellOrderChaincode'.post(chaincode.sellOrder).get(chaincode.getSellOrder);
router.route('/buyOrder',passport.authenticate("jwt", { session: false })).post(chaincode.buyOrder).get(chaincode.getBuyOrder);
router.route('/purchaseLog',passport.authenticate("jwt", { session: false })).post(chaincode.purchaseLog).get(chaincode.getPurchaseLog);
router.route('/ask',passport.authenticate("jwt", { session: false })).post( ask.askpost).get(ask.askGet);
router.route('/bid',passport.authenticate("jwt", { session: false })).post(bid.bidpost).get(bid.bidGet);
router.route('/buy',passport.authenticate("jwt", { session: false })).post( buy.buypost).get(buy.buyGet)
router.route('/transactionsCentre',passport.authenticate("jwt", { session: false })).post( trasactions.transaction);
router.get('/transactionsCentre',passport.authenticate("jwt", { session: false }), trasactions.getTrasactions)

router.post("/create_investor", investor.createInvestor);
router.post("/login", investor.login);
router.post('/custodian', investor.custodian);


router.get("/",passport.authenticate("jwt", { session: false }),investor.getInvestor);
router.post("/forgot", investor.forgotPassword);

router.get("/getUserDetails",passport.authenticate("jwt", { session: false }), investor.InvestorDetails);

router.get('/singleUser', investor.getInvestor)

router.route('/order').post(order.orderbook).get(order.orderbookget);

router.route('/Bond').post(Bond.BondAPI).get(Bond.BondAPIGet)

router.get('/getBonddetailsofUser',passport.authenticate("jwt", { session: false }), Bond.getBondDetails);

router.route('/org').post(data.orgPost).get(data.orgGet)

router.route('/nse_data').post(data.NseMockData).get(data.getNseData)
// router.route('/nse_data1').post(data.NseMockData)

  
router.route("/pancard_data").post(data.PanCardMockData).get(data.getPancarddata)

router.post("/email_phone_otp", otp.phone_email_otp);

router.post('/email_phone_otp_verify',otp.phone_email_verification )

router.post("/panOtp",otp.panOtp);

router.post('/pancardotpverification', otp.panOtpVerification)

router.post("/aadharOtp", otp.aadharotp );

router.post('/aadharOtpVerification', otp.aadharOtpVerification)




module.exports = router
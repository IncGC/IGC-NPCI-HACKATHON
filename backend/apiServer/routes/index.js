const router = require('express').Router()
const passport = require('passport')
router.use('/token', require('./tokenize'))
router.use('/transactions', require('./transactions'))

const otp= require("../controllers/otp")
const data = require("../controllers/data")
const order = require('../controllers/orderBook');
const investor = require("../controllers/investor");
const tokenize = require("../controllers/tokenize");
const ask = require('../controllers/ask');
const bid = require('../controllers/bid');
const buy = require('../controllers/buy');
const trasactions = require('../controllers/transactions');

router.post('/ask', ask.askpost);
router.get('/ask',ask.askGet);

router.post('/bid',bid.bidpost);
router.get('/bid', bid.bidGet);

router.post('/buy', buy.buypost);
router.get('/buy', buy.buyGet);

router.post('/transactions', trasactions.transaction);
router.get('/transactions/:_id', trasactions.getTrasactions)

router.post("/create_investor", investor.createInvestor);
router.post("/login", investor.login);

router.get("/",passport.authenticate("jwt", { session: false }),investor.getInvestor);
router.post("/forgot", investor.forgotPassword);

router.get("/getUserDetails", investor.InvestorDetails);


router.post('/order', order.orderbook);
router.get('/order', order.orderbookget);

router.post('/tokenize', tokenize.tokenizeAPI);
router.get('/tokenize', tokenize.tokenizeAPIGet);

router.post('/org', data.orgPost);
router.get('/org', data.orgGet);

router.route('/nse_data').post(data.NseMockData).get(data.getNseData)  
  
router.route("/pancard_data").post(data.PanCardMockData).get(data.getPancarddata)

router.post("/email_phone_otp", otp.phone_email_otp);

router.post('/email_phone_otp_verify',otp.phone_email_verification )

router.post("/panOtp",otp.panOtp);

router.post('/pancardotpverification', otp.panOtpVerification)

router.post("/aadharOtp", otp.aadharotp );

router.post('/aadharOtpVerification', otp.aadharOtpVerification)




module.exports = router
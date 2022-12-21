const router = require('express').Router()
const passport = require('passport')
router.use('/token', require('./token'))
router.use('/investor', require('./investordetails'))

const otp= require("../controllers/otp")
const data = require("../controllers/data")
const investor = require("../controllers/investor");
router.post("/create_investor", investor.createInvestor);
router.post("/login", investor.login);

router.get("/",passport.authenticate("jwt", { session: false }),investor.getInvestor);
router.post("/forgot", investor.forgotPassword);

router.get("/getUserDetails", investor.InvestorDetails);


router.route('/nse_data').post(data.NseMockData).get(data.getNseData)  
  
router.route("/pancard_data").post(data.PanCardMockData).get(data.getPancarddata)

router.post("/email_phone_otp", otp.phone_email_otp);

router.post('/email_phone_otp_verify',otp.phone_email_verification )

router.post("/panOtp",otp.panOtp);

router.post('/pancardotpverification', otp.panOtpVerification)

router.post("/aadharOtp", otp.aadharotp );

router.post('/aadharOtpVerification', otp.aadharOtpVerification)




module.exports = router
const router = require('express').Router()
const passport = require('passport')
router.use('/token', require('./token'))
router.use('/admin', require('./usermgmt'));
router.use('/investor', require('./investordetails'))
module.exports = router
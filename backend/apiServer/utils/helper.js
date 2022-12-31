'use strict';
var log4js = require('log4js');
var logger = log4js.getLogger('Helper');
logger.level = 'DEBUG';
const { v4: uuid } = require('uuid')
const moment = require('moment')

exports.getLogger = function(moduleName) {
	var logger = log4js.getLogger(moduleName);
    logger.level = 'DEBUG';
	return logger;
};

exports.generateId = function(){
	return uuid()
}

exports.getNow = ()=> moment(new Date()).format()

exports.CHAINCODE_ACTIONS = {
	CREATE: 'create',
	UPDATE: 'update',
	DELETE: 'delete',
	GET: 'get'
}

exports.USER_ROLES = {
	ADMIN: 'admin'

}

exports.USER_STATUS = {
	ACTIVE: 'active',
	INACTIVE: 'inactive'
}


exports.CHAINCODE_NAMES = {
	CBDCWALLET:'CBDCwallet',
	TRASANSATIONS:'Transactions',
	BONDHOLDING: 'BondHolding',
	TOKENHOLDING: 'TokenHolding',
	BUYORDER:'BuyOrder',
	SELLORDER:'SellOrder',
	PURCHASELOG:'PurchaseLog',
	MBEMARKET:'MBEmarket'
}


exports.CHAINCODE_CHANNEL = "common"
const { buildCCPOrg1, buildCCPOrg2, buildCCPOrg3, buildCCPOrg4, buildCCPOrg5 } = require("./AppUtils");

const path = require('path');

exports.getCCP = (org) => {
    let ccp;
    switch (org) {
        case 1:
            ccp = buildCCPOrg1();
            break;
        case 2:
            ccp = buildCCPOrg2();
            break;
        case 3:
            ccp = buildCCPOrg3();
            break;
        case 4:
            ccp = buildCCPOrg4();
            break;
        case 5:
            ccp = buildCCPOrg5();
            break;
    }
    return ccp;
}

exports.getWallets = (org) => {
    let wallet;
    switch (org) {
        case 1:
            wallet = path.join(__dirname, '../wallets', "org1wallet")
            break;
        case 2:
            wallet = path.join(__dirname, '../wallets', "org2wallet")
            break;
        case 3:
            wallet = path.join(__dirname, '../wallets', "org3wallet")
            break;
        case 4:
            wallet = path.join(__dirname, '../wallets', "org4wallet")
            break;
        case 5:
            wallet = path.join(__dirname, '../wallets', "org5wallet")
            break;
    }
    // console.log("wallet value is", wallet)
    return wallet;
}

exports.getCredentials = async (org) => {
    var adminid;
    var adminpwd;
    switch (org) {
        case 1:
            adminid = 'mbev1org1';
            adminpwd = 'passw0rd';
            break;
        case 2:
            adminid = 'mbev2org1';
            adminpwd = 'passw0rd';
            break;
        case 3:
            adminid = 'mbev3org1';
            adminpwd = 'passw0rd';
            break;
        case 4:
            adminid = 'mbev3org1';
            adminpwd = 'passw0rd';
            break;
        case 5:
            adminid = 'mbev2org1';
            adminpwd = 'passw0rd';
            break;
    }
    // console.log("adminid, adminpwd", adminid, adminpwd)
    return [adminid, adminpwd];
}

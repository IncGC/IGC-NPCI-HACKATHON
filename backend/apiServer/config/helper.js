const {
  Wallet,
  Bonds,
  SellOrder,
  BuyOrder,
  PurchaseLog
} = require("../models/Trade");

module.exports.storeRecord = async (type, obj) => {
  console.log("testing");
  if (type == "Sell") {
    var record = new SellOrder(obj);
    record.save();
  } else {
    var record = new BuyOrder(obj);
    record.save();
  }
};
//Iterate through both the sell order and buy order array and find the match,
//Process each rows
//Process buyer wallet
//process seller wallet
module.exports.CompareLimitOrder = async (
  sellOrderArray,
  buyOrderArray,
  canUpdate
) => {
  if (sellOrderArray.length != 0) {
    if (buyOrderArray.length != 0) {
      sellOrderArray.map(async (seller, index) => {
        var _match = buyOrderArray.find(
          (buyer) =>
            buyer.NumOfToken === seller.NumOfToken &&
            buyer.isin == seller.isin &&
            buyer.Price == seller.Price
        );
        console.log("Match found", _match, seller);
        //Order Match Found
        if (_match && canUpdate) {
          //Seller Wallet

          var SellerWallet = await Wallet.findOne({ mbeId: seller.mbeId });
          //Buyer Wallet
          var BuyerWallet = await Wallet.findOne({ mbeId: _match.mbeId });
          //Bond Details
          var bondDetails = await Bonds.findOne({ isin: _match.isin });

          //Update Seller Wallets by adding up the funds
          if (SellerWallet) {
            var CBDCbalance = parseFloat(SellerWallet.CBDCbalance);
            var updatedFunds = CBDCbalance + parseFloat(_match.Price);
            var _updSellOrder = await SellOrder.findOneAndUpdate(
              {
                mbeId: seller.mbeId,
                isin: seller.isin,
                OrderId: seller.OrderId
              },
              { $set: { isProcessed: true } },
              { upsert: true }
            );
            var _updWallet = await Wallet.findOneAndUpdate(
              { mbeId: seller.mbeId },
              { $set: { CBDCbalance: updatedFunds } },
              { upsert: true }
            );
            console.log(
              "SELL ORDER FUND",
              updatedFunds,
              _updSellOrder,
              _updWallet
            );
          }
          //Update Buyer Wallets by deducting the funds
          if (BuyerWallet) {
            var CBDCbalance = parseFloat(BuyerWallet.CBDCbalance);
            var updatedFunds = CBDCbalance - parseFloat(_match.Price);
            var _updBuyOrder = await BuyOrder.findOneAndUpdate(
              {
                mbeId: _match.mbeId,
                isin: _match.isin,
                OrderId: _match.OrderId
              },
              { $set: { isProcessed: true } },
              { upsert: true }
            );
            var _updWallet = await Wallet.findOneAndUpdate(
              { mbeId: _match.mbeId },
              { $set: { CBDCbalance: updatedFunds } },
              { upsert: true }
            );
            console.log(
              "BUY ORDER FUND",
              updatedFunds,
              _updBuyOrder,
              _updWallet
            );
          }
          //Update Bond Details to deduct the TokenQtyRemaining for respective Bond
          if (bondDetails) {
            var updatedQty =
              parseFloat(bondDetails.TokenQtyRemaining) -
              parseFloat(seller.TotalTokenQty);
            var _updBonds = await Bonds.findOneAndUpdate(
              { isin: _match.isin },
              { $set: { TokenQtyRemaining: updatedQty } },
              { upsert: true }
            );
            console.log("Total Qty Remaining", updatedQty, _updBonds);
          }
        } else {
          return false;
        }
      });
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports.VerifyBuyOrderList = async (sellorder, buyOrderArray) => {
  if (buyOrderArray.length != 0) {
    if (sellorder.length != 0) {
      buyOrderArray.map(async (buyer, index) => {
        console.log("item valueis", buyer);
        var _match = sellorder.find(
          (seller) =>
            seller.NumOfToken == buyer.NumOfToken &&
            buyer.isin == seller.isin &&
            buyer.Price == seller.Price
        );
        //Order Match Found
        console.log("match value is", _match);
        if (Object.keys(_match).length > 0) {
          //Seller Wallet
          var SellerWallet = await Wallet.findOne({ mbeId: _match.mbeId });
          //Buyer Wallet
          var BuyerWallet = await Wallet.findOne({ mbeId: buyer.mbeId });
          //Bond Details
          var bondDetails = await Bonds.findOne({
            isin: _match.isin,
            mbeId: _match.mbeId
          });

          //Update Seller Wallets by adding up the funds
          if (SellerWallet) {
            var CBDCbalance = parseFloat(SellerWallet.CBDCbalance);
            //updated by MPK
            // var updatedFunds = CBDCbalance + parseFloat(_match.Price);
            var updatedFunds =
              CBDCbalance +
              parseFloat(_match.Price) * parseFloat(_match.NumOfToken);
            let obj = {
              OrderId: _match.OrderId,
              mbeId: _match.mbeId,
              isin: _match.isin,
              NumOfToken: _match.NumOfToken,
              Price: _match.Price,
              isProcessed: true
            };
            var record = new SellOrder(obj);
            record.save();
            var _updWallet = await Wallet.findOneAndUpdate(
              { mbeId: _match.mbeId },
              { $set: { CBDCbalance: updatedFunds } },
              { upsert: true }
            );
            console.log("Sellers", updatedFunds, _updWallet);
          }
          //Update Buyer Wallets by deducting the funds
          if (BuyerWallet) {
            var CBDCbalance = parseFloat(BuyerWallet.CBDCbalance);
            //updated by MPK
            var updatedFunds = CBDCbalance - parseFloat(buyer.Price);
            var updatedFunds =
              CBDCbalance -
              parseFloat(buyer.Price) * parseFloat(_match.NumOfToken);
            var _updBuyOrder = await BuyOrder.findOneAndUpdate(
              {
                mbeId: buyer.mbeId,
                isin: buyer.isin,
                OrderId: buyer.OrderId
              },
              { $set: { isProcessed: true } },
              { upsert: true }
            );
            var _updWallet = await Wallet.findOneAndUpdate(
              { mbeId: buyer.mbeId },
              { $set: { CBDCbalance: updatedFunds } },
              { upsert: true }
            );
            let obj = {
              mbeId: buyer.mbeId,
              SellermbeId: _match.mbeId,
              BuyOrderId: buyer.OrderId,
              SellOrderId: _match.OrderId,
              isin: _match.isin,
              NumOfToken: buyer.NumOfToken,
              issuerName:bondDetails.issuerName,
              couponrate:bondDetails.couponrate,
              maturitydate:bondDetails.maturitydate,
              Price: buyer.Price,
              TradeValue: parseFloat(buyer.Price) * parseFloat(buyer.NumOfToken),
              Purchased: true,
              isAuthorized: true
            };
            var record = new PurchaseLog(obj);
            record.save();
            console.log("Buyers", updatedFunds, _updBuyOrder, _updWallet);
          }
          //Update Bond Details to deduct the TokenQtyRemaining for respective Bond
          if (bondDetails) {
            var updatedQty =
              parseFloat(bondDetails.TokenQtyRemaining) -
              parseFloat(buyer.NumOfToken);
            var _updBonds = await Bonds.findOneAndUpdate(
              { isin: _match.isin, mbeId: _match.mbeId },
              { $set: { TokenQtyRemaining: updatedQty } },
              { upsert: true }
            );
            console.log("Bond Details", updatedQty, _updBonds);

            //updated by MPK
            var existBond = await Bonds.findOne({
              isin: _match.isin,
              mbeId: buyer.mbeId
            });
            if (!existBond) {
              existBond = new Bonds({
                isin: _match.isin,
                mbeId: buyer.mbeId,
                Name: bondDetails.Name,
                LotQty: bondDetails.LotQty,
                TokenizedLot: "0",
                TotalTokenQty: "0",
                TokenQtyRemaining: "0"
              });
              existBond.save();
            }
            await Bonds.findOneAndUpdate(
              { isin: _match.isin, mbeId: buyer.mbeId },
              {
                $set: {
                  TokenQtyRemaining:
                    parseInt(existBond.TokenQtyRemaining) +
                    parseInt(buyer.NumOfToken)
                }
              },
              { upsert: true }
            );
          }
          return true;
        }
      });
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports.VerifySellOrderList = async (buyorder, sellOrderArray) => {
  if (sellOrderArray.length != 0) {
    if (buyorder.length != 0) {
      sellOrderArray.map(async (seller, index) => {
        var _match = buyorder.find(
          (buyer) =>
            seller.NumOfToken === buyer.NumOfToken &&
            buyer.isin == seller.isin &&
            buyer.Price == seller.Price
        );
        if (Object.keys(_match).length > 0) {
          //Seller Wallet
          var SellerWallet = await Wallet.findOne({ mbeId: seller.mbeId });
          //Buyer Wallet
          var BuyerWallet = await Wallet.findOne({ mbeId: _match.mbeId });
          //Bond Details
          var bondDetails = await Bonds.findOne({
            isin: seller.isin,
            mbeId: seller.mbeId
          });

          console.log("SellerWallet", SellerWallet);
          console.log("BuyerWallet", BuyerWallet);
          console.log("bondDetails", bondDetails);

          //Update Selle r Wallets by adding up the funds
          if (SellerWallet) {
            var CBDCbalance = parseFloat(SellerWallet.CBDCbalance);
            var BuyerWallet = await Wallet.findOne({ mbeId: _match.mbeId });
            //updated by MPK
            // var updatedFunds = CBDCbalance + parseFloat(seller.Price);
            var updatedFunds =
              CBDCbalance +
              parseFloat(seller.Price) * parseFloat(seller.NumOfToken);
            var _updSellOrder = await SellOrder.findOneAndUpdate(
              {
                mbeId: seller.mbeId,
                isin: seller.isin,
                OrderId: seller.OrderId
              },
              { $set: { isProcessed: true } },
              { upsert: true }
            );
            var _updWallet = await Wallet.findOneAndUpdate(
              { mbeId: seller.mbeId },
              { $set: { CBDCbalance: updatedFunds } },
              { upsert: true }
            );
            console.log("Sellers", updatedFunds, _updSellOrder, _updWallet);
          }
          //Update Buyer Wallets by deducting the funds
          if (BuyerWallet) {
            var CBDCbalance = parseFloat(BuyerWallet.CBDCbalance);
            //updated by MPK
            // var updatedFunds = CBDCbalance - parseFloat(_match.Price);
            var updatedFunds =
              CBDCbalance -
              parseFloat(_match.Price) * parseFloat(_match.NumOfToken);
            // var _updBuyOrder = await BuyOrder.findOneAndUpdate({ mbeId: _match.mbeId, isin: _match.isin, OrderId: _match.OrderId }, { $set: { isProcessed: true } }, { upsert: true })
            let obj = {
              OrderId: _match.OrderId,
              mbeId: _match.mbeId,
              isin: _match.isin,
              NumOfToken: _match.NumOfToken,
              Price: _match.Price,
              isProcessed: true
            };
            var record = new BuyOrder(obj);
            record.save();

            var _updWallet = await Wallet.findOneAndUpdate(
              { mbeId: _match.mbeId },
              { $set: { CBDCbalance: updatedFunds } },
              { upsert: true }
            );
            let obj2 = {
              mbeId: _match.mbeId,
              SellermbeId: seller.mbeId,
              BuyOrderId: _match.OrderId,
              SellOrderId: seller.OrderId,
              isin: _match.isin,
              issuerName:bondDetails.issuerName,
              couponrate:bondDetails.couponrate,
              maturitydate:bondDetails.maturitydate,
              NumOfToken: _match.NumOfToken,
              Price: _match.Price,
              TradeValue:
                parseFloat(_match.Price) * parseFloat(_match.NumOfToken),
              Purchased: true,
              isProcessed: true,
              isAuthorized: true
            };
            var record = new PurchaseLog(obj2);
            record.save();
            console.log("Buyers", updatedFunds, _updWallet);
          }
          //Update Bond Details to deduct the TokenQtyRemaining for respective Bond
          if (bondDetails) {
            var updatedQty =
              parseFloat(bondDetails.TokenQtyRemaining) -
              parseFloat(_match.NumOfToken);
            var _updBonds = await Bonds.findOneAndUpdate(
              { isin: seller.isin, mbeId: seller.mbeId },
              { $set: { TokenQtyRemaining: updatedQty } },
              { upsert: true }
            );
            console.log("Bond Details", updatedQty, _updBonds);

            //updated by MPK
            console.log("existBond");
            var existBond = await Bonds.findOne({
              isin: seller.isin,
              mbeId: _match.mbeId
            });
            console.log(existBond);
            if (!existBond) {
              existBond = new Bonds({
                isin: seller.isin,
                mbeId: _match.mbeId,
                Name: bondDetails.Name,
                LotQty: bondDetails.LotQty,
                TokenizedLot: "0",
                TotalTokenQty: "0",
                TokenQtyRemaining: "0"
              });
              existBond.save();
            }
            console.log("existBond");
            await Bonds.findOneAndUpdate(
              { isin: seller.isin, mbeId: _match.mbeId },
              {
                $set: {
                  TokenQtyRemaining:
                    parseInt(existBond.TokenQtyRemaining) +
                    parseInt(_match.NumOfToken)
                }
              },
              { upsert: true }
            );
          }
        }
      });
    } else {
      return false;
    }
  } else {
    return false;
  }
};

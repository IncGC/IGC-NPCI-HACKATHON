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
            buyer.Isin == seller.Isin &&
            buyer.Price == seller.Price 
        );
        console.log("Match found", _match, seller);
        //Order Match Found
        if (_match && canUpdate) {
          //Seller Wallet

          var SellerWallet = await Wallet.findOne({ MbeId: seller.MbeId });
          //Buyer Wallet
          var BuyerWallet = await Wallet.findOne({ MbeId: _match.MbeId });
          //Bond Details
          var bondDetails = await Bonds.findOne({ Isin: _match.Isin });

          //Update Seller Wallets by adding up the funds
          if (SellerWallet) {
            var CBDCbalance = parseFloat(SellerWallet.CBDCbalance);
            var updatedFunds = CBDCbalance + parseFloat(_match.Price);
            var _updSellOrder = await SellOrder.findOneAndUpdate(
              {
                MbeId: seller.MbeId,
                Isin: seller.Isin,
                OrderId: seller.OrderId
              },
              { $set: { IsProcessed: true } },
              { upsert: true }
            );
            var _updWallet = await Wallet.findOneAndUpdate(
              { MbeId: seller.MbeId },
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
                MbeId: _match.MbeId,
                Isin: _match.Isin,
                OrderId: _match.OrderId,
                IssuerName:_match.IssuerName
              },
              { $set: { IsProcessed: true } },
              { upsert: true }
            );
            var _updWallet = await Wallet.findOneAndUpdate(
              { MbeId: _match.MbeId },
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
              { Isin: _match.Isin },
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
            buyer.Isin == seller.Isin &&
            buyer.Price == seller.Price &&
            buyer.IssuerName== seller.IssuerName
        );
        //Order Match Found
        console.log("match value is", _match);
        if (Object.keys(_match).length > 0) {
          //Seller Wallet
          var SellerWallet = await Wallet.findOne({ MbeId: _match.MbeId });
          //Buyer Wallet
          var BuyerWallet = await Wallet.findOne({ MbeId: buyer.MbeId });
          //Bond Details
          var bondDetails = await Bonds.findOne({
            Isin: _match.Isin,
            MbeId: _match.MbeId
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
              MbeId: _match.MbeId,
              Isin: _match.Isin,
              NumOfToken: _match.NumOfToken,
              IssuerName:bondDetails.IssuerName,
              Price: _match.Price,
              IsProcessed: true
            };
            var record = new SellOrder(obj);
            record.save();
            var _updWallet = await Wallet.findOneAndUpdate(
              { MbeId: _match.MbeId },
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
                MbeId: buyer.MbeId,
                Isin: buyer.Isin,
                OrderId: buyer.OrderId,
                IssuerName:buyer.IssuerName
              },
              { $set: { IsProcessed: true } },
              { upsert: true }
            );
            var _updWallet = await Wallet.findOneAndUpdate(
              { MbeId: buyer.MbeId },
              { $set: { CBDCbalance: updatedFunds } },
              { upsert: true }
            );
            let obj = {
              MbeId: buyer.MbeId,
              SellerMbeId: _match.MbeId,
              BuyOrderId: buyer.OrderId,
              SellOrderId: _match.OrderId,
              Isin: _match.Isin,
              NumOfToken: buyer.NumOfToken,
              IssuerName:bondDetails.IssuerName,
              CouponRate:bondDetails.CouponRate,
              MaturityDate:bondDetails.MaturityDate,
              Price: buyer.Price,
              TradeValue: parseFloat(buyer.Price) * parseFloat(buyer.NumOfToken),
              Purchased: true,
              IsAuthorized: true
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
              { Isin: _match.Isin, MbeId: _match.MbeId },
              { $set: { TokenQtyRemaining: updatedQty } },
              { upsert: true }
            );
            console.log("Bond Details", updatedQty, _updBonds);

            //updated by MPK
            var existBond = await Bonds.findOne({
              Isin: _match.Isin,
              MbeId: buyer.MbeId
            });
            if (!existBond) {
              existBond = new Bonds({
                Isin: _match.Isin,
                MbeId: buyer.MbeId,
                Name: bondDetails.Name,
                LotQty: bondDetails.LotQty,
                TokenizedLot: "0",
                TotalTokenQty: "0",
                TokenQtyRemaining: "0"
              });
              existBond.save();
            }
            await Bonds.findOneAndUpdate(
              { Isin: _match.Isin, MbeId: buyer.MbeId },
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
            buyer.Isin == seller.Isin &&
            buyer.Price == seller.Price &&
            buyer.IssuerName == seller.IssuerName
        );
        if (Object.keys(_match).length > 0) {
          //Seller Wallet
          var SellerWallet = await Wallet.findOne({ MbeId: seller.MbeId });
          //Buyer Wallet
          var BuyerWallet = await Wallet.findOne({ MbeId: _match.MbeId });
          //Bond Details
          var bondDetails = await Bonds.findOne({
            Isin: seller.Isin,
            MbeId: seller.MbeId
          });

          console.log("SellerWallet", SellerWallet);
          console.log("BuyerWallet", BuyerWallet);
          console.log("bondDetails", bondDetails);

          //Update Selle r Wallets by adding up the funds
          if (SellerWallet) {
            var CBDCbalance = parseFloat(SellerWallet.CBDCbalance);
            var BuyerWallet = await Wallet.findOne({ MbeId: _match.MbeId });
            //updated by MPK
            // var updatedFunds = CBDCbalance + parseFloat(seller.Price);
            var updatedFunds =
              CBDCbalance +
              parseFloat(seller.Price) * parseFloat(seller.NumOfToken);
            var _updSellOrder = await SellOrder.findOneAndUpdate(
              {
                MbeId: seller.MbeId,
                Isin: seller.Isin,
                OrderId: seller.OrderId
              },
              { $set: { IsProcessed: true } },
              { upsert: true }
            );
            var _updWallet = await Wallet.findOneAndUpdate(
              { MbeId: seller.MbeId },
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
            var _updBuyOrder = await BuyOrder.findOneAndUpdate({ MbeId: _match.MbeId, Isin: _match.Isin, OrderId: _match.OrderId }, { $set: { IsProcessed: true , IssuerName:_match.IssuerName} }, { upsert: true })
            let obj = {
              OrderId: _match.OrderId,
              MbeId: _match.MbeId,
              Isin: _match.Isin,
              NumOfToken: _match.NumOfToken,
              IssuerName:_match.IssuerName,
              Price: _match.Price,
              IsProcessed: true
            };
            var record = new BuyOrder(obj);
            record.save();

            var _updWallet = await Wallet.findOneAndUpdate(
              { MbeId: _match.MbeId },
              { $set: { CBDCbalance: updatedFunds } },
              { upsert: true }
            );
            let obj2 = {
              MbeId: _match.MbeId,
              SellerMbeId: seller.MbeId,
              BuyOrderId: _match.OrderId,
              SellOrderId: seller.OrderId,
              Isin: _match.Isin,
              IssuerName:bondDetails.IssuerName,
              CouponRate:bondDetails.CouponRate,
              MaturityDate:bondDetails.MaturityDate,
              NumOfToken: _match.NumOfToken,
              Price: _match.Price,
              TradeValue:
                parseFloat(_match.Price) * parseFloat(_match.NumOfToken),
              Purchased: true,
              IsProcessed: true,
              IsAuthorized: true
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
              { Isin: seller.Isin, MbeId: seller.MbeId },
              { $set: { TokenQtyRemaining: updatedQty } },
              { upsert: true }
            );
            console.log("Bond Details", updatedQty, _updBonds);

            //updated by MPK
            console.log("existBond");
            var existBond = await Bonds.findOne({
              Isin: seller.Isin,
              MbeId: _match.MbeId
            });
            console.log(existBond);
            if (!existBond) {
              existBond = new Bonds({
                Isin: seller.Isin,
                MbeId: _match.MbeId,
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
              { Isin: seller.Isin, MbeId: _match.MbeId },
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

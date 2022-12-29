const {
  Wallet,
  Bonds,
  SellOrder,
  BuyOrder,
  PurchaseLog
} = require("../model/Trade");

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
            buyer.Quantity === seller.Quantity &&
            buyer.BondId == seller.BondId &&
            buyer.Price == seller.Price
        );
        console.log("Match found", _match, seller);
        //Order Match Found
        if (_match && canUpdate) {
          //Seller Wallet

          var SellerWallet = await Wallet.findOne({ UserId: seller.UserId });
          //Buyer Wallet
          var BuyerWallet = await Wallet.findOne({ UserId: _match.UserId });
          //Bond Details
          var bondDetails = await Bonds.findOne({ BondId: _match.BondId });

          //Update Seller Wallets by adding up the funds
          if (SellerWallet) {
            var totalFunds = parseFloat(SellerWallet.TotalFunds);
            var updatedFunds = totalFunds + parseFloat(_match.Price);
            var _updSellOrder = await SellOrder.findOneAndUpdate(
              {
                UserId: seller.UserId,
                BondId: seller.BondId,
                OrderId: seller.OrderId
              },
              { $set: { isProcessed: true } },
              { upsert: true }
            );
            var _updWallet = await Wallet.findOneAndUpdate(
              { UserId: seller.UserId },
              { $set: { TotalFunds: updatedFunds } },
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
            var totalFunds = parseFloat(BuyerWallet.TotalFunds);
            var updatedFunds = totalFunds - parseFloat(_match.Price);
            var _updBuyOrder = await BuyOrder.findOneAndUpdate(
              {
                UserId: _match.UserId,
                BondId: _match.BondId,
                OrderId: _match.OrderId
              },
              { $set: { isProcessed: true } },
              { upsert: true }
            );
            var _updWallet = await Wallet.findOneAndUpdate(
              { UserId: _match.UserId },
              { $set: { TotalFunds: updatedFunds } },
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
              { BondId: _match.BondId },
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
            seller.Quantity == buyer.Quantity &&
            buyer.BondId == seller.BondId &&
            buyer.Price == seller.Price
        );
        //Order Match Found
        console.log("match value is", _match);
        if (Object.keys(_match).length > 0) {
          //Seller Wallet
          var SellerWallet = await Wallet.findOne({ UserId: _match.UserId });
          //Buyer Wallet
          var BuyerWallet = await Wallet.findOne({ UserId: buyer.UserId });
          //Bond Details
          var bondDetails = await Bonds.findOne({
            BondId: _match.BondId,
            UserId: _match.UserId
          });

          //Update Seller Wallets by adding up the funds
          if (SellerWallet) {
            var totalFunds = parseFloat(SellerWallet.TotalFunds);
            //updated by MPK
            // var updatedFunds = totalFunds + parseFloat(_match.Price);
            var updatedFunds =
              totalFunds +
              parseFloat(_match.Price) * parseFloat(_match.Quantity);
            let obj = {
              OrderId: _match.OrderId,
              UserId: _match.UserId,
              BondId: _match.BondId,
              Quantity: _match.Quantity,
              Price: _match.Price,
              isProcessed: true
            };
            var record = new SellOrder(obj);
            record.save();
            var _updWallet = await Wallet.findOneAndUpdate(
              { UserId: _match.UserId },
              { $set: { TotalFunds: updatedFunds } },
              { upsert: true }
            );
            console.log("Sellers", updatedFunds, _updWallet);
          }
          //Update Buyer Wallets by deducting the funds
          if (BuyerWallet) {
            var totalFunds = parseFloat(BuyerWallet.TotalFunds);
            //updated by MPK
            var updatedFunds = totalFunds - parseFloat(buyer.Price);
            var updatedFunds =
              totalFunds -
              parseFloat(buyer.Price) * parseFloat(_match.Quantity);
            var _updBuyOrder = await BuyOrder.findOneAndUpdate(
              {
                UserId: buyer.UserId,
                BondId: buyer.BondId,
                OrderId: buyer.OrderId
              },
              { $set: { isProcessed: true } },
              { upsert: true }
            );
            var _updWallet = await Wallet.findOneAndUpdate(
              { UserId: buyer.UserId },
              { $set: { TotalFunds: updatedFunds } },
              { upsert: true }
            );
            let obj = {
              UserId: buyer.UserId,
              SellerUserId: _match.UserId,
              BuyOrderId: buyer.OrderId,
              SellOrderId: _match.OrderId,
              BondId: _match.BondId,
              Quantity: buyer.Quantity,
              Price: buyer.Price,
              TradeValue: parseFloat(buyer.Price) * parseFloat(buyer.Quantity),
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
              parseFloat(buyer.Quantity);
            var _updBonds = await Bonds.findOneAndUpdate(
              { BondId: _match.BondId, UserId: _match.UserId },
              { $set: { TokenQtyRemaining: updatedQty } },
              { upsert: true }
            );
            console.log("Bond Details", updatedQty, _updBonds);

            //updated by MPK
            var existBond = await Bonds.findOne({
              BondId: _match.BondId,
              UserId: buyer.UserId
            });
            if (!existBond) {
              existBond = new Bonds({
                BondId: _match.BondId,
                UserId: buyer.UserId,
                Name: bondDetails.Name,
                LotQty: bondDetails.LotQty,
                TokenizedLot: "0",
                TotalTokenQty: "0",
                TokenQtyRemaining: "0"
              });
              existBond.save();
            }
            await Bonds.findOneAndUpdate(
              { BondId: _match.BondId, UserId: buyer.UserId },
              {
                $set: {
                  TokenQtyRemaining:
                    parseInt(existBond.TokenQtyRemaining) +
                    parseInt(buyer.Quantity)
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
            seller.Quantity === buyer.Quantity &&
            buyer.BondId == seller.BondId &&
            buyer.Price == seller.Price
        );
        if (Object.keys(_match).length > 0) {
          //Seller Wallet
          var SellerWallet = await Wallet.findOne({ UserId: seller.UserId });
          //Buyer Wallet
          var BuyerWallet = await Wallet.findOne({ UserId: _match.UserId });
          //Bond Details
          var bondDetails = await Bonds.findOne({
            BondId: seller.BondId,
            UserId: seller.UserId
          });

          console.log("SellerWallet", SellerWallet);
          console.log("BuyerWallet", BuyerWallet);
          console.log("bondDetails", bondDetails);

          //Update Selle r Wallets by adding up the funds
          if (SellerWallet) {
            var totalFunds = parseFloat(SellerWallet.TotalFunds);
            var BuyerWallet = await Wallet.findOne({ UserId: _match.UserId });
            //updated by MPK
            // var updatedFunds = totalFunds + parseFloat(seller.Price);
            var updatedFunds =
              totalFunds +
              parseFloat(seller.Price) * parseFloat(seller.Quantity);
            var _updSellOrder = await SellOrder.findOneAndUpdate(
              {
                UserId: seller.UserId,
                BondId: seller.BondId,
                OrderId: seller.OrderId
              },
              { $set: { isProcessed: true } },
              { upsert: true }
            );
            var _updWallet = await Wallet.findOneAndUpdate(
              { UserId: seller.UserId },
              { $set: { TotalFunds: updatedFunds } },
              { upsert: true }
            );
            console.log("Sellers", updatedFunds, _updSellOrder, _updWallet);
          }
          //Update Buyer Wallets by deducting the funds
          if (BuyerWallet) {
            var totalFunds = parseFloat(BuyerWallet.TotalFunds);
            //updated by MPK
            // var updatedFunds = totalFunds - parseFloat(_match.Price);
            var updatedFunds =
              totalFunds -
              parseFloat(_match.Price) * parseFloat(_match.Quantity);
            // var _updBuyOrder = await BuyOrder.findOneAndUpdate({ UserId: _match.UserId, BondId: _match.BondId, OrderId: _match.OrderId }, { $set: { isProcessed: true } }, { upsert: true })
            let obj = {
              OrderId: _match.OrderId,
              UserId: _match.UserId,
              BondId: _match.BondId,
              Quantity: _match.Quantity,
              Price: _match.Price,
              isProcessed: true
            };
            var record = new BuyOrder(obj);
            record.save();

            var _updWallet = await Wallet.findOneAndUpdate(
              { UserId: _match.UserId },
              { $set: { TotalFunds: updatedFunds } },
              { upsert: true }
            );
            let obj2 = {
              UserId: _match.UserId,
              SellerUserId: seller.UserId,
              BuyOrderId: _match.OrderId,
              SellOrderId: seller.OrderId,
              BondId: _match.BondId,
              Quantity: _match.Quantity,
              Price: _match.Price,
              TradeValue:
                parseFloat(_match.Price) * parseFloat(_match.Quantity),
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
              parseFloat(_match.Quantity);
            var _updBonds = await Bonds.findOneAndUpdate(
              { BondId: seller.BondId, UserId: seller.UserId },
              { $set: { TokenQtyRemaining: updatedQty } },
              { upsert: true }
            );
            console.log("Bond Details", updatedQty, _updBonds);

            //updated by MPK
            console.log("existBond");
            var existBond = await Bonds.findOne({
              BondId: seller.BondId,
              UserId: _match.UserId
            });
            console.log(existBond);
            if (!existBond) {
              existBond = new Bonds({
                BondId: seller.BondId,
                UserId: _match.UserId,
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
              { BondId: seller.BondId, UserId: _match.UserId },
              {
                $set: {
                  TokenQtyRemaining:
                    parseInt(existBond.TokenQtyRemaining) +
                    parseInt(_match.Quantity)
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

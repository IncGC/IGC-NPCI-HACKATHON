const OrderBookModel = require('../models/orderBook');


class LimitOrder {
  constructor(orderId, name, side, price, size) {
    this.orderId = orderId;
    this.name = name;
    this.side = side;
    this.price = price;
    this.size = size;
    this.sizeRemaining = size;
    this.valueRemoved = 0;
    this.time = new Date();
  }
  clearValueRemoved() {
    this.valueRemoved = 0;
  }
  subtract(size, price) {
    this.sizeRemaining -= size;
  }
  takeSize(size) {
    var taken = Math.min(size, this.sizeRemaining);
    this.sizeRemaining -= taken;
    this.valueRemoved += this.price * taken;
    return taken;
  }
}

class MarketOrder {
  constructor(orderId, side, size, funds) {
    LimitOrder.call(this, orderId, side, 0, size);
    this.funds = funds;
    this.fundsRemaining = funds;
    this.volumeRemoved = 0;
    this.time = new Date();
  }
  subtract(size, price) {
    this.sizeRemaining -= size;
    this.fundsRemaining -= price * size;
    this.volumeRemoved += size;
  }
  getSizeRemainingFor(price) {
    var fundsTakeSize = ~~(this.fundsRemaining / price);

    if (this.funds > 0 && this.size > 0) {
      return Math.min(fundsTakeSize, this.sizeRemaining);
    } else if (this.funds > 0) {
      return fundsTakeSize;
    } else if (this.size > 0) {
      return this.sizeRemaining;
    } else {
      return 0;
    }
  }
}

MarketOrder.prototype = Object.create(LimitOrder.prototype);
class TakeResult {
  constructor(taker, makers, takeSize) {
    this.taker = taker;
    this.makers = makers;
    this.takeSize = takeSize;
    this.takeValue =
      makers.length <= 0
        ? 0
        : makers.reduce(function (prev, maker) {
            return prev + maker.valueRemoved;
          }, 0);
  }
  clearMakerValueRemoved() {
    this.makers.forEach(function (maker) {
      maker.clearValueRemoved();
    });
  }
}

class Limit {
  constructor(price) {
    this.price = price;
    this.volume = 0;
    this.map = {};
    this.queue = [];
  }
  peek() {
    return this.queue[0];
  }
  add(order) {
    this.map[order.orderId] = order;
    this.queue.push(order);
    this.volume += order.sizeRemaining;
  }
  remove(orderId) {
    var order = this.map[orderId];
    if (order !== undefined) {
      delete this.map[orderId];
      this.queue.splice(this.queue.indexOf(order), 1);
      this.volume -= order.sizeRemaining;
    }
    return order;
  }
  reduce(orderId, size) {
    var order = this.map[orderId];
    if (order !== undefined) {
      order.subtract(size, this.price);
      this.volume -= size;
      if (order.sizeRemaining <= 0) {
        delete this.map[orderId];
        this.queue.splice(this.queue.indexOf(order), 1);
      }
    }
    return order;
  }
  __getTakeSize(taker) {
    if (taker instanceof MarketOrder) {
      return taker.getSizeRemainingFor(this.price);
    } else {
      return taker.sizeRemaining;
    }
  }
  __takeLiquidityFromNextMaker(taker, takeSize) {
    var maker = this.queue[0];
    if (maker !== undefined) {
      var volumeRemoved = maker.takeSize(takeSize);

      if (maker.sizeRemaining <= 0) {
        delete this.map[maker.orderId];
        this.queue.shift();
      }

      this.volume -= volumeRemoved;
      taker.subtract(volumeRemoved, maker.price);
    }
    return maker;
  }
  takeLiquidity(taker) {
    var makers = [];
    var takeSize = this.__getTakeSize(taker);
    var maker = undefined;

    while (takeSize > 0) {
      maker = this.__takeLiquidityFromNextMaker(taker, takeSize);
      if (maker !== undefined) {
        makers.push(maker);
        takeSize = this.__getTakeSize(taker);
      } else {
        break;
      }
    }

    return makers;
  }
  clear() {
    this.queue = [];
    this.map = {};
    this.volume = 0;
  }
}

var PriorityQueue = require("js-priority-queue");

class LimitQueue {
  constructor(side) {
    this.map = {};
    if (side === "ask") {
      this.__queue = new PriorityQueue({
        strategy: PriorityQueue.ArrayStrategy,
        comparator: function (a, b) {
          return a.price - b.price;
        },
      });
    } else {
      this.__queue = new PriorityQueue({
        strategy: PriorityQueue.ArrayStrategy,
        comparator: function (a, b) {
          return b.price - a.price;
        },
      });
    }
    this.queue = this.__queue.priv.data;
  }
  peek() {
    return this.queue.length <= 0 ? undefined : this.__queue.peek();
  }
  addOrder(order) {
    var limit = this.map[order.price];

    if (limit === undefined) {
      limit = new Limit(order.price);
      this.map[order.price] = limit;
      this.__queue.queue(limit);
    }

    limit.add(order);
  }
  removeOrder(price, orderId) {
    var order = undefined;
    var limit = this.map[price];

    if (limit !== undefined) {
      order = limit.remove(orderId);
      if (order !== undefined && limit.peek() === undefined) {
        delete this.map[price];
        this.queue.splice(this.queue.indexOf(limit), 1);
      }
    }

    return order;
  }
  reduceOrder(price, orderId, size) {
    var order = undefined;
    var limit = this.map[price];

    if (limit !== undefined) {
      order = limit.reduce(orderId, size);
      if (order !== undefined && limit.peek() === undefined) {
        delete this.map[price];
        this.queue.splice(this.queue.indexOf(limit), 1);
      }
    }

    return order;
  }
  __isTaken(maker, taker) {
    if (taker instanceof MarketOrder) {
      return taker.getSizeRemainingFor(maker.price) > 0;
    } else if (taker.side === "bid") {
      return taker.price >= maker.price;
    } else {
      return taker.price <= maker.price;
    }
  }
  takeLiquidityFromBestLimit(taker) {
    var maker = this.peek();
    if (maker !== undefined && this.__isTaken(maker, taker)) {
      var makers = maker.takeLiquidity(taker);

      if (makers.length > 0 && maker.peek() === undefined) {
        delete this.map[maker.price];
        this.__queue.dequeue();
      }

      return makers;
    } else {
      return new Array();
    }
  }
  clear() {
    this.map = {};
    while (this.peek() !== undefined) {
      this.__queue.dequeue().clear();
    }
  }
}

class LimitOrderBook {
  constructor() {
    this.askLimits = new LimitQueue("ask");
    this.bidLimits = new LimitQueue("bid");
  }
  __processAsk(ask) {
    var makers = [];
    var next = this.bidLimits.takeLiquidityFromBestLimit(ask);

    while (next.length > 0) {
      makers = makers.concat(next);
      next = this.bidLimits.takeLiquidityFromBestLimit(ask);
    }

    if (ask.sizeRemaining > 0 && !(ask instanceof MarketOrder)) {
      this.askLimits.addOrder(ask);
    }

    return makers;
  }
  __processBid(bid) {
    var makers = [];
    var next = this.askLimits.takeLiquidityFromBestLimit(bid);

    while (next.length > 0) {
      makers = makers.concat(next);
      next = this.askLimits.takeLiquidityFromBestLimit(bid);
    }

    if (bid.sizeRemaining > 0 && !(bid instanceof MarketOrder)) {
      this.bidLimits.addOrder(bid);
    }

    return makers;
  }
  add(taker) {
    var takeSize = taker.sizeRemaining;
    var makers = undefined;

    if (taker.side === "ask") {
      makers = this.__processAsk(taker);
    } else {
      makers = this.__processBid(taker);
    }

    if (!(taker instanceof MarketOrder)) {
      return new TakeResult(taker, makers, takeSize - taker.sizeRemaining);
    } else {
      return new TakeResult(taker, makers, taker.volumeRemoved);
    }
  }
  remove(side, price, orderId) {
    if (side === "ask") {
      return this.askLimits.removeOrder(price, orderId);
    } else {
      return this.bidLimits.removeOrder(price, orderId);
    }
  }
  reduce(side, price, orderId, size) {
    if (side === "ask") {
      return this.askLimits.reduceOrder(price, orderId, size);
    } else {
      return this.bidLimits.reduceOrder(price, orderId, size);
    }
  }
  clear() {
    this.askLimits.clear();
    this.bidLimits.clear();
  }
}

const MBEid = "4231";

let orderlist =  OrderBookModel.findOne({MBEid});
let userid= orderlist;

console.log(userid);
// let orderlistjson = JSON.stringify(orderlist);
// console.log(orderlist);
// console.log(orderlistjson);

let order1 = new LimitOrder(1, "RELIANCE HOME FINANCE LIMITED", "bid", 1020, 8);
let order2 = new LimitOrder(
  2,
  "RELIANCE HOME FINANCE LIMITED",
  "ask",
  1012,
  11
);
let order3 = new LimitOrder(3, "RELIANCE HOME FINANCE LIMITED", "bid", 1007, 7);
let order4 = new LimitOrder(4, "RELIANCE HOME FINANCE LIMITED", "bid", 998, 12);
let order5 = new LimitOrder(
  5,
  "RELIANCE HOME FINANCE LIMITED",
  "bid",
  1012,
  10
);
let order6 = new LimitOrder(6, "RELIANCE HOME FINANCE LIMITED", "bid", 999, 11);
let order7 = new LimitOrder(7, "RELIANCE HOME FINANCE LIMITED", "ask", 1007, 9);
let order8 = new LimitOrder(8, "RELIANCE HOME FINANCE LIMITED", "ask", 998, 10);
let order9 = new LimitOrder(
  9,
  "RELIANCE HOME FINANCE LIMITED",
  "ask",
  1012,
  12
);
let order10 = new LimitOrder(
  10,
  "RELIANCE HOME FINANCE LIMITED",
  "ask",
  1020,
  8
);

let book = new LimitOrderBook();

let result = book.add(order1);
result = book.add(order2);
result = book.add(order3);
result = book.add(order4);
result = book.add(order5);
result = book.add(order6);
result = book.add(order7);
result = book.add(order8);
result = book.add(order9);
result = book.add(order10);

// console.log(book);

// console.log(result);

// book.clear();

const data = require('./testdata.json');

let orderr= new LimitOrder(data.key1.orderId,data.key2.name, data.side, data.price, data.size);

console.log(orderr);
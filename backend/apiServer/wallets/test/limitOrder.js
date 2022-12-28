
var LimitOrder = require('limit-order-book').LimitOrder
var LimitOrderBook = require('limit-order-book').LimitOrderBook
 
let order1 = new LimitOrder("order01", "bid", 13.37, 10)
let order2 = new LimitOrder("order02", "ask", 13.38, 20)
let order3 = new LimitOrder("order03", "bid", 13.38, 10)
let order4 = new LimitOrder("order04", "bid", 13.38, 20);
let book = new LimitOrderBook()
 
let result = book.add(order1)
result = book.add(order2)
result = book.add(order3)
result= book.add(order4)

// console.log(book);
 
console.log(result)

// book.clear();
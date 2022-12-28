let book = {
    ask : new Map(),
    bid : new Map()
}


// order = {orderNo,type,price,qty}
function addToBook(order){
    if(order.type == "ask"){
        let exstOrder = book.bid.get(order.price);
        if(exstOrder && exstOrder[order.qty]){
         
            delete exstOrder[order.qty]
            // console.log(exstOrder[order.qty])
            if(Object.keys(exstOrder).length){

                book.bid.set(order.price,exstOrder);
            }else{
               book.bid.delete(order.price);
            }
         
        }else{
            let exstOrder = book.ask.get(order.price);
            if(exstOrder){
               exstOrder[order.qty] = {orderNo:order.orderNo,type:order.type,price:order.price,qty:order.qty, time:new Date()}
               book.ask.set(order.price,exstOrder)
            }else{
                book.ask.set(order.price,{[order.qty]: order})
            }
        }

    }else if(order.type == "bid"){
        let exstOrder = book.ask.get(order.price);
        if(exstOrder && exstOrder[order.qty]){
       
         delete exstOrder[order.qty]
         if(Object.keys(exstOrder).length){

             book.ask.set(order.price,exstOrder);
         }else{
            book.ask.delete(order.price);
         }
        }else{
            let exstOrder = book.bid.get(order.price);
            if(exstOrder){
               exstOrder[order.qty] = {orderNo:order.orderNo,type:order.type,price:order.price,qty:order.qty, time:new Date()}
               book.bid.set(order.price,exstOrder)
            }else{
            book.bid.set(order.price,{[order.qty]: order})
            }
        }
    }
}
addToBook({orderNo:1,type:"bid",price : 1020,qty: 18})
// console.log(book);
addToBook({orderNo:2,type:"bid",price : 1007,qty: 7})
// console.log(book);
addToBook({orderNo:3,type:"bid",price : 998,qty: 12})
// console.log(book);
addToBook({orderNo:4,type:"bid",price : 1012,qty: 10})
// console.log(book);
addToBook({orderNo:5,type:"bid",price : 999,qty: 11})
// addToBook({orderNo:5,type:"bid",price : 999,qty: 12})
// console.log(book);

addToBook({orderNo:6,type:"ask",price : 1012,qty: 10})
// console.log(book);
addToBook({orderNo:7,type:"ask",price : 1007,qty: 9})
// console.log(book);
addToBook({orderNo:8,type:"ask",price : 998,qty: 10})
// console.log(book);
addToBook({orderNo:9,type:"ask",price : 1012,qty: 12})
// console.log(book);
addToBook({orderNo:10,type:"ask",price : 1020,qty: 8})

console.log(book);

const book1 = JSON.stringify(book);

console.log(book1)
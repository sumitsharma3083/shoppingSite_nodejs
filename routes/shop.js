const express = require('express')
const Router = express.Router();
const shopController = require('../controller/shop') 


     //     /index route
     Router.get('/',shopController.getIndexRoute)


     //    /shop
     Router.get('/shop',shopController.getShopRoute)


     //    /products
     Router.get('/products',shopController.getProductsRouter)


     //     /cart        ------get request
     Router.get('/cart',shopController.getCartRoute)


     //      /cart       ------post request
     Router.post('/cart',shopController.postAddtocart)


     
         //    /checkout
     Router.get('/checkout',shopController.getCheckOutRoute)



       //      /orders
     Router.get('/orders',shopController.getOrderRoute)



     //     /products/detail/ 
       Router.get('/products/detail/:productId',shopController.getDetailRoute)

     
  
     //     /cart/remove-item

     Router.post('/cart/remove-item' , shopController.removeFromCart)


     module.exports = Router
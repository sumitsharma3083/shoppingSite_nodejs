const express = require('express')
const Router = express.Router();
const shopController = require('../controller/shop') 
const islogged    = require('../util/islogged')

     // GET    /index route
     Router.get('/',islogged,shopController.getIndexRoute)


     // GET         /shop
     Router.get('/shop',shopController.getShopRoute)


     // GET          /products
     Router.get('/products',shopController.getProductsRouter)


     // GET            /cart      
     Router.get('/cart',islogged,shopController.getCartRoute)


     //POST            /cart     
     Router.post('/cart',shopController.postAddtocart)


     
      // GET          /checkout
     Router.get('/checkout',islogged,shopController.getCheckOutRoute)



       // GET     /orders
     Router.get('/orders',islogged,shopController.getOrderRoute)



     //  GET        /products/detail/ 
       Router.get('/products/detail/:productId',shopController.getDetailRoute)

     
  
     // GET          /cart/remove-item

     Router.post('/cart/remove-item' , shopController.removeFromCart)


     module.exports = Router
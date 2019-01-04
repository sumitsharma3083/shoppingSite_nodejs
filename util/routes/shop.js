const express = require('express')
const Router = express.Router();
const shopController = require('../controller/shop') 


     // GET         /index route
     Router.get('/',shopController.getIndexRoute)


     // GET          /shop
     Router.get('/shop',shopController.getShopRoute)


     // GET          /products
     Router.get('/products',shopController.getProductsRouter)


     // GET           /cart        
     Router.get('/cart',shopController.getCartRoute)


     // POST          /cart       
     Router.post('/cart',shopController.postAddtocart)


     
    // GET              /checkout
     Router.get('/checkout',shopController.getCheckOutRoute)



    //  GET              /orders
     Router.get('/orders',shopController.getOrderRoute)



     //GET                 /products/detail/ 
       Router.get('/products/detail/:productId',shopController.getDetailRoute)

     
  
     //POST                /cart/remove-item

     Router.post('/cart/remove-item' , shopController.removeFromCart)



     
     module.exports = Router
   const Product = require('../model/Product')
   const Cart = require('../model/cart')

  exports.getIndexRoute = function(req,res){ 

        Product.find().then((result) => {
            res.render('shop/index',{products: result,isAuthenticate:req.session.isAuthenticate}) 
        }).catch((err) => {
             console.log(err)
        });  
     
   }


   exports.getShopRoute =  function(req,res,next){  
   
        Product.find().then((result) => {
            res.render('shop/shop',{products: result,isAuthenticate: req.session.isAuthenticate}) 
        }).catch((err) => {
            console.log(err)
        });  
    }


    exports.getProductsRouter = function(req,res){   
        Product.find().then((result) => {
              res.render('shop/product-list',{products: result,isAuthenticate: req.session.isAuthenticate})
        }).catch((err) => {
             console.log(err)
        });
    }

    exports.getCartRoute = function(req,res){  
            var price = 0 ;  
              Cart.find().then((result) => {
                        for(var i=0 ; i<result.length  ; i++)
                        {
                           price = price + (result[i].price*result[i].quantity)
                        }       
                res.render('shop/cart', {products: result , total: price,isAuthenticate: req.session.isAuthenticate})
              }).catch((err) => {
                  console.log(err)
              })      
    }
    
    



    exports.getErrorRoute = function(req,res,next){ 
    res.status(404).render('404',{isAuthenticate: req.session.isAuthenticate})
    } 


 exports.getCheckOutRoute = function(req,res){
    res.render('shop/checkout',{isAuthenticate: req.session.isAuthenticate})
}



exports.getOrderRoute = function(req,res){
    res.render('shop/orders',{isAuthenticate: req.session.isAuthenticate})
} 




exports.getDetailRoute = function(req,res){
    const ProdId = req.params.productId
         Product.findById(ProdId).then((result) => {
               res.render('shop/product-detail', {product: result})
         }).catch((err) => {
               console.log(err)
         });
          
}



exports.postAddtocart = function(req,res){
            const id = req.body.productId
            Product.findById(id).then((product) => {
               Cart.findOne({id: product._id}).then((result) => {
                       if(!result)
                       {
                        const cart = new Cart({id: product._id, title: product.title, price: product.price, description: product.description, imageUrl: product.imageUrl, quantity : 1})
                         cart.save()
                       }
                       else
                       {
                           result.quantity += 1
                            result.save()
                       }
                      
               }).catch((err) => {
                    console.log(err)
               })  
                 res.redirect('/')
            }).catch((err) => {
                 console.log(err)
            }); 
           
           
}





    exports.removeFromCart = function(req,res){
              
           const id = req.body.prodId
               Cart.deleteOne({_id: id}).then((result) => {
                    res.redirect('/cart')                 
              }).catch((err) => {
                  console.log(err)
              });
 
        }
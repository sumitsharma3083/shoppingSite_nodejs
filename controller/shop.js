   const Product = require('../model/Product')
   const Cart = require('../model/cart')

      // Index action
  exports.getIndexRoute = function(req,res){ 

        Product.find().then((result) => {
            res.render('shop/index',{products: result,isAuthenticate:req.session.isAuthenticate, name: req.session.user.name}) 
        }).catch((err) => {
             console.log(err)
        });  
     
   }

     // /shop action
   exports.getShopRoute =  function(req,res,next){  
   
   
        Product.find().then((result) => {
            res.render('shop/shop',{products: result,
                isAuthenticate: req.session.isAuthenticate,
                name: req.session.user.name}) 
        }).catch((err) => {
            console.log(err)
        });  
    }

      // /product action
    exports.getProductsRouter = function(req,res){   
        Product.find().then((result) => {
              res.render('shop/product-list',{products: result,
                isAuthenticate: req.session.isAuthenticate,
                name: req.session.user.name})
        }).catch((err) => {
             console.log(err)
        });
    }

      // cart action

    exports.getCartRoute = function(req,res)
    {  
      res.render('shop/cart',{
          products: [],
          isAuthenticate :req.session.isAuthenticate,
          name: req.session.user.name
      })
    }
      

    exports.postAddtocart = function(req,res)
        {
       
          
        }


    exports.removeFromCart = function(req,res)
        {
            
        
        }
    

     // Error action

    exports.getErrorRoute = function(req,res,next)
    { 
    res.status(404).render('404',{isAuthenticate: req.session.isAuthenticate})
    } 


    exports.getCheckOutRoute = function(req,res)
    {
        res.render('shop/checkout',{isAuthenticate: req.session.isAuthenticate,
            name: req.session.user.name})
    }



    exports.getOrderRoute = function(req,res)
    {
        res.render('shop/orders',{isAuthenticate: req.session.isAuthenticate,
            name: req.session.user.name})
    } 




    exports.getDetailRoute = function(req,res)
    {
        const ProdId = req.params.productId
            Product.findById(ProdId).then((result) => {
                res.render('shop/product-detail', {product: result,
                    isAuthenticate: req.session.isAuthenticate,
                    name: req.session.user.name
                })
            }).catch((err) => {
                console.log(err)
            });
            
    }




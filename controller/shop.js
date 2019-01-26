   const Product = require('../model/Product')
   const User    = require('../model/user')

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
      
       typeof req.session.user != 'undefined'
       ?
        Product.find().then((result) => {
            res.render('shop/shop',{products: result,
                isAuthenticate: req.session.isAuthenticate,
                name:  req.session.user.name}) 
        }).catch((err) => {
            console.log(err)
        }) :
        Product.find().then((result) => {
            res.render('shop/shop',{products: result,
                isAuthenticate: req.session.isAuthenticate}) 
        }).catch((err) => {
            console.log(err)
        })
    }

      // /product action
    exports.getProductsRouter = function(req,res){ 

        typeof req.session.user != 'undefined'
        ?
        Product.find().then((result) => {
              res.render('shop/product-list',{products: result,
                isAuthenticate: req.session.isAuthenticate,
                name:  req.session.user.name
               })
        }).catch((err) => {
             console.log(err)
        })  : 
        Product.find().then((result) => {
            res.render('shop/product-list',{products: result,
              isAuthenticate: req.session.isAuthenticate
             })
      }).catch((err) => {
           console.log(err)
      })  
    }


    exports.getDetailRoute = function(req,res)
    {
        const ProdId = req.params.productId
        typeof req.session.user != 'undefined'
        ?
            Product.findById(ProdId).then((result) => {
                res.render('shop/product-detail', {
                    product: result,
                    isAuthenticate: req.session.isAuthenticate,
                    name: req.session.user.name
                })
            }).catch((err) => {
                console.log(err)
            }) 
        :
        Product.findById(ProdId).then((result) => {
            res.render('shop/product-detail', {
                product: result,
                isAuthenticate: req.session.isAuthenticate   
            })
        }).catch((err) => {
            console.log(err)
        })

            
    }
 
     // Error action
     exports.getErrorRoute = function(req,res,next)
     { 
     res.status(404).render('404')
     } 



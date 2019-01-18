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

      // cart action

    exports.getCartRoute = function(req,res)
      {  
            var loggeduser = req.session.user.email
          User.findOne({email: loggeduser})
          .then(user => {
              res.render('shop/cart',{
                  products: user.cart,
                  isAuthenticate: req.session.isAuthenticate,
                  name: req.session.user.name
              })
          })
          .catch(err => console.log(err))
      }
      
    exports.postAddtocart = function(req,res)
     {
          var productId  = req.body.productId
          var loggedUser = req.session.user.email
         
            // For the first time item add in the cart

             Product.findOne({_id: productId})
             .then(product => {
                  
                    //For the first time item add in cart
                    User.findOne({email: loggedUser})
                    .then(user => {
                       
                        //First time add in the cart
                        if(user.cart.length == 0)
                        {
                            var newitem = {
                                id: product._id,
                                title: product.title,
                                price: product.price,
                                imageUrl: product.imgPath,
                                description: product.description,
                                quantity : 1
                            }
                           
                            user.cart.push(newitem)
                            user.save()
                            res.redirect('/')
                        }
                        else
                        {
                         var isProduct = user.cart.find(p => {
                            return String(p.id) == String(product._id)
                        })


                       if(!isProduct)
                       {
                        var newitem = {
                            id: product._id,
                            title: product.title,
                            price: product.price,
                            imageUrl: product.imgPath,
                            description: product.description,
                            quantity : 1
                        }  
                        user.cart.push(newitem)
                        user.save()
                        res.redirect('/')     
                       }
                       else
                       {
                           res.redirect('/')
                       }
                   }
                }).catch(err => console.log(err))

             })
             .catch(err => console.log(err))
     }






    exports.removeFromCart = function(req,res)
        {
           var productId = req.body.prodId

            User.findOne({email : req.session.user.email})
            .then(user => {

               var mylist = user.cart

                  var index = mylist.findIndex((product)=> {
                             return String(product.id) == String(productId)
                  })
                   
                  mylist.splice(index,1)
                  
                  user.cart = mylist
                  user.save()
                  res.redirect('/cart')
                   
            })
            .catch(err => console.log(err))
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




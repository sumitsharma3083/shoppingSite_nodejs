
 const Product = require('../model/Product')



exports.getAddProductRoute = (req,res)=>{
       res.render('admin/add-product', {
              isAuthenticate:req.session.isAuthenticate
       })
  }

 
 
exports.PostAddProductRoute =  function(req,res){
        const title       = req.body.title
        const price       = req.body.price
        const url         = req.body.url
        const description = req.body.description


         if(!title || !price || !url || !description)
         {

                res.render('admin/add-product',{
                     isAuthenticate:req.session.isAuthenticate,
                       error: 'Please Fill all the fields'
                })
         }
         else{
              const product = new Product({
                     title: title,
                     price: price,
                     description: description,
                     imageUrl: url,
               })
     
              product.save().then((result) => {
                       res.redirect('/')
              }).catch((err) => {
                     console.log(err); 
              }); 
         }
       
}




exports.getEditProductRoute = function(req,res){
   
       Product.find().then((result) => {
              res.render('admin/edit-product',{products: result,isAuthenticate: req.session.isAuthenticate})
       }).catch((err) => {
              console.log(err);     
       });
    
}



exports.getEditingRoute = function(req,res){
                const id = req.params.prodId
      Product.findById(id).then((result) => {
              res.render('admin/editing',{Product: result,isAuthenticate: req.session.isAuthenticate})
      }).catch((err) => {
             console.log(err)
      });
     }




       exports.editdone = function(req,res){  
              const id             = req.body.getId
              const newtitle       = req.body.title
              const newprice       = req.body.price
              const newdescription = req.body.description

                 Product.findById(id).then((result) => {
                          result.title       = newtitle
                          result.price       = newprice
                          result.description = newdescription
                          return result.save()
                            
                 }).then(result=>{ 
                        res.redirect('/')
                 }).catch((err) => {
                        console.log(err)
                 });
       }




      exports.deleteProduct = function(req,res){
           const id = req.body.id
            Product.deleteOne({_id: id}).then((result) => { 
                    res.redirect('/')
            }).catch((err) => {
                     console.log(err)
            });
          }
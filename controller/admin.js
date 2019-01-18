
 const Product = require('../model/Product')
 const User    = require('../model/user')
  

exports.getAddProductRoute = (req,res)=>{
       res.render('admin/add-product', {
              isAuthenticate:req.session.isAuthenticate,
              name: req.session.user.name
       })
  }

  
 
 exports.PostAddProductRoute =  function(req,res){
       
     
        const title       = req.body.title
        const price       = req.body.price
        const description = req.body.description
        const imageInfo   = req.file
         
       console.log(imageInfo);
       
         if(!title || !price || !description || !imageInfo)
         {

                res.render('admin/add-product',{
                     isAuthenticate:req.session.isAuthenticate,
                       error: 'Please Fill all the fields',
                       name: req.session.user.name
                })
         }
         else{

              const product = new Product({
                     title: title,
                     price: price,
                     description: description,
                     imgPath: imageInfo.filename,
                     userId: req.session.user
               })
     
              product.save().then((result) => {
                       req.flash('add_msg', 'Product Add Successfully')
                       res.redirect('/')
              }).catch((err) => {
                     console.log(err); 
              }); 
         }    
}




exports.getEditProductRoute = function(req,res){
   
       Product.find().then((result) => {
              res.render('admin/edit-product',{products: result,
                     isAuthenticate: req.session.isAuthenticate,
                     name: req.session.user.name})
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
                        req.flash('edit_msg' ,'Product is successfully edit') 
                        res.redirect('/')
                 }).catch((err) => {
                        console.log(err)
                 });
       }




      exports.deleteProduct = function(req,res){
           const id = req.body.id

            Product.deleteOne({_id: id}).then((result) => { 
                    req.flash('delete_msg', 'Product Delete successfully')
                    res.redirect('/')
            }).catch((err) => {
                     console.log(err)
            });
               
          }



        
const express = require('express')
const Router = express.Router();
const adminController = require('../controller/admin');

   //          /admin/add-product
  Router.get('/add-product',adminController.getAddProductRoute)



  //           /admin/add-product
  Router.post('/add-product',adminController.PostAddProductRoute)


 //            /edit-products
  Router.get('/edit-products',adminController.getEditProductRoute)

  
  //     /admin/edit-products/edit
  Router.get('/edit-products/edit/:prodId',adminController.getEditingRoute)
  


   //      /admin/edit-done
     Router.post('/edit-done', adminController.editdone)


     
     //     /admin/delete-product
     Router.post('/delete-product',adminController.deleteProduct)


     module.exports = Router
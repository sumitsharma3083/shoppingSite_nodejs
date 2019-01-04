const express = require('express')
const Router = express.Router();
const adminController = require('../controller/admin');

     //  GET        /admin/add-product
  Router.get('/add-product',adminController.getAddProductRoute)



    //  POST         /admin/add-product
  Router.post('/add-product',adminController.PostAddProductRoute)


   // GET           /admin/edit-products
  Router.get('/edit-products',adminController.getEditProductRoute)

  
   //  GET       /admin/edit-products/edit
  Router.get('/edit-products/edit/:prodId',adminController.getEditingRoute)
  


    //  GET        /admin/edit-done
   Router.post('/edit-done', adminController.editdone)


     
   // GET    /admin/delete-product
     Router.post('/delete-product',adminController.deleteProduct)


     module.exports = Router
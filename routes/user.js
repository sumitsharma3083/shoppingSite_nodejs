const express = require('express')

const Router = express.Router();


   Router.get('/signup',function(req,res){
           res.render('user/signup')
   })


   Router.get('/signin', function(req,res){
           res.render('user/signin')
   })


    module.exports = Router;


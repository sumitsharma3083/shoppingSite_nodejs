const express = require('express')

const Router = express.Router();


 
   // GET          /user/signup
   Router.get('/signup',function(req,res){
           res.render('user/signup')
   })


    //GET         /user/signin
   Router.get('/signin', function(req,res){
           res.render('user/signin')
   })


    module.exports = Router;


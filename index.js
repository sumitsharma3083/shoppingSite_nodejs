const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express();
const AdminRoute      = require('./routes/admin')
const ShopRoute       = require('./routes/shop')
const userRoute       = require('./routes/user')
const authRoute     = require('./routes/auth')
const errorController = require('./controller/shop').getErrorRoute

 // setting up the mongoose and models connections  
   const mongoose = require('mongoose')
   const User     = require('./model/user')


     app.set('view engine', 'ejs')  
     app.set('views','views')
     app.use(bodyParser.urlencoded({extended:false}))  
     app.use(express.static(path.join(__dirname,'public')))
      
  
       app.use((req,res,next)=>{
           User.findById('5c1a8423eb90531194e3e2c6').then((result) => {
               req.user = result
               next()
           }).catch((err) => {
               console.log(err)
           });
       })
       
      app.use(ShopRoute)
      app.use('/admin',AdminRoute)     
      app.use('/user',userRoute)
      app.use(authRoute)
      app.use(errorController)
      
        
      
      mongoose.connect('mongodb+srv://sumit:thisissumitpassword@cluster0-x042n.mongodb.net/shoppingsite?retryWrites=true')
      .then((result) => {
            console.log("Database connection successful")
            User.findOne().then((result) => {
                 if(!result)
                 {
                  const user = new User(
                     {
                      name: 'sumit',
                      email: 'sumit@gmail.com',
                      cart: {items: []}
                    })
                    user.save()
                 }
           }).catch((err) => {
               console.log(err)
           });
           app.listen(3000)
          })
      .catch((err) => {     
            console.log(err)
       });

    
       

    
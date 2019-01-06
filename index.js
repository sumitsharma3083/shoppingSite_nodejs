const express           = require('express')
const bodyParser        = require('body-parser')
const path              = require('path')
const session           = require('express-session')
const MongoDbStore      = require('connect-mongodb-session')(session)
const AdminRoute        = require('./routes/admin')
const ShopRoute         = require('./routes/shop')
const authRoute         = require('./routes/auth')
const errorController   = require('./controller/shop').getErrorRoute
   // setting up the mongoose and models connections  
   const mongoose = require('mongoose')


      //init express
      const app    = express();

     var Store   = new MongoDbStore({
           uri: 'mongodb+srv://sumit:sumit123@cluster0-x042n.mongodb.net/shoppingsite',
           collection : 'session'
     })
 

     // set up the middleware
     app.set('view engine', 'ejs')  
     app.set('views','views')
     app.use(bodyParser.urlencoded({extended:false}))  
     app.use(express.static(path.join(__dirname,'public')))
     app.use(session({
           secret: 'mysecret',
           resave: true,
           saveUninitialized: false,
           store : Store
     }))
       
      app.use(ShopRoute)
      app.use('/admin',AdminRoute)     
      app.use(authRoute)
      app.use(errorController)
      
        
      
      mongoose.connect('mongodb+srv://sumit:sumit123@cluster0-x042n.mongodb.net/shoppingsite?retryWrites=true')
      .then((result) => {
            console.log("Database connection successful")
           app.listen(3000)
          })
      .catch((err) => {     
            console.log(err)
       });

    
       

    
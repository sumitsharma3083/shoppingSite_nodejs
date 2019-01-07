const express           = require('express')
const bodyParser        = require('body-parser')
const path              = require('path')
const session           = require('express-session')
const SessionStore      = require('connect-mongodb-session')(session)
const flash             = require('connect-flash')
const mongoose          = require('mongoose')

      // Accessing the Route files
const AdminRoute        = require('./routes/admin')
const ShopRoute         = require('./routes/shop')
const authRoute         = require('./routes/auth')
const errorController   = require('./controller/shop').getErrorRoute

 
      //init express
      const app    = express();

     const Store   = new SessionStore({
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
      
     app.use(flash())
     app.use((req,res,next)=>{
        res.locals.error_msg = req.flash('error_msg')
        res.locals.success_msg = req.flash('success_msg')
        next()
     })

        // Routes Middleware
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

    
       

    
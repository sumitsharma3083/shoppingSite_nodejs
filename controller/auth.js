
const bcrypt     =  require('bcryptjs')
const User       =  require('../model/user')
const nodemailer = require('nodemailer')
const crypto     = require('crypto')

exports.getLoginRoute = function(req,res){
    res.render('auth/login')
}


exports.getRegisterRoute = function(req,res){

    res.render('auth/register')
}


exports.postRegisterRoute = (req,res)=>{

   var name      = req.body.name
   var email     = req.body.email
   var password  = req.body.password
   var password2 = req.body.password2      

          if(!name || !email || !password || !password2)
          {
              console.log(typeof password,typeof password2)
              req.flash('error_msg', 'Please fill all the fields')
              res.redirect('/register')
          }
          if(password !=  password2)
          {
            req.flash('error_msg', 'Passwords do not Match')
            res.redirect('/register')
          }
          if(password.length < 6)
           {
            req.flash('error_msg', 'Password Must atleast 6 characters')
            res.redirect('/register')
           }

          User.findOne({email: email})
          .then(user =>{
              if(user){
                req.flash('error_msg', 'That Email is already register')
                 res.redirect('/register')
              }
              else{

                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);

                  var newuser = new User({
                      name: name,
                      email: email,
                      password: hash
                  })
                  newuser.save()
                  req.flash('success_msg', 'You have successfully Registered')
                 res.redirect('/login')
              }
          })
          .catch(err => {console.log(err)})
}


     
exports.postLoginRoute = function(req,res){
  
   var email    = req.body.email
   var password = req.body.password
   var loginError;
       if(!email || !password)
       {
           loginError = 'Please provide Email and Password'
           res.render('auth/login',{
            loginerror: loginError 
           })
       }  
   User.findOne({email: email})
   .then(user => {
       if(!user)
       {
           loginError = 'Please provide Correct Email'
           res.render('auth/login',{
               loginerror: loginError
           })
       }
       else
       {
           
         bcrypt.compare(password,user.password, function(err,isMatch){
                
            if(err)
            {
                throw err;
            }
              
            if(isMatch)
            {

                req.session.user = user
                req.session.isAuthenticate = true;

                 res.redirect('/')
    
               
            }
            else{
                  loginError = 'Password is Invalid'
                res.render('auth/login',{
                    loginerror: loginError
                })
            }

           })
       }    
   })
   .catch(err => console.log(err))
}
    



exports.getLogoutRoute = function(req,res)
{
    req.session.destroy()
    res.redirect('/')
}




exports.getResetRoute = function(req,res)
{
    res.render('auth/reset')
}




exports.postResetRoute = function(req,res)
{
   var email = req.body.email
    
      crypto.randomBytes(10, (err, buffer) => {
          if(err)
          {
              console.log(err)
          }

          var token = buffer.toString('hex')

          User.findOne({email: email})
          .then(user => {
              if(!user)
              {   req.flash('error_msg', 'Email is Invalid')
                  res.redirect('/reset')
              }
     
               var transporter = nodemailer.createTransport({
                   service: 'gmail',
                   auth: {
                       user: 'contact.webtech95@gmail.com',
                       pass: 8950094098
                   }
               })
                
               transporter.sendMail({
                  from: 'Shopping site <contact.webtech95@gmail.com>',
                  to: email,
                  subject: 'Change Your Password',
                  text: 'You can change your password',
                  html: `
                      <p>Click This <a href="http://localhost:3000/resetpassword/${token}">Link</a> to change the password</p>
                  `
               })
                 
                 res.redirect('/shop')
          })
     
          .catch(err => console.log(err))

      })   
}


exports.getChangePassword = (req,res,next) => {
    var token = req.params.token
    console.log(token)
} 
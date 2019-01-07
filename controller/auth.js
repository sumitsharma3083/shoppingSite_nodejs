
const bcrypt =  require('bcryptjs')
const User   =  require('../model/user')
 
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
           
         bcrypt.compare(password, user.password, function(err,isMatch){

            if(err) 
            {
               res.redirect('/login')
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
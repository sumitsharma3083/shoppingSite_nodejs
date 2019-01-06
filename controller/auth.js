
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
   var password2 = req.body.password       

       
          User.findOne({email: email})
          .then(user =>{
              if(user){
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
                 res.redirect('/login')
              }
          })
          .catch(err => {console.log(err)})
}


     
exports.postLoginRoute = function(req,res){
  
   var email    = req.body.email
   var password = req.body.password

   User.findOne({email: email})
   .then(user => {
       if(!user)
       {
           res.redirect('/login')
       }
       else
       {
           
         bcrypt.compare(password, user.password, function(err,isMatch){

            if(err) 
            {
                console.log(err)
            }
              
            if(!isMatch)
            {
                res.redirect('/login')
            }
            else{
                 
                req.session.user   = user
                req.session.isAuthenticate = true;
                res.redirect('/')
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

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
   var errors = []
       
        if(!name || !email || !password || !password2)
        {
            errors.push({msg: 'Fields cant be empty'})
        }
        if(password != password2)
        {
            errors.push({msg: 'Password do not match'})
        }
        if(password.length < 6)
        {
            errors.push({msg: 'Password Length must be 6 characters'})
        }
       
        if(errors.length > 0)
        {
            res.render('auth/register',{
                errors
            })   
        }
       
          User.findOne({email: email})
          .then(user =>{
              if(user){
                 req.flash('err_msg', 'Email is Already registered')
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
const bcrypt = require('bcryptjs')
const User = require('../model/user')


exports.getPersonalview = function(req,res)
{
       res.render("userAccount/personalinfo", {
             isAuthenticate : req.session.isAuthenticate,
             name: req.session.user.name,
             user: req.session.user
       })
}


exports.postChangePasswordAction = function(req,res){
      var presentPassword = req.body.currentpassword
      var newpassword     = req.body.newpassword
      var newpassword2    = req.body.newpassword2

      if(newpassword != newpassword2)
      {
            res.redirect('/account/personal')
      }
      if(newpassword.length < 6)
      {
            res.redirect('/account/personal')
      }

     User.findOne({email : req.session.user.email})
     .then(user => {

                  bcrypt.compare(presentPassword,user.password, function(err,isMatch){
                     if(isMatch)
                     {
                        var salt = bcrypt.genSaltSync(10);
                        var hash = bcrypt.hashSync(newpassword, salt);
                        user.password  = hash
                        user.save()
                        .then(result => { 
                                    console.log("Password changed")
                                    res.redirect('/account/personal')
                        })
                        .catch(err => console.log(err))
                       
                     }
                     else
                     {
                           res.redirect('/account/personal')
                     }
                  })
     })
     .catch(err => console.log(err))
}


exports.postChangeEmailAction = function(req,res){

    var email    = req.body.email
       
      User.findOne({email: req.session.user.email})
      .then(user => {
          user.email = email
          user.save()
          req.session.destroy()
          res.redirect('/login')
      })
      .catch(err => console.log(err))  
}
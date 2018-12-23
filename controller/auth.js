


exports.getLoginRoute = function(req,res){
      
    res.render('auth/login')
}

exports.postLoginRoute = function(req,res){
      const email    = req.body.email
      const password = req.body.password
         res.redirect('/')
}
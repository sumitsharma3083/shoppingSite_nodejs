module.exports = {
    isLogged : function(req,res,next){
        if(req.session.isLogged)
        {
            next()
        }

        res.redirect('/login')
    }
}
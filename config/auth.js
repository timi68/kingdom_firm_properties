jwt = require('jsonwebtoken');

module.exports = {
    ensureIsAuthenticated : (req,res,next)=>{
        if(req.isAuthenticated()){
            return next()
        }else{
            req.flash('error',"You dont have any session, Log in")
            res.redirect('/membership/login');
            res.end()
        }
    },
    verifyToken : (req,res,next)=>{
        const {token, key} = req.query;
        
        if(!token){
            return res.status(404).redirect("/page/error") 
        };

        jwt.verify(token, key, (err, auth)=>{
            err 
            ? (()=>{
                req.flash("error","Invalid Token");
                res.status(404).redirect("/page/error")
                res.end()
            })()
            :(()=>{
                req.user = auth
                next();
            })()
        })
    
    }
}
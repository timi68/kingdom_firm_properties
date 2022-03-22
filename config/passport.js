var {member_auth: users} = require('../connection/mongodb')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

passport.use('localSignin', new LocalStrategy({
    usernameField : 'userEmail',
    passwordField : 'userPassword',
},
function(userEmail, userPassword, next) {
 // Find the user  
    users.findOne({email : userEmail},(err, user)=>{
        if(!err){
            if(user === "null" || user === null){
                return next(null, false, {message: "This email is not registered"})
            }else{
                bcrypt.compare( userPassword , user.password, (err, isMatch)=>{
                    if(err) throw err
                    else{
                        if(isMatch){
                            const time = new Date().toUTCString()
                            users.findByIdAndUpdate(user.id,{last_login : time},(err, user)=>{
                                if(!err){
                                    next(null,user)
                                }else{
                                    next(null, false ,{message : "Login error, currently not available"})
                                }
                            })
                        }else{
                            return next(null, false, {message: "Password is incorrect"});
                        }
                    }
                })
            }
        }else{
            next(null, false, {message : "We having issue with our database, we resolving issue or contact us for more +2349017241037"})
        }
    })
}));

passport.use('verifyEmail', new LocalStrategy({
    usernameField: 'userCode',
    passwordField: 'userId',
    passReqToCallback: true

},function(req,code, id, next){

    users.findOneAndUpdate({email_verification_code: code},{verified: true},(err,user)=>{

        if(err ?? user == null) return next(null, false, {message : "Invalid Code"});

        return next(null, user, {message: "Email verified successfully"});
             
    }) 
}))

passport.serializeUser(function(user, next) {
    // Serialize the user in the session
    next(null, user.id);
});

passport.deserializeUser(function(id, next) {
 // Use the previously serialized user
    users.findById(id, (err, user)=>{
        if(!err) return next(null, user)
        else throw err
    })
});

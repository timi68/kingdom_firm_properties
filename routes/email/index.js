const {member_auth : users} = require('../../connection/mongodb'),
{emailCode: sender} = require('../../email-sender/')

const vEmail = (email, cb)=>{
    const codeE = Math.floor(Math.random() * 60000);

    users.findOneAndUpdate({email: email},{codeE},(err, user)=>{
        if(err || !user){
           return cb({error : "This is not the email you registered"})
        }
        sender(user.email , user.firstname, codeE, ({error, success})=>{
            if(!error){
                return cb({success : "success"})
            }
            return cb({error: "There is error sending message to the email provided"})
        })
    })
}

const cEmailCode = (email, code , cb)=>{
    users.findOne({email: email},(err, user)=>{
        if(err ?? !user){
            cb({error : "There is an error encountered"})
        }else{
            if(user.codeE === Number(code)){
                users.findByIdAndUpdate(user.id,{verified: true},(err)=>{
                    err
                    ?cb({error : "unable to complete process"})
                    :cb ({success : "success"})
                })
            }
        }
    })
}

module.exports = {vEmail , cEmailCode};
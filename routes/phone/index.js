
const {member_auth : users} = require('../../connection/mongodb'),
sender =  require('../../code sender/');

const vNumber = (id , number, cb)=>{
    var codeN = Math.floor(Math.random() * 60000);

    users.findByIdAndUpdate(id,{number},(err, user)=>{
        if(err || !user){
            return cb({error : "user doesn't exist"})
         }

         return cb({success : "success"})
         
    })
}

const cNumberCode = (id, number, code , cb) => {
    users.findById(id,(err, user)=>{
        if(err ?? !user){
            return cb({error : "It seems there is an error getting this stuff done"})
        }
        else{
            if(user.codeN == code){
                users.findOneAndUpdate({id},{number},(err)=>{
                    if(err) return cb({error: "Server error"});

                    return cb({success : "success"})
                })
            }else{
                return cb({error: "Invalid code"})
            }
        }
        
    })
}

module.exports = {vNumber, cNumberCode}
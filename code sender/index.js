
module.exports = (number, code,  cb)=>{
    var messagebird = require('messagebird')('A17pIglQBcHL9Rti2nVK7FV4P');
    messagebird.messages.create({
        originator : '+2349017241037',
        recipients : [ `${number}` ],
        body : `V-Code ${code}`
    },function (err, response) {
        if (err) {   
            console.log(err)
            return cb({error : "Error"});
        
        } else {

            return cb({success: "Done"});

        }
    });
}
const {member_auth: users, member_uploads: uploads} = require('../connection/mongodb'),
bcrypt = require('bcryptjs'),
{v4:uuidv4} = require('uuid'),
fs = require('fs'),
async = require('async'),
cloudinary = require('cloudinary')

const addUsers = (body,callback) => {
    users.find({email : body.userEmail},(err, result)=>{
        if(result.length <= 0){
            bcrypt.genSalt(10,(err,salt)=>{
                if(err) return callback({error : "Code: Salt <br> Contact to find out why this error happening : +2349017241037"});
                bcrypt.hash(body.userPassword , salt , (err, hash)=>{
                    if(!err){
                        const user = new users({
                            firstname: body.firstName,
                            lastname:body.lastName,
                            email: body.userEmail,
                            password : hash,
                            verified: false,
                        });

                        if(user.save()){
                            setTimeout(()=>{
                                users.findOne({email : `${body.userEmail}`},(err,user)=>{
                                    if(err) return callback({error: "Unable to fetch user details with the email provided"})
                                    
                                    return callback({success: "You have been registered successfully,But you need to verify your email", email: body.userEmail, name: user.firstname,id:user.id});
                                })
                            },1000)
                            
                        }else{
                            return callback({error: "Code : save ; <br> Please wait while we resolve the issue or Contact +2349017241037"})
                        }
                        
                    }else{
                        throw err
                    }
                })
            })
             
        }else{
            callback({error : "This email has been registered already."})
        }
    })
}

const getUserDetails = (id, cb)=>{
    users.findById(id, (err, user)=>{
        err ?? !user
        ? cb("not found")
        : cb(null, user)
    })
}

const verifyEmail = (email, cb)=>{
    users.findOne({email : email},(err, user)=>{
        err ?? user == null
        ? cb({error: "This email is not registered"})
        : cb({name: user.name, id: user.id})
    })
}

const verifyUser = (id, cb) => {
    users.findByIdAndUpdate(id,{verified: true},(err,data)=>{
        
        if(err || !data) return cb({error: "There is error updating user"})

        return cb({success: "Email verified successfully"});

    })
}

const verifyId = (req,res,next) => {
    const {id} = req.query

    if(!id) return res.status(404).redirect("/page/error")

    users.findById(id, (err, user)=>{
        err ?? user == null 
        ? res.status(404).redirect("/page/error")
        : req.flash('verified', user.email),
          req.flash("success","Your email has been registered but needs verification"), 
          next();
    })

}

const upload = ({data, prop_images}, callback) =>{
    
    let price = data.price.replace(/[\D]/g,""),
    date_posted = new Date().toUTCString(),
    uuid = uuidv4().substr(0,15),
    address =  data.address ?? "";

    let property = new uploads({
        uuid,
        up_id: data.up_id,
        up_name: data.up_name,
        title: data.title,
        status: data.status,
        address,
        state: data.state,
        lga: data.lga,
        price,
        negotiable: data.negotiable,
        date_posted,
        description: data.description,
        prop_images
    });
    
    if(property.save()){
        users.findById(data.up_id,(err, user)=>{
            if(!err){
                let t = user.total_uploads || 0
                let total_uploads = t + 1
                users.findByIdAndUpdate(user.id,{total_uploads},(err,u)=>{
                    if(!err){
                        callback({success: {success: "Property uploaded successfully"}})
                    }else{
                        callback({error: {error: "Unable to complete upload details"}})
                    }
                })
            }else{
                callback({error: {error: "Unable to complete upload details"}})
            }
        })
    }else{
        callback({error: {error: "Error uploading image to the database"}})
    }
  
}

const getProperties = (data, callback) => {

    const {search_text, type , skipper} = data

    const c = String(skipper),
    r = Number(c.replace(/[\W]/,""));
    var s, t;

    if(data.type.toLowerCase().trim() != "price"){
        s = search_text.toLowerCase().trim(), t = type.toLowerCase().trim();
    }else{
        s = search_text.toLowerCase().trim(), t = data.type.toLowerCase().trim();
    }
    
    switch (t) {
        case "all":
            uploads.find({
                 "$or": [
                    {title : new RegExp(s, "i")},
                    {state: new RegExp(s, "i")},
                    {lga: new RegExp(s, "i")},
                    {facilities: new RegExp(s, "i")}
                 ]

            },(err, result)=>{
                if(err) throw err
                let propGroup = []
                if(result.length > 0){
                    result.forEach(el => {
                        let propData = {
                            property_id:el.id,
                            title: el.title,
                            description: el.description,
                            state: el.state,
                            lga: el.lga,
                            price : el.price,
                            status: el.status,
                            front_image: el.prop_images[0].secure_url
                        };


                        propGroup.push(propData)
                    })
                    if(skipper != null && skipper != undefined){
                        let skip = Number(r) + Number(propGroup.length)
                        return callback({propGroup, skip})
                    }
                }else{
                    if(skipper != null && skipper != 0){
                        callback({not_found: "No more related search"})
                    }else{
                        callback({not_found: "Could not get property that match your search"});
                    }
                }
            }).skip(r ?? 0).limit(12)
            break;
            
        case "location":
            uploads.find({
                "$or":[
                    {state: new RegExp(s, "i")},
                    {lga : new RegExp(s, "i")}
                ]   
            },(err, result)=>{
                if(err) throw err
                let propGroup = []
                if(result.length > 0){
                    result.forEach(el => {
                        let propData = {
                            property_id:el.id,
                            title: el.title,
                            description: el.description,
                            state: el.state,
                            lga: el.lga,
                            price : el.price,
                            status: el.status,
                            front_image: el.prop_images[0].secure_url
                        };


                        propGroup.push(propData)
                    })

                    if(skipper != null && skipper != undefined){
                        let skip = Number(r) + Number(propGroup.length)
                        
                        return callback({propGroup, skip})
                    }

                }else{
                    if(skipper != null && skipper != 0){
                        callback({not_found: "No more related search"})
                    }else{
                        callback({not_found: "Could not get property that match your search"});
                    }
                    
                }
            }).skip(r ?? 0).limit(12)            
            break;

        case "price": 
            uploads.find({
                 price : {$lte: Number(s)}
            },(err, result)=>{
                if(err) throw err
                let propGroup = [];
                if(result.length > 0){
                    result.forEach(el => {
                        let propData = {
                            property_id:el.id,
                            title: el.title,
                            description: el.description,
                            state: el.state,
                            lga: el.lga,
                            price : el.price,
                            status: el.status,
                            front_image: el.prop_images[0].secure_url
                        };


                        propGroup.push(propData)
                    })

                    if(skipper != null && skipper != undefined){
                        let skip = Number(r) + Number(propGroup.length);
                        return callback({propGroup, skip});
                    }

                }else{
                    if(skipper != null && skipper != 0){
                        callback({not_found: "No more related search"})
                    }else{
                        callback({not_found: "No property of that amount you typed or even below that amount"});
                    } 
                }
            }).skip(r ?? 0).limit(16).sort({price : -1})
            break;
            
        case "hostel":
            uploads.find({
                 "$or": [
                    {title : new RegExp(s, "i")},
                    {state: new RegExp(s, "i")},
                    {lgs : new RegExp(s, "i")},
                    {facilities: new RegExp(s, "i")}
                 ]

            },(err, result)=>{
                if(err) throw err;

                let propGroup = [];

                if(result.length > 0){
                    result.forEach(el => {
                        let propData = {
                            property_id:el.id,
                            title: el.title,
                            description: el.description,
                            state: el.state,
                            lga: el.lga,
                            price : el.price,
                            status: el.status,
                            front_image: el.prop_images[0].secure_url
                        };
                        propGroup.push(propData);
                    })

                    if(skipper != null && skipper != undefined){

                        let skip = Number(r) + Number(propGroup.length);                     
                        return callback({propGroup, skip});

                    }

                }else{
                    if(skipper != null && skipper != 0 ){
                        callback({not_found: "No more related search"})
                    }else{
                        callback({not_found: "Could not get property that match your search"});
                    } 
                }
            })
            break;
            
        case "random":
            uploads.find((err, result)=>{
                if(err) throw err;

                let propGroup = [];

                if(result.length > 0){
                    result.forEach(el => {

                        let propData = {
                            property_id:el.id,
                            title: el.title,
                            description: el.description,
                            state: el.state,
                            lga: el.lga,
                            price : el.price,
                            status: el.status,
                            front_image: el.prop_images[0].secure_url
                        };

                        propGroup.push(propData);
                        
                    })

                    if(skipper != null && skipper != undefined){
                        let skip = Number(r) + Number(propGroup.length)
                        return callback({propGroup, skip})
                    }

                }else{
                    if(skipper != null && skipper != 0){
                        callback({not_found: "No more related search"})
                    }else{
                        callback({not_found: "No available property yet, Trying to get property around the country"});
                    }                   
                }
            }).skip(r ?? 0).limit(12)
            break;
            
        default:
            break;
    }
    
}

const getOverview = (data, callback)=>{
    uploads.findOne({_id: data},(err, property)=>{
        if(err) {        
            return callback({error: err});
        }
        
        uploads.find({_id : {"$ne" : data}},(err, related)=>{
            if(err) {               
                return callback({error: "err"});
            }

            
            return callback({property, related})
        }).limit(3)
        
    })
}

const getUserUploads = (id, callback) => {
    uploads.find({up_id: id},(err, uploads)=>{
        if(!uploads?.length) return callback({error: "error"})
        
        callback({uploads})

    })
}

const changePassword = ({new_password, member_id}, cb)=>{
    bcrypt.genSalt(10,(err,salt)=>{
        if(err) return callback({error : "Code: Salt <br> Contact to find out why this error happening : +2349017241037"});
        bcrypt.hash(new_password , salt , (err, hash)=>{
            if(!err){
                users.findByIdAndUpdate(
                    member_id,
                    {password : hash},
                    (err, doc)=>{
                        !err && doc != null && doc != "null"
                        ? cb({success: "Password reset successfully"})
                        :  cb({error: "We encounter an issue resetting your password"});
                    }
                )
                
            }else{
                throw err
            }
        })
    })  
}

const Delete = (id, callback)=>{
    
    uploads.findById(id, (err,data)=>{
        if(!data) return callback({error: "There is no such property in the database"})

        const prop_images = data.prop_images
        let x = 0;

        function deleteImage(n, cb){
            cloudinary.uploader.destroy(prop_images[n].cloudinary_id, data => {
                if(data?.result == "ok"){
                    cb(null, data)
                }else{
                    cb(data)
                }
            })
        }
        async.times(prop_images.length, (n, next)=>{
            deleteImage(n, (err, result)=>{
                next(err, result)
            })
        },(err, results)=>{
            if(err == null){
                uploads.findByIdAndDelete(id,(err,data)=>{
                    if(err){
                        return callback({error: "There is an error deleting property"})
                    }
                    return callback({success: "success"}) 
                })
            }else{
                callback({error: "Error"})
                return
            }
        })
        
    })
}

const verifyProp = (id,cb)=>{
    uploads.findById(id,(err, data)=>{
        if(!data){
            return cb({error: {error : "The prop does not exist"}})
        }else{
            return cb({success: {success : "Verified"}})
        }
    })
}

const updateProperty = async (data, prop_images, cb)=>{
    uploads.findById(data.id,(err, user)=>{
        if(!user) return cb({error: {error : "Error deleting prop data and updating"}})

        const prop = user.prop_images;

        function deleteImage(n, cb){
            cloudinary.uploader.destroy(prop[n].cloudinary_id, d => {
                if(d?.result == "ok"){
                    cb(null, d)
                }else{
                    cb(d)
                }
            })
        }
        async.times(prop.length, (n, next)=>{
            deleteImage(n, (err, result)=>{
                next(err, result)
            })
        },(err, results)=>{
            if(err == null){
                address = data.address ?? "";
                const price = Number(data.price.replace(/[\D]/g,""));

                uploads.findByIdAndUpdate(data.id, {
                    title : data.title,
                    state : data.state,
                    lga : data.lga,
                    description : data.description,
                    price,
                    status : data.status,
                    negotiable : data.negotiable,
                    address,
                    prop_images
                },(err,user)=>{
                    if(err){
                        return cb({error : {error : "There is error updating property"}})
                    }else{
                        return cb({success : {success : "Property Updated Successfully"}})
                    }
                })
            }else{
                cb({error : {error: "Error"}})
                return
            }
        })
    })
}

const settingsUpdate = (id, data, cb)=>{
    if(data.userPassword){
        bcrypt.genSalt(10,(err, salt)=>{
            if(err) return cb({error: {error : "Unable to update password"}})

            else{
                bcrypt.hash(data.userPassword,salt,(err, hash)=>{
                    if(!err ){
                        users.findByIdAndUpdate(id,{
                            password : hash,
                        }, (error, data)=>{
                            if(error || !data){
                                return cb({error : "Unable to update password"})
                            }else{
                                return cb({success: "success"})
                            }
                        })
                    }else{
                        return cb({error: "Unable to update password"})
                    }
                })
            }
            
        })
    }else if(data.userEmail){
        users.findByIdAndUpdate(id,{
            email : data.userEmail
        }, (error, data)=>{
            if(error || !data){
                return cb({error:"Unable to update email"});
            }else{
                return cb({success: "success"});
            }
        })
    }else if(data.userNumber){
        users.findByIdAndUpdate(id,{number: data.userNumber},(error, data)=>{
            if(error || !data){
                return cb({error:"Unable to update number"})
            }else{
                return cb({success: "success"})
            }
        })
    }
}

const deleteUser = (id, callb) => {
    uploads.find({up_id : id},(err, upload)=>{
        if(err) return callb({error: "error encountered deleting account"});

        if(upload.length > 0){
            function getUpload(c, cb){
                let id = upload[c].id;
                let prop = upload[c].prop_images;
                let err = 0 
                prop.forEach((el, i)=>{
                    cloudinary.uploader.destroy(el.cloudinary_id, d => {
                        if(!d?.result == "ok"){
                            err++
                        }
                    })
                })  
                
                if(err > 0){
                    return cb("there is error")
                }else{
                    uploads.findByIdAndDelete(id,(err)=>{
                        if(err) return cb("error deleting from uploads");
                        return cb(null,"success");
                    })
                }
            }

            async.times(upload.length, (c, next)=>{
                getUpload(c, (err, result)=>{
                    next(err, result)
                })
            },(err, result)=>{
                if(!err){
                    users.findByIdAndDelete(id,(err)=>{
                        if(err){
                            return callb({error: "Error deleting account"})
                        }

                        return callb({success: "success"})
                    })
                }
            })
        }else{
            users.findByIdAndDelete(id,(err)=>{
                if(err){
                    return callb({error: "There is error deleting user account"})
                }

                return callb({success: "success"})
            })
        }
    })
}

module.exports = {
    addUsers, 
    upload,
    verifyId,
    getUserDetails, 
    getProperties,
    getOverview,
    deleteUser, 
    updateProperty, 
    getUserUploads,
    Delete,
    settingsUpdate,
    verifyProp,
    changePassword,
    verifyUser,
    verifyEmail
};
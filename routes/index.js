const { callbackPromise } = require('nodemailer/lib/shared');

const express = require('express'),
router = express.Router(),
passport = require('passport'),
formidable = require('formidable'),
fs = require('fs'),
async = require('async'),
path = require('path'),
request = require('request'),
dotenv = require('dotenv').config(),
cloudinary = require('cloudinary'),
{emailLink,emailCode, passwordChange} = require('../email-sender'),
{v4: uuidv4} =require('uuid'),
jwt = require('jsonwebtoken'),
{ensureIsAuthenticated, verifyToken} = require('../config/auth'),
{
    addUsers, 
    upload,
    deleteUser, 
    getProperties, 
    getOverview, 
    updateProperty, 
    getUserUploads, 
    Delete,
    changePassword,
    settingsUpdate,
    getUserDetails,
    fetchEmail,
    verifyProp,
    verifyUser,
    verifyId,
    verifyEmail
} = require('../routes/users_control'),
{vEmail , cEmailCode} = require('./email'),
{vNumber, cNumberCode} = require('./phone');
require("../config/passport")


///------- Setting up cloudinary for uploading property images
//------ and url link of all images will be generated from cloudinary
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//This are set up of all the get request
router.get('/',(req, res, next)=>{
    res.render('index',{title: "The Kingdom Properties"})
})

//-----  Explore page ----------
router.get('/explore',(req,res,next)=>{

    const {search_text, type, skipper} = req.query
    let q

    if(search_text && !type){
        q = {
            search_text,
            type:"All"
        }
    }else if(!search_text){
        let skipper = req.query.skipper ?? 0;
        q = {
            search_text: 'random',
            type:"Random",
            skipper
        }
    }else if(skipper == null && skipper == undefined){
        let skipper = req.query.skipper ?? 0;
        q = {
            search_text,
            type,
            skipper
        };

    }else{            
        q = req.query
    }
    
    if(q){
        getProperties(q, ({not_found, propGroup, skip})=>{

            let data,
            title = "The Kingdom Estate - Explore Board";

            if(q.search_text != "random"){
                data = q
            }

            if(not_found){
                res.render('explore',{title, not_found, data})
    
            }else if(propGroup){
                res.render('explore',{title, propGroup, data , skip})
            }
        })
    }else{
        res.send("Error")
    }
    
})

router.get('/explore/overview',(req,res,next)=>{
    const query = req.query.q
    getOverview(query,({error, property, related})=>{
        if(error) res.status(400).redirect('/page/error');
        res.render('overview', {title: "Explore-Overview",property, related})      
    })
})

router.get('/membership',(req,res,next)=>{
    res.render('member',{title: "Membership"})
})

router.get('/membership/register',(req,res,next)=>{
    res.render('register',{title: "Membership - Register"})
})

//----  registering user but checking if email user 
//entered is registered already before inserting 
//into the database
router.post('/member/register', async (req, res, next)=>{
    const {captcha} = req.body

    if(!captcha || captcha === undefined || captcha === null || captcha === ""){
        let data = req.body
        req.flash("error","Please select captcha box"),
        req.flash("data", data),
        res.redirect('/membership/register');
        res.end();
        return
    }
    const secret = "6LdTmgkbAAAAAP5FZ2gwijLe8EeZUHEP0LLSZfFI"
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secret}&response=${captcha}&remoteip=${req.socket.remoteAddress}`
    
    request(verifyUrl,(err,response, body)=>{
        let data = body
        if(body.success !== undefined && !body.success){
            let data = req.body
            req.flash("error","Session timed out please fill form again"),
            req.flash("data", data),
            res.redirect('/membership/register');
            res.end();
            return
        }else{
            addUsers(req.body, ({error, success, name, email, id})=>{
                if(success){           
                    emailLink({email, name, id}, ({error, success})=>{
                        if(error){
                            data = req.body 
                            req.flash('error', error);
                            res.redirect('/membership/login');
                        }
                        else{
                            req.flash('verified', email);
                            req.flash("success",success);
                            res.redirect(`/membership/email_verificator`);
                        
                            res.end();
                        }
                    })
                    
        
                }else if(error){
                    data = req.body
                    req.flash('error', error);
                    req.flash('data',data);
                    res.redirect('/membership/register')
                }
            })
        }
    })

    
})

router.get('/membership/login',(req,res,next)=>{
    res.render('login',{title: "Membership - Login"})
})

router.get('/membership/dashboard',ensureIsAuthenticated, (req,res,next)=>{
    req.session.member_name = req.user.name;
    let id = req.user.id
    getUserUploads(id, ({error, uploads})=>{
        data = error ?? uploads
        getUserDetails(id, (err,user)=>{
            if(!err){
                if(user.verified == true && user.number != undefined && user.number != ""){
                    res.render('member-dashboard',{
                        title: "Membership - Dashboard",
                        user,
                        id,
                        data,
                    })
                }else{
                    req.flash("verified","Please complete your verification steps")
                    res.redirect('/membership/verification'),
                    res.end()
                    
                }
            }
        })
        
    })
})

router.get('/membership/settings',ensureIsAuthenticated,(req,res)=>{ 
    const session_id = req.session?.passport?.user ?? null

    if(!session_id){
        return res.redirect('/page/error')
    }

    getUserDetails(session_id, (err,user)=>{
        if(!err){
            if(user.verified === true && user.number !== undefined && user.number != ""){
                res.render('settings',{title: "Membership - Settings",user})             
            }
            else{
                req.flash("verified","Please complete your verification steps"),
                res.redirect('/membership/verification'),
                res.end()
            }
        }
    })
    
})

router.get('/membership/profile',ensureIsAuthenticated,(req,res)=>{
    const id = req.session?.passport?.user

    getUserDetails(id, (err,user)=>{
        if(!err){
            if(user.verified == true && user.number != undefined && user.number != ""){
                res.render("profile",{title : "Membership | User Profile",user})     
            }else{
                req.flash("verified","Please complete your verification steps")
                res.redirect('/membership/verification'),
                res.end();
                return
            }
        }
    })
})

router.get('/membership/upload',ensureIsAuthenticated,(req,res,next)=>{

    if(!req.session.passport && !req.session.member_name){
        req.flash("error", "You dont have any session.")
        return res.status(400).redirect('/membership/login')
    }
    
    const id = req.user.id ?? req.session.passport.user
    getUserDetails(id, (err,user)=>{
        if(!err){
            if(user.verified == true && user.number != undefined && user.number != ""){
                res.render(
                    'member-upload',
                    {title: "Membership - Upload",user}
                )        
            }else{

                req.flash("verified","Please complete your verification steps")
                res.redirect('/membership/verification'),
                res.end();
                return
            }
        }
    }) 
})

router.get("/membership/verification",ensureIsAuthenticated,(req,res)=>{
    
    const id = req.user.id

    getUserDetails(id, (err,user)=>{
        if(!err){
            res.render("verification/verification",{title : "Kingdom real Property : Verification",user})
        }
    }) 
})

//------  This routes is for changing forgotten stuff, like email or passowrd
//-------- or Password
router.get('/membership/email_getter',(req,res,next)=>{
    res.render('change_password/email_getter',{title : "The kingdome Estate: Password Change requirements"})
})

router.post('/email_getter',(req,res,next)=>{
    const {email} = req.body

    verifyEmail(email, ({error, name , id})=>{
        if(error){
            req.flash("error", error);
            return res.redirect('/membership/email_getter');
        }

        passwordChange(email,name,id,({error, success})=>{
            if(error){
                req.flash('error','Internal Server Error')
                res.status(404).redirect("error")
                res.end();
            }else{
                req.flash('success', "Private link to reset your password has been sent to your email");
                res.redirect('/membership/email_getter')
                res.end();
            }
        })
    })
})

router.get('/membership/password_changer', verifyToken ,(req, res, next)=>{
    const {email, name} = req?.user?.user

    if(!email ?? !name){
        res.redirect('/page/error')
    }
     
    res.render('change_password/change_password',{
        title : "Membership - Change Password",
        email,
        name
    })

})

router.post('/change_password',(req,res,next)=>{
    const {new_password, member_id} = req.body;

    changePassword({new_password, member_id}, ({error, success})=>{
        res.send(error ?? success)
    })

})
//----------  This is where the changing part ends -----------

router.get('/membership/email_verificator_neutral',(req, res, next)=>{
    // res.render('verify_email/email_verificator',{title : "Membership - Email Verification"});
    const {token , key} = req.query
    
    if(!token ?? !key) return res.status(404).redirect("/page/error").end()

    jwt.verify(token,key,(err, data)=>{
        if(err){
            req.flash('error', "Token expired");
            res.redirect('/page/error').end();
            return
        }
        verifyUser(data.user.id,({error, success})=>{
            if(error) return res.status(404).send("<h1 color='red'> Error encounter, this is an internal server error </h1>");

            req.flash("success",success)
            res.redirect('/membership/login')
            res.end();
        })

    })
})

router.get('/membership/email_verificator',(req,res)=>{
    res.render('verify_email/email_verificator')
})

//------------ Sending code to user registered email and verifying of code api ----------
router.post('/sendEmailCode',(req,res,next)=>{
    const {email} = req.body

    vEmail(email,({error, success})=>{
        res.send(error ?? success)
    });

})

router.post('/verify/email',(req,res,next)=>{
    const {email, code}  = req.body;
    
    cEmailCode(email, code , ({error , success})=>{
        res.send(error ?? success);
    })

})

//---------- This part is for Phone number verification--------------
router.post('/verify/phone',(req,res,next)=>{
    const {number} = req.body,
    id = req.user.id
    let num 
    
    if(number.length > 10){
        num = "+234" + number.substr(1,number.length)
    }else{
        num = "+234" + number
    }
    vNumber(id , num, ({error, success})=>{
        res.send(error ?? success)
    })
})

// router.post("/verify/phone",(req,res)=>{
//     const {number , code} = req.body,
//     id = req.user.id;

//     cNumberCode(id, number, code, ({error , success})=>{
//         res.send(error ?? success)
//     })
// })


//deleting property
router.post('/delete',(req,res,next)=>{
    const {id} = req.body;

    Delete(id, ({error, success})=>{
        res.send(error ?? success)
    })
})

router.post('/settings/update',(req,res,next)=>{
    const data = req.body,
    id = req.session?.passport?.user
    
    if(!id){
        res.send("Unable to update settings")
    }

    settingsUpdate(id, data, ({error, success})=>{
        res.send(error ?? success)
        res.end()
    })
})

router.get('/property/update',(req,res,next)=>{
   const {property_id} = req.query;

   if(!req.session.passport && !req.session.member_name){
    return res.status(400).redirect('/page/error')
    }

    let session = {
        id: req.session.passport.user,
        name: req.session.member_name
    }

    res.render('member-upload',{title: "Membership - Update", session});

})

//-----------  Verifying property before updating  --------
//-----to avoid error in the server side --------------
router.post('/verifyProp',(req,res)=>{
    const {id} = req.body;

    verifyProp(id, ({error,success})=>{
        res.json(error ?? success)
    })
})

//------------- Updating property after verification ----------
//-------- This takes a little time though -----------
router.post('/property/update',async (req,res,next)=>{

    
    const {user} = req.session?.passport?.user

    if(!user){
        return res.send({error: "Unable to upload property"})
    }


    var form = new formidable.IncomingForm();
	let index, data
    id = uuidv4();
 
     form.parse(req, (err, field , files)=>{
         data = field
    }) 

    form.on('field', function(name, value) {
        if (name == 'index') index = value
    });

    form.on('fileBegin', async function(name, file) {
 
        if(!index){
            return
        }

        try{
            file_ext = file.name.split(".").pop()
            image_name = "image" + index + "_" + id + "." + file_ext;

            file.path = path.resolve("./public/members_uploads/") + "/" + image_name

            filename = await image_name;
        }
        catch{
           return res.send({error: {error: "There is an error uploading property details, contact +2349017241037"}})
        } 
    });
    form.on('end', async function() {

        let p = path.resolve("./public/members_uploads/")
        var images = fs.readdirSync(p)
        
        if(!images?.length) res.send({error: "There is an error uploading property details, contact +2349017241037"})

        let prop_images =  []
        
        function uploader(n, cb){

            let path = `${p}/${images[n + 1]}`;
            try{
                cloudinary.uploader.upload(path, async result => {
                    let image_data = {
                        secure_url:result.secure_url,
                        name:result.original_filename,
                        format: result.format,
                        cloudinary_id: result.public_id
                    }
                    if(result.name || result.secure_url){
                        cb(null, result)
                        prop_images.push(image_data);
                    }else{
                        return cb("Error getting result")
                    } 

                })
            }
            catch (err){
                res.send({error :{error : "Unable to upload file, try again later"}});
            }
            finally{
                    fs.rm(path, data => {
                        return
                    })
            }
        }

        async.times(6, function(n, next) {
            uploader(n, function(err, result) {
            setTimeout(()=>{
                next(err, result);
            },100)
        });
        },function(err, results) {
            if(err)  return res.status(404).send({error: "No connection or Poor connection: code 404"});
            
            var p  = path.resolve("./public/members_uploads/");
            var images = fs.readdirSync(p)
        
            if(images?.length){
                if(images.length > 1){
                    images.forEach(el => {
                        let path = `${p}/${el}`;
                        fs.rmSync(path)
                    })
                }
            }

            if(prop_images.length >= 6){       
                updateProperty(data, prop_images, ({error, success})=>{
                    res.send(error ?? success);
                })
            }else{
                res.send({error: "No connection or Poor connection"})  
            }
        });
    });

    form.on('error', function () {
        res.end('Something went wrong on ther server side. Your file may not have yet uploaded.');
    });
    
})

//This are the set of the post request
router.post('/getProperties',(req,res,next)=>{
    const data = req.body;
    let text = data.search_text.replace(/[\s]/g,"+");
    let url = "/explore?search_text="+text+"&type="+data.type
    res.redirect(`${url}`);
})


//------ getting results that match what user is typing ---------
router.post('/matched/properties',(req,res,next)=>{
    const data = req.body

    getProperties(data,({propGroup, not_found})=>{
        if(not_found){
            res.json({not_found})
        }else{
            res.json(propGroup)
        }
        res.end();
    })
})
//using passport to authethicate user login details if its correct
// then log in member if login details is correct
router.post('/member/login',(req,res,next)=>{
 
    passport.authenticate('localSignin', {
        successRedirect: '/membership/dashboard',
        failureRedirect: '/membership/login',
        failureFlash:true,
        failureMessage:req.flash('data',req.body)
    })(req,res,next)
});

router.post('/property/upload',async (req,res,next)=>{
    
    const user = req.session?.passport?.user

    if(!user){
        return res.send({error: "Refresh the page"})
    }

    var form = new formidable.IncomingForm();
	let index, data
    id = uuidv4();

    form.parse(req, (err, field , files)=>{
        data = field

    });

    form.on('field', function(name, value) {
        if (name == 'index') index = value
    });

    form.on('fileBegin', async function(name, file) {

        if(!index) return

        try{
            file_ext = file.name.split(".").pop()
            image_name = "image" + index + "_" + id + "." + file_ext;

            p = path.resolve("./public/members_uploads/");
        
            file.path = p + "/" + image_name

            filename = await image_name;
        }
        catch (err){
            res.send({error: "There is an error uploading property details, contact +2349017241037"})
        } 
    });

    form.on('end', async function() {
        var p  = path.resolve("./public/members_uploads/");
        var images = fs.readdirSync(p)
        
        if(!images?.length) return res.status(404).send({error: "There is an error uploading property details, contact +2349017241037"}).end()

        let prop_images =  []
        
        function uploader(n, cb){
            let path = `${p}/${images[n + 1]}`;
            try{
                cloudinary.uploader.upload(path, async result => {
                    let image_data = {
                        secure_url:result.secure_url,
                        name:result.original_filename,
                        format: result.format,
                        cloudinary_id: result.public_id
                    }
                     if(result.name || result.secure_url){
                        cb(null, result)
                        prop_images.push(image_data)
                     }else{
                         return cb("Error getting result")
                     } 

                })
            }
            catch (err){
                return res.send({error : "Unable to upload file, try again later"});
            }
            finally{
                    fs.rm(path, data => {
                        return
                    })
            }
        }

        async.times(6, function(n, next) {
            uploader(n, function(err, result) {
            setTimeout(()=>{
                next(err, result);
            },100)
        });
        },function(err, results) {
            if(err)  return res.status(404).send({error: "No connection or Poor connection: code 404"})
            
            var p = path.resolve('./public/members_uploads/')
            var images = fs.readdirSync(p)
        
            if(images?.length){
                if(images.length > 1){
                    images.forEach(el => {
                        let path = `${p}/${el}`;
                        fs.rmSync(path)
                    })
                }
            }

            if(prop_images.length >= 6){
                upload({data, prop_images},({error, success})=>{
                    res.send(error ?? success)
                })
            }else{
                res.send({error: "No connection or Poor connection"}).end() 
                return 
            }
        });
    });

    form.on('error', function () {
        res.end('Something went wrong on ther server side. Your file may not have yet uploaded.');
    });
})


// ------ Privacy policy gettter -------
router.get('/privacy-policy',(req,res)=>{
    res.render('privacy-policy',{title : "The Kingdom Estate - Privacy Policy"});
})

//----------- Terms of services response ----------
router.get('/terms-of-services',(req,res)=>{
    res.render('services',{title: "The Kingdom Estate : Terms Of Services"});
})

router.get("/page/error",(req,res)=>{
    res.render("error_page")
})

router.get('/membership/delete',(req,res)=>{
    const user = req.session?.passport?.user
    if(!user) return res.redirect('/page/error');

    deleteUser(user,({error, success})=>{
        if(!error){
            req.flash("success","TheKingdomproperties will miss you, while not contact us to tell us why you terminate your account ")
            res.redirect("/membership/login");
            res.end();
            return;
        }
    })
})
//logging out user session
router.get('/logout',(req,res,next)=>{

    var user = req.session?.passport?.user ?? null
    if(!user){
        return res.status(404).redirect('/page/error')
    }
    
    req.logOut();
    req.flash('success',"You are logout successfully")
    res.redirect('/membership/login');

})


//if url is not found
router.get("*",(req,res,next)=>{
    res.status(404).redirect('/page/error');
})

module.exports = router;
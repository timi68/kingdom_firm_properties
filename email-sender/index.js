const nodemailer = require('nodemailer'),
hbs = require('nodemailer-express-handlebars'),
dotenv = require('dotenv'),
{v4:uuidv4} = require('uuid'),
fs = require('fs'),
jwt = require('jsonwebtoken');

dotenv.config();

const emailCode = (email, name, code, cb) =>{ 
        const tran = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: "true",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASS
            }
        })

        let mail = {
            from: "oderindejames02@gmail.com",
            to: email,
            subject: "Email verification Code",
            html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The kingdom Estate</title>
    <style>
        body{
            font-family:calibri;
            font-weight:500;
            display:grid;
            place-items: center;
            height:100vh;
        }
        .container{
            background:lightgrey;
            border-radius: 5px;
            padding:50px 20px;
        }
        a{
            padding:10px 20px;
            color:white;
            background:rgb(52, 54, 54);
            font-weight:500;
            text-decoration: none;
            font-size:medium;
            border-radius: 50px;
        }
        p{
            font-size:medium
        }

        .link-wrapper{
            text-align: center;
            margin-top:50px
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="wrapper">
            <header class="header">
                <h1>The Kingdom Properties</h1>
            </header>
            <div class="body">
                <div class="text-wrapper">
                    <h3>Hello ${name} </h3>
                    <p>We found out that you requested for verification code for your email. This your verification code below.</p>                     
                </div>
                <div class="link-wrapper">
                        <h3>Kindly copy the code below to verify your email, so you wont be stopped from uploading properties</h3>
                        <div class="code_text">
                            <div class="text">
                                code : <h3>${code}</h3>
                            </div>
                        </div>  
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
        }

        tran.sendMail(mail, (err, info)=>{
            
            if(err){
                return cb({error: "Server error Login we will verify your email later" });
            }else{                
                return cb({success : "An email has been sent to your email address get it"})
            }
        })
}


const emailLink = ({email, name, id}, cb) =>{

    let key = uuidv4().substr(0, 15);

    const user = {
        id,
        email
    };
    jwt.sign({user}, key, {expiresIn: "1200s"}, (err, token)=>{
        if(err){  return cb("Unable to sign token: at Email sender index.js:16");}
        
        const tran = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: "true",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASS
            }
        })

        let mail = {
            from: "oderindejames02@gmail.com",
            to: email,
            subject: "Email verification",
            html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The kingdom Estate</title>
    <style>
        body{
            font-family:calibri;
            font-weight:500;
            display:grid;
            place-items: center;
            height:100vh;
        }
        .container{
            background:lightgrey;
            border-radius: 5px;
            padding:50px 20px;
        }
        a{
            padding:10px 20px;
            color:white;
            background:rgb(52, 54, 54);
            font-weight:500;
            text-decoration: none;
            font-size:medium;
            border-radius: 50px;
        }
        p{
            font-size:medium
        }

        .link-wrapper{
            text-align: center;
            margin-top:50px
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="wrapper">
            <header class="header">
                <img src="../../public/images/house1.png" alt="">
                <h1>The Kingdom Properties</h1>
            </header>
            <div class="body">
                <div class="text-wrapper">
                    <h3>Hello ${name} </h3>
                    <p>We found out you registered on our site with this email account</p>                     
                </div>
                <div class="link-wrapper">
                        <h3>Kindly click the link below to verify your email, so you can able upload properties</h3>
                        <p> this link will expire after 20minutes</p>
                        <a 
                        href="https://thekingdomProperties.herokuapp.com/membership/email_verificator_neutral?token=${token}&key=${key}" class="linker">
                            Verify Email
                        </a>  
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
        }

        tran.sendMail(mail, (err, info)=>{
            
            if(err){
                return cb({error: "Server error Login we will verify your email later" });
            }else{                
                return cb({success : "An email has been sent to your email address get it"})
            }
        })
    
    })
    
}


const passwordChange = (email,name,id, cb) => {
    let key = uuidv4().substr(0, 15)
    const user = {
        email,
        name
    }

    jwt.sign({user}, key, {expiresIn: "1200s"}, (err, token)=>{
        if(err){ return cb("Unable to sign token: at Email sender index.js:16");}
        
        const tran = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: "true",
            auth:{
                user:process.env.EMAIL,
                pass:process.env.PASS
            }
        })

        let mail = {
            from: "oderindejames02@gmail.com",
            to: email,
            subject: "Change Password",
            html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The kingdom Estate</title>
    <style>
        body{
            font-family:calibri;
            font-weight:500;
            display:grid;
            place-items: center;
            height:100vh;
        }
        .container{
            background:lightgrey;
            border-radius: 5px;
            padding:50px 20px;
        }
        a{
            padding:7px 20px;
            color:blue;
            background:#fff;
            box-shodow:0px 3px 6px grey;
            font-weight:600;
            text-decoration: none;
            font-size:medium;
            border-radius: 50px;
        }
        p{
            font-size:medium
        }

        .link-wrapper{
            text-align: center;
            margin-top:50px
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="wrapper">
            <header class="header">
                <h1>This is from the kingdom Estate</h1>
            </header>
            <div class="body">
                <div class="link-wrapper">
                        <div class="text-wrapper">

                            <h3>You can also click the link below to change password</h3>
                            <p> this link will expire after 20minutes</p>
                        </div>
                        <a 
                        href="https://thekingdomrealestate.herokuapp.com/membership/password_changer?token=${token}&key=${key}&id=${id}" class="linker">
                        Change password
                        </a>  
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
        }

        tran.sendMail(mail, (err, info)=>{
            if(err){
                return cb({error: "Internal Server Error: 404, Contact +2349017241037" });
            }else{                
                return cb({success : "Email has been sent successfully to your email"})
            }
        })
    
    })
}

module.exports = {emailLink, emailCode, passwordChange};
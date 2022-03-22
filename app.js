const express = require('express'),
bodyParse = require('body-parser'),
routes = require('./routes'),
cors = require('cors'),
node = require('nodemailer'),
dotnv = require('dotenv'),
nodemailer = require('nodemailer'),
hbs = require('nodemailer-express-handlebars'),
flash = require('connect-flash'),
session = require('express-session'),
passport = require('passport'),
app = express(),
fs =require("fs"),
server = require('http').Server(app);

dotnv.config();
app.use(express.static('public'));
app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json());
app.use(express.json());
app.use(cors())


// setting view engine
app.set('view engine','ejs');


// setting external assests
app.use(session({
    secret:"nothing jare",
    resave:true,
    saveUninitialized:true
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash())


app.use((req,res,next)=>{
    res.locals.error = req.flash('error');
    res.locals.data = req.flash('data');
    res.locals.success = req.flash('success')
    res.locals.verified = req.flash('verified')
    next();
})

app.use("/",routes)

PORT = process.env.PORT || 8000;

server.listen(PORT,()=>{
    console.log("Listening on Port: https://localhost:8000");
})

const mongoose = require('mongoose'),
dotenv = require('dotenv');

dotenv.config();

let connect = process.env.CONNECT;

mongoose.connect(`${connect}`,{
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useFindAndModify: true

},(err, connected)=>{
    if(err){
        console.log("Mongodbunable  to connect");
    }else{
        console.log('connected');
    }
})


const schema1 = new mongoose.Schema({
    firstname : String,
    lastname : String,
    email : String,
    password : String,
    number: String,
    verified: Boolean,
    codeE: Number,
    member_image:String,
    last_login:String,
    current_login:String,
    total_uploads:Number
},{
    collection: "members_auth"
})
const schema2 = new mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    up_id: {
        type: String,
        required: true
    },
    up_name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    negotiable: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    lga:{
        type: String,
        required: true
    },
    address:{
        type:String,
        required:false
    },
    date_posted: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    prop_images: {
        type: JSON,
        required: true
    }

},{
    collection: "members_uploads"
})

const member_auth = mongoose.model("member_auth", schema1);
const member_uploads = mongoose.model("member_uploads", schema2)

module.exports = {member_auth, member_uploads};
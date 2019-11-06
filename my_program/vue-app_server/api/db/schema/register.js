const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const registerSchema = new Schema({
       nickname:String,
       password:String,
       Repassword:String,
       phoneNumber:String,
       email:String,
       isLogin:{
               type:Number,
               default:0
       }
})
mongoose.model('registers',registerSchema)
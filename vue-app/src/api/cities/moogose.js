const  mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/City')
const db = mongoose.connection;
db.on('error' ,()=>{
  console.log('连接失败')
})
db.once('open',function (){
  console.log('连接成功')
})
const CitySchema = mongoose.Schema({
       name:{
         type:String,
         default:'南京'
       }


})
var City = mongoose.model('City','CitySchema')
// module.exports = City
export  {City}

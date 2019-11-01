const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let cityName = Schema.Types.String;
// let  cityId = Schema.Types.ObjectId
const citySchema = new Schema({
        city:{
                type:String,default:'南京'
        },
 CityName :{
        type:[String],
        // index:true,
        default:[]
 },
//  CityId :cityId

})
mongoose.model('City',citySchema)

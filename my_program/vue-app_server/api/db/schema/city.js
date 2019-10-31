const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let cityName = Schema.Types.String;
// let  cityId = Schema.Types.ObjectId
const citySchema = new Schema({
 CityName :{
         index:true,
         unique:true,
         type:cityName
 },
//  CityId :cityId

})
mongoose.model('City',citySchema)

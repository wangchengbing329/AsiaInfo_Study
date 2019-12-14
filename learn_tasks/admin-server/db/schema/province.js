const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const provinceSchema = new Schema({
        name: {
                type:String,
                default: '北京'
        },
        value: Number
},{
        collection: 'provinces'
})
mongoose.model('Provinces',provinceSchema)
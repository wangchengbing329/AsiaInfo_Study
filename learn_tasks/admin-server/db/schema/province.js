const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const provinceSchema = new Schema({
        ProID: Schema.Types.String,
        name: Schema.Types.String,
        ProSort: Schema.Types.String,
        ProRemark: Schema.Types.String
},{
        collection: 'provinces'
})
mongoose.model('Provinces',provinceSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
        role:Schema.Types.String,
        tel:Schema.Types.String,
        account:Schema.Types.String,
        pass:Schema.Types.String
})
mongoose.model('users',userSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phonenumber: {
        type: Number,
        unique: true,
        default: '00000'
    },
    location: {
        type: String
    }
});
module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fareSchema = new Schema({
    perKm: {
        type: Number,
        required: true,
        unique: true
    },
    admin: {
        type: String,
        required: true,
    }
});
module.exports = mongoose.model('admin-fare', fareSchema);
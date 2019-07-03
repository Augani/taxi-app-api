const mongoose = require('mongoose');
import Location from './location'
const Schema = mongoose.Schema;
const rideSchema = new Schema({
    driver: {
        type: String,
        required: true
    },
    rider: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    from: Location,
    to: Location,
    distance:{
        type: string
    },
    fare: {
        type: Number
    },
    paidBy: {
        required: true
    }
});
module.exports = mongoose.model('Ride', rideSchema);
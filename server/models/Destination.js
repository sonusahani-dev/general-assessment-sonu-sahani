const mongoose = require('mongoose');
const DestinationSchema = new mongoose.Schema({
    name:String,
    country:String,
    description:String,
    coordinates:{
        lat:Number,
        lng:Number
    }
}, {strict: false});
module.exports = mongoose.model('Destination',DestinationSchema);
const mongoose = require('mongoose');
const HotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    star: { type: Number, required: true, min: 1, max: 5 },
    rating: { type: Number, min: 0, max: 5 },
    priceFrom: { type: Number, required: true},
    roomType:[{
        name:{ type: String, required: true },
        price:{ type: Number, required: true },
        facilities:[String],
    }],
    nearByAttractions: [{
    name:String,
    distance:String
    }],
    photo:[{url: String}],
    destination:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Destination',
        required: true
    }
}, {strict: false})
module.exports = mongoose.model('Hotel',HotelSchema)

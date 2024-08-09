const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    pricePerDay: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    imageUrl: { 
        type: String,
        required: true,
    },
    description: { 
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;

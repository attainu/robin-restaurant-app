const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must have min 4 characters and max 50 characters'],
        min: 4,
        max: 50,
        unique: [true, 'name already exists'],
        trim: true

    },
    maxOrder: {
        type: Number,
        //required: [true, 'Enter max items a person can order at one time']
    },

    category: {
        type: String,
        required: [true, 'Please specify category'],
        min: 2,
        max: 20,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'price must be number'],
        min: 1,
        max: 1000,

    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 20,
    },
    ratingQuantity: {
        type: Number,
        default: 0,
        select: false  //hode from user
    },
    Discout: {
        type: Number
    },
    discription: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('MENU', menuSchema);
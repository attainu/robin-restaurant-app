const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'enter your first name and lastname'],
        min: 4,
        max: 50
    },
    email: {
        type: String,
        required: [true, 'enter your email'],
        min: 4,
        max: 50
    },
    phone_number: {
        type: String,
        required: [true, 'enter your phone number'],
        min: [10, 'please enter a valid number'],
        max: [12, 'please enter a valid number'],
    },
    password : {
        type:String,
        required: [true, 'enter the Password'],
        min: [6, 'enter password with minimum 6 characters'],
        max: [10, 'Password should not exceed 10 characters']
    },
    type : {
        type:String,
        required: [true, 'enter User Type']
    }
});
module.exports = mongoose.model('USERS', userSchema);
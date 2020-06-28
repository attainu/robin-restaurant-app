const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs'); //for hashing password
//const userRouter = require('../routes/users');

const userSchema = new mongoose.Schema({


    name: {
        type: String,
        required: [true, 'enter your first name and lastname'],
        min: 4,
        max: 50
    },
    email: {
        type: String,
        unique: [true, 'email already exists'],
        required: [true, 'enter your email'],
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email'],
        min: 4,
        max: 50
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {   //name  email password  passwordConfirm  phone_number
        type: String,
        require: true,
        min: 6,
        select: false //wont display password the passord
    },
    passwordConfirm: {
        type: String,
        require: [true, 'please confirm password'],
        validate: {
            //only works on save/create--not on upadte 
            validator: function (el) {
                return el === this.password
            },
            message: 'password don not match'
        }
    },
    passwordREsetToken: String,
    passwordREsetExpires: Date,

    phone_number: {
        type: String,
        required: [true, 'enter your phone number'],
        min: [10, 'please enter a valid number'],
        max: [12, 'please enter a valid number'],
    }
});

//password encryption with bcrypt to protect against burute force attacks

userSchema.pre('save', async function (next) {
    //only run this fn if password is modified
    if (this.isModified('password')) return next();
    //hash the password
    this.password = await bcrypt.hash(this.password, 12);
    //delete confirmpassword--dnt send to database
    this.passwordConfirm = undefined
    next();

});

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

//reset and forgot password
userSchema.methods.createPasswordToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');

    //hash for security
    this.passwordResetToken =
        crypto.createHash('Sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;

}


module.exports = mongoose.model('USERS', userSchema);
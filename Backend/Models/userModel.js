const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Enter Your Name'],
        maxlength: [30, 'Name cannot exceed 30 Characters.'],
        minlength: [5, 'Name should be atleast 5 Characters.']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email addresss']
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your Password'],
        minlength: [8, 'Password should be greater than 8 Characters.'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpired: Date,
});

// Hashing Password before saving into DB
userSchema.pre("save", async function (next) {

    /* When we will update a user then this password will be saved again as hashed password,
    that we dont want to, becuase password is already hashed so we will not make hashed password again as hashed, 
    that's why we are using here an if condition
    */
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// JWT TOken
userSchema.methods.getJWTToken = function () {
    return JWT.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

// Compare Passwords while Login
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { Console } = require('console')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Pleas enter your email'],
        maxlength: [30, 'Your email cannot exceed 30 characters'],
        unique: [true, 'Email exit'],
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})


//Encrypt pasword before savign user
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

//Return JWT token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

//compare Password
userSchema.methods.comparePassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
}

//Generate password reset token
userSchema.methods.getResetPasswordToken = function(){
    //Generato token
    const resettoken = crypto.randomBytes(20).toString('hex')

    //Hash and set to restePasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resettoken).digest('hex')
    
    //Set toen expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resettoken
}

module.exports = mongoose.model('user', userSchema)



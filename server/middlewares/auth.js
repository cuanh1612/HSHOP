const User = require('../models/user')

const catchAsyncErrors = require('./catchAsyncErrors')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
const sendToken = require('../utils/jwtToken')

exports.isAuthenticateUser = catchAsyncErrors(async (req, res, next) => {
    const {token} = req.cookies
    console.log(req.cookies);
    
    if(!token) {
        const err = new Error('Login first to access this resource')
        err.statusCode = 401
        return next(err)
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id)
    next()
})

//Handing users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            const err = new Error(`Role ${req.user.role} is not allowed to access this resource`)
            err.statusCode = 403
            next(err)
        }

        next()
    }
}




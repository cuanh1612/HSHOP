const User = require('../models/user')

const sendToken = require('../utils/jwtToken')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const cloudinary = require('cloudinary')

//Register a user => /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: 'scale'
    })

    const {name, email, password } = req.body

    const user = await User.create({
        name, 
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })

    sendToken(user, 200, res)
})

//Login User =? /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body
    
    //Check if email and password is entered by user
    if(!email || !password){
        const err = new Error('Please enter email & password')
        err.statusCode = 400
        return next(err)
    }

    //Finding user in database
    const user = await User.findOne({email}).select('+password')

    if(!user){
        const err = new Error('Invalid Email or Password')
        err.statusCode = 401
        return next(err)
    }

    //Check of password is correct or not
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        const err = new Error('Invalid Email or Password')
        err.statusCode = 401
        return next(err)
    }

    sendToken(user, 200, res)
})

//Logout user => /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

//Forgot Password =>/api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email})

    if(!user){
        const err = new Error("User not found with this email")
        err.statusCode = 404
        return next(err)
    }

    //Get reset token
    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforSave: false})

    //Create reset password url
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try {
        
        await sendEmail({
            email: user.email,
            subject: `HSHOP Password Recovery`,
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save({validateBeforSave: false})

        const err = new Error(error.message)
        err.statusCode = 500
        return next(err)
    }
})

//Reset Password =>/api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    const user = await User.findOne({ 
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()}
    })

    if(!user){
        const err = new Error("Password reset token is invalid or has been expired")
        err.statusCode = 400
        return next(err)
    }

    if(req.body.password !== req.body.confirmPassword) {
        const err = new Error("Password does not match")
        err.statusCode = 401
        return next(err)
    }

    //setup new password 
    user.password = req.body.password

    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save()

    sendToken(user, 200, res)
})

//Get curently logged in user details => /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    res.status(200).json({
        success: true,
        user
    })
})


//Update / Change password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next)=>{
    const user = await User.findById(req.user.id).select('+password')

    //Check previous user paassword
    const isMAtched = await user.comparePassword(req.body.oldPassword)

    if(!isMAtched){
        const err = new Error('Old password is incorrect')
        err.statusCode(404)
        return next(err)
    }

    user.password = req.body.password
    await user.save()

    sendToken(user, 200, res)
})

//Update user profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    //Update avatar
    if(req.body.avatar !== ''){
        const user = await User.findById(req.user.id)

        const image_id = user.avatar.public_id

        const res = await cloudinary.v2.uploader.destroy(image_id)

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        })

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

//Get all user => /api/v1/admin/users
exports.allUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find()
    
    res.status(200).json({
        success: true,
        users
    })
})

//Get user details => /api/v1/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if(!user){
        const err = new Error(`User does not found with id: ${req.params.id}`)
        err.statusCode = 400
        return next(err)
    }

    res.status(200).json({
        success: true,
        user
    })
})


//Update user for admin => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res, next)=>{
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

//Delete user => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if(!user){
        const err = new Error(`User does not found with id: ${req.params.id}`)
        err.statusCode = 400
        return next(err)
    }

    //Remove avatar from cloudinary 
    const image_id = user.avatar.public_id
    await cloudinary.v2.uploader.destroy(image_id)

    await user.remove()

    res.status(200).json({
        success: true,
    })
})

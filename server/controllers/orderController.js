const Order = require('../models/order')
const Product = require('../models/product')

const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

//Create a new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body

    const order = await Order.create({
        orderItems,
        shippingInfo,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})

//Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(!order){
        const err = new Error('No order found with thid ID')
        err.statusCode = 404
        return next(err)
    }

    res.status(200).json({
        success: true,
        order
    })
})

//Get logged in user order => /api/v1/orders/me
exports.myOders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find({user: req.user.id})

    res.status(200).json({
        success: true,
        orders
    })
})

//Get all order - ADMIN => /api/v1/admin/orders
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
    const orders = await Order.find()

    let totalAmount = 0

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

//Update / Process order - ADMIN => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(order.orderStatus === 'Delivered'){
        const err = new Error('You have already delivered this order')
        err.statusCode = 400
        return next(err)
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity)
    })

    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()

    await order.save()

    res.status(200).json({
        success: true,
        order
    })
})

async function updateStock(id, quantity){
    const product = await Product.findById(id)

    product.stock = product.stock - quantity

    await product.save({validateBeforSave: false})
}

//Delete order - ADMIN => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findById(req.params.id)

    if(!order){
        const err = new Error('No order found with thid ID')
        err.statusCode = 404
        return next(err)
    }

    await order.remove()

    res.status(200).json({
        success: true
    })
})


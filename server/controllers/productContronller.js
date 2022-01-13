const product = require('../models/product')
const Product = require('../models/product')

const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const apiFeature = require('../utils/apiFeatures')
const cloundinary = require('cloudinary')

//Create new product => /api/v1/pruduct/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    let imagesLinks = []

    for (let i = 0; i < images.length; i++) {
        const result = await cloundinary.v2.uploader.upload(images[i], {
            folder: 'products'
        })

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks
    req.body.user = req.user.id

    const product = await Product.create(req.body)

    res.status(200).json({
        success: true,
        product
    })
})

// Get all products => /api/v1/products?keyword=...&...
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 8

    const productsCount = await Product.countDocuments()

    const apifeatures = new apiFeature(Product, req.query)
        .search().filter()

    let products = await apifeatures.query
    let filteredProductsCount = products.length

    const apifeaturesPagination = new apiFeature(Product, req.query)
        .search().filter().pagination(resPerPage)
    products = await apifeaturesPagination.query

    res.status(200).json({
        success: true,
        productsCount,
        filteredProductsCount,
        products,
        resPerPage
    })
})

// Get all products (admin) => /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find()

    res.status(200).json({
        success: true,
        products
    })
})

// Get single product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        const err = new Error('Product not found')
        err.statusCode = 404
        return next(err)
    }

    res.status(200).json({
        success: true,
        product
    })
})

// Update product => /api/v1/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        const err = new Error('Product not found')
        err.statusCode = 404
        return next(err)
    }

    //Handle image--
    let images = []
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images
    }

    if (images !== undefined) {
        //Deleting images associated with the producId
        for (let i = 0; i < product.images.length; i++) {
            const result = await cloundinary.v2.uploader.destroy(product.images[i].public_id)
        }

        let imagesLinks = []

        for (let i = 0; i < images.length; i++) {
            const result = await cloundinary.v2.uploader.upload(images[i], {
                folder: 'products'
            })

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks
    }

    //Handle image--

    const productUpdate = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        productUpdate
    })
})

// Delete Product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        const err = new Error('Product not found')
        err.statusCode = 404
        return next(err)
    }

    //Deleting images associated with the producId
    for (let i = 0; i < product.images.length; i++) {
        const result = await cloundinary.v2.uploader.destroy(product.images[i].public_id)
    }

    await product.remove()

    res.status(200).json({
        success: true,
        message: 'Product is deleted'
    })
})

//Create new review => /api/v1/review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId)

    const isReviewed = product.reviews.find(r => {
        return (r.user.toString() === req.user._id.toString())
    }
    )

    if (isReviewed) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment
                review.rating = rating
            }
        })
    } else {
        product.reviews.push(review)
        product.numOfReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })
})

//Get Pruduct reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id)

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//delete Pruduct review => /api/v1/reviews?productId=...&id=...
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId)

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString())

    const numOfReviews = reviews.length

    const ratings = (reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length) || 0

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})
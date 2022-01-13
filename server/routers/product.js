const express = require('express')
const { models } = require('mongoose')
const router = express.Router()

const {
    getProducts, 
    getAdminProducts,
    newProduct, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct,
    createProductReview,
    getProductReviews,
    deleteReview
} = require('../controllers/productContronller')

const {isAuthenticateUser, authorizeRoles} = require('../middlewares/auth')

router.route('/products').get(getProducts)
router.route('/admin/products').get(getAdminProducts)

router.route('/product/:id').get(getSingleProduct)
                            .put(isAuthenticateUser, authorizeRoles("admin"),updateProduct)
                            .delete(isAuthenticateUser, authorizeRoles("admin"),deleteProduct)

router.route('/product/new').post(isAuthenticateUser, authorizeRoles("admin"),newProduct)

router.route('/review').put(isAuthenticateUser, createProductReview)
router.route('/reviews').get(isAuthenticateUser, getProductReviews)
router.route('/reviews').delete(isAuthenticateUser, deleteReview)

module.exports = router
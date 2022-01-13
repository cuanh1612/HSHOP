import React, { useEffect as UseEffect, useRef as UseRef, useState as UseState } from 'react'
import { Carousel } from 'react-bootstrap'

import Loader from '../layouts/loader'
import Metadata from '../layouts/MetaData'
import ListReviews from '../review/ListReviews'

import { useDispatch as UseDispatch, useSelector as UseSelector } from 'react-redux'
import { getProductDetails, clearError, newReview } from '../../actions/productActions'
import { addItemTocart } from '../../actions/cartActions'

import { useAlert as UseAlert } from 'react-alert'

import ReactStars from "react-rating-stars-component"
import { NEW_REVIEW_RESET } from '../../constants/productConstants'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function productDetails({ match }) {
    const [quantity, setQuantity] = UseState(1)
    const [rating, setRating] = UseState(0)
    const [comment, setComment] = UseState('')

    const dispatch = UseDispatch()
    const alert = UseAlert()

    const { loading, error, product } = UseSelector(state => state.productDetails)
    const { user } = UseSelector(state => state.auth)
    const { error: reviewError, success } = UseSelector(state => state.NewReview)

    const [nav1, setNav1] = UseState(null)
    const [nav2, setNav2] = UseState(null)

    UseEffect(() => {
        if (error) {
            alert.error(error)
        }

        if (reviewError) {
            alert.error(reviewError)
        }

        if (success) {
            alert.success('Review posted successfully')
            dispatch({
                type: NEW_REVIEW_RESET
            })
        }

        dispatch(getProductDetails(match.params.id))
    }, [dispatch, alert, error, reviewError, match.params.id, success])

    const configRating = {
        size: 20,
        count: 5,
        value: product.ratings,
        a11y: true,
        isHalf: true,
        emptyIcon: <i className="far fa-star" />,
        halfIcon: <i className="fa fa-star-half-alt" />,
        filledIcon: <i className="fa fa-star" />,
        edit: false,
    };

    const increaseQty = () => {
        const count = document.querySelector('.count')

        if (Number(count.innerHTML) >= product.stock) return

        const qty = Number(count.innerHTML) + 1
        setQuantity(qty)
    }

    const decreaseQty = () => {
        const count = document.querySelector('.count')

        if (Number(count.innerHTML) <= 1) return

        const qty = Number(count.innerHTML) - 1
        setQuantity(qty)
    }

    const addToCart = () => {
        dispatch(addItemTocart(match.params.id, quantity))
        alert.success('Item Added to Cart')
    }

    function setUserRatings() {
        const stars = document.querySelectorAll('.star')

        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings)
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('orange')

                        setRating(Number(this.starValue))
                    } else {
                        star.classList.remove('orange')
                    }
                }
                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('yellow')
                    } else {
                        star.classList.remove('yellow')
                    }
                }
                if (e.type === 'mouseout') {
                    star.classList.remove('yellow')
                }
            })
        }
    }

    const reviewHandler = () => {
        const formData = new FormData()
        formData.set('rating', rating)
        formData.set('comment', comment)
        formData.set('productId', match.params.id)

        dispatch(newReview(formData))
    }

    return (
        <>
            {loading ? (<Loader />) : (
                <>
                    <Metadata title={product.name} />
                    <div className='container grid grid-cols-1 gap-10 p-0 px-5 py-5 md:grid-cols-2 max-w-1000'>
                        <div>
                            <Slider
                                asNavFor={nav2}
                                ref={slider => setNav1(slider)}
                                className="mb-3 border-2"
                            >
                                {product.images && product.images.map(image => {
                                    return (
                                        <img className='object-cover object-center cursor-pointer d-block w-100 max-h-96 min-h-96' key={image.public_id} src={image.url} alt="sdf" height={500} width={500} />
                                    )
                                })}
                            </Slider>


                            <Slider
                                asNavFor={nav1}
                                ref={slider => setNav2(slider)}
                                slidesToShow={3}
                                swipeToSlide={true}
                                focusOnSelect={true}
                            >
                                {product.images && product.images.map(image => {
                                    return (
                                        <img className='object-cover cursor-pointer d-block w-100 max-h-28 min-h-28' key={image.public_id} src={image.url} alt="sdf" height={500} width={500} />
                                    )
                                })}
                            </Slider>
                        </div>



                        <div className='space-y-6'>
                            <p className={
                                product.stock > 0 ? 'px-3 py-2 text-sm font-semibold uppercase bg-gray-200 rounded-md rounded-m w-max' : 'px-3 py-2 text-sm font-semibold uppercase bg-red-500 rounded-md rounded-m w-max text-white'
                            }>{product.stock > 0 ? `In stock` : `Out stock`}</p>
                            <div>
                                <p className='mb-2 text-2xl font-semibold'>{product.name}</p>
                                <p>Product # {product._id}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ReactStars {...configRating} />
                                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                            </div>
                            <p className='text-justify'>{product.description}</p>
                            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
                            <div className='flex justify-between pb-3'>
                                <div className='flex-1 space-y-3 w-max'>
                                    <p className='text-gray-400 uppercase'>quantity</p>
                                    <div className='flex px-2 py-1 border border-gray-400 w-max'>
                                        <button className='border-none outline-none focus:border-none focus:outline-none' onClick={decreaseQty}>-</button>
                                        <p className='px-8 count'>{quantity}</p>
                                        <button className='border-none outline-none focus:border-none focus:outline-none' onClick={increaseQty}>+</button>
                                    </div>
                                </div>
                                <div className='space-y-3 '>
                                    <p className='text-gray-400 uppercase'>Price</p>
                                    <p className='text-2xl'>$<span>{product.price}</span></p>
                                </div>
                            </div>

                            <div className='space-y-6'>
                                <button className='w-full py-2 text-white bg-gray-900 rounded-md shadow-md hover:bg-gray-800' disabled={product.stock <= 0 ? true : false} onClick={addToCart}>Add to cart</button>
                                {
                                    user ? <button className='w-full py-2 text-gray-900 border-2 border-gray-900 rounded-md shadow-md' data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>Submit your review</button>
                                        : <div className='mt-5 alert alert-danger' type='alert'>Login to post your review.</div>
                                }
                            </div>
                        </div>
                    </div>




                    {product.reviews && product.reviews.length > 0 && (
                        <ListReviews reviews={product.reviews} />
                    )}


                    <div className="h-0 mt-2 mb-5 overflow-auto row">
                        <div className="rating w-50">
                            <div className="modal fade" id="ratingModal" tabIndex={-1} role="dialog" aria-labelledby="ratingModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="ratingModalLabel">Submit Review</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <ul className="stars">
                                                <li className="star"><i className="fa fa-star" /></li>
                                                <li className="star"><i className="fa fa-star" /></li>
                                                <li className="star"><i className="fa fa-star" /></li>
                                                <li className="star"><i className="fa fa-star" /></li>
                                                <li className="star"><i className="fa fa-star" /></li>
                                            </ul>
                                            <textarea name="review" id="review" className="mt-3 form-control" defaultValue={comment} onChange={(e) => setComment(e.target.value)} />
                                            <button onClick={reviewHandler} className="float-right px-2 py-2 mt-3 text-white bg-gray-900 rounded-md shadow-md hover:bg-gray-800" data-dismiss="modal" aria-label="Close">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

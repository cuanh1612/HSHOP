import React, { useEffect } from 'react'

import MetaData from '../layouts/MetaData'
import { useAlert } from 'react-alert'

import { useDispatch, useSelector } from 'react-redux'
import { removeLocalStorage } from '../../actions/cartActions'
import CheckoutStep from './CheckoutStep'

import { createOrder, clearErrors } from '../../actions/orderActions'

import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'

import axios from 'axios'

const options = {
    style: {
        base: {
            color: "white",
            "::placeholder": {
                color: "white"
            },
            fontSize: "20px"
            // "w-full px-0 text-2xl font-semibold text-white bg-blue-300 border-0 focus:outline-none"
        },
        invalid: {
            color: 'tomato'
        }
    }
}

const Payment = ({ history }) => {
    const alert = useAlert()
    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { error } = useSelector(state => state.newOrder)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors)
        }
    }, [dispatch, alert, error])

    const order = {
        orderItems: cartItems,
        shippingInfo
    }

    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice
        order.shippingPrice = orderInfo.shippingPrice
        order.taxPrice = orderInfo.taxPrice
        order.totalPrice = orderInfo.totalPrice
    }

    //Handler payment
    const submitHandler = async (e) => {
        e.preventDefault()

        document.querySelector('#pay_btn').disabled = true

        let res

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            res = await axios.post(process.env.REACT_APP_URL_SERVER + '/api/v1/payment/process', paymentData, config)

            const clientSecret = res.data.client_secret

            if (!stripe || !elements) {
                return
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email
                    }
                }
            })

            if (result.error) {
                alert.error(result.error.message)
                document.querySelector('#pay_btn').disabled = false
            } else {
                //the payment is processed or not
                if (result.paymentIntent.status === 'succeeded') {

                    //To do New order------------------------
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    }
                    dispatch(createOrder(order))
                    //To do New order------------------------

                    //Delete cart in localstorage
                    dispatch(removeLocalStorage())

                    history.push('/success')
                } else {
                    alert.error('There is some issue while payment processing')
                }
            }

        } catch (error) {
            document.querySelector('#pay_btn').disabled = false
            console.log(error)
        }
    }

    return (
        <>
            <MetaData title={'Shipping Info'} />
            <CheckoutStep shipping confirmOrder payment />

            <div className="relative flex justify-center w-full py-5">
                <div className="relative grid max-w-xl overflow-hidden border rounded-lg w-4/4 md:w-2/4">
                    <div className="relative col-span-3 px-6 py-4 lg:col-span-2 xl:col-span-1">
                        <form onSubmit={submitHandler}>
                            <div className="flex items-center">
                                <div className="w-2 h-2 p-2 mr-2 rounded-full bg-gradient-to-tr from-blue-300 to-blue-600"></div>
                                <h2 className="text-sm font-extrabold">HSHOP</h2>
                            </div>
                            <h1 className="text-3xl font-extrabold py-7">Shipping Info</h1>
                            <div className="relative px-3 py-3 bg-gray-900 border rounded-md shadow h-60 min-w-96">
                                <i class="fab fa-cc-visa text-white text-4xl"></i>
                                <div className="absolute bottom-0 left-0 w-full px-3 py-3">
                                    <CardNumberElement options={options} type="text" id="card_num_field" className="w-full px-0 mb-8 font-semibold bg-gray-900 border-0 focus:outline-none" />
                                    <div className="flex justify-between">
                                        <CardCvcElement options={options} id="card_cvc_field" type="text" className="w-full px-0 mr-3 text-lg font-semibold text-white bg-gray-900 border-0 focus:outline-none" />
                                        <CardExpiryElement options={options} id="card_exp_field" type="text" className="w-20 px-0 text-lg font-semibold text-white bg-gray-900 border-0 focus:outline-none min-w-20" />
                                    </div>
                                </div>
                            </div>
                            <button id="pay_btn" type="submit" className="w-full py-2 mt-6 text-lg font-semibold text-white transition-all duration-100 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-900">Pay{` - $${orderInfo && orderInfo.totalPrice}`}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Payment
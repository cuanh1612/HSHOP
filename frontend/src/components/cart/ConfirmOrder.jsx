import React from 'react'
import { countries } from 'countries-list'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'

import { useSelector } from 'react-redux'
import CheckoutStep from './CheckoutStep'

const ConfirmOrder = ({ history }) => {
    const { cartItems, shippingInfo } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)

    //Calculate Order Price
    const itemsPrice = cartItems.reduce((acc, item) => (acc + item.price * item.quantity), 0)
    const shippingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)

    const processToPayment = () => {
        const data = {
            itemPrice: itemsPrice.toFixed(2),
            shippingPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/payment')
    }
    return (
        <>
            <MetaData title={'Confirm Order'} />
            <CheckoutStep shipping confirmOrder />

            <>
                <div className="w-full bg-white">
                    <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                            <div className="col-span-1 space-y-4 lg:col-span-2">
                                <h1 className="mb-2 text-2xl font-semibold">Your Infor:</h1>
                                <hr className="mb-2" />
                                <div className="px-3 py-3 space-y-3 bg-gray-50">
                                    <div className="flex">
                                        <p className="w-20 font-semibold min-w-20">Name:</p>
                                        <p>{user && user.name}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="w-20 font-semibold min-w-20">Phone:</p>
                                        <p>{shippingInfo.phoneNo}</p>
                                    </div>
                                    <div className="flex">
                                        <p className="w-20 font-semibold min-w-20">Address:</p>
                                        <p>{`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}</p>
                                    </div>
                                </div>
                                <hr className="mt-3" />


                                <h1 className="mb-2 text-2xl font-semibold">Your Cart Items:</h1>
                                <hr className="mb-2" />
                                {cartItems.map(item => (
                                    <div key={item.product} className="flex items-center px-3 py-3 space-x-10 bg-gray-50">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="object-cover object-center w-16 h-16 md:w-14 md:h-14"
                                        />
                                        <div className="grid w-full h-full grid-cols-2 gap-5">
                                            <Link to={`/product/${item.product}`} style={{ textDecoration: "none" }}>
                                                <div className="font-semibold">{item.name}</div>
                                            </Link>
                                            <div>{item.quantity} x ${item.price} = <span className="font-semibold text-red-500">${(item.quantity * item.price).toFixed(2)}</span></div>
                                        </div>
                                    </div>
                                ))}
                                <hr className="mt-3" />



                            </div>
                            <div className="col-span-1 px-3 py-3 space-y-3 rounded-lg shadow h-72">
                                <p className="font-semibold">Order Summary</p>
                                <hr />
                                <div className="flex justify-between">
                                    <p className="font-semibold">
                                        Subtotal:
                                    </p>
                                    <p className="font-medium">
                                        ${itemsPrice}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-semibold">
                                        Shipping:
                                    </p>
                                    <p className="font-medium">
                                        ${shippingPrice}
                                    </p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-semibold">
                                        Tax:
                                    </p>
                                    <p className="font-medium">
                                        ${taxPrice}
                                    </p>
                                </div>
                                <hr />
                                <div className="flex justify-between">
                                    <p className="font-semibold">
                                        Total:
                                    </p>
                                    <p className="font-medium text-red-500">
                                        ${totalPrice}
                                    </p>
                                </div>
                                <hr />
                                <button onClick={processToPayment} className="w-full py-2 text-white transition duration-150 bg-gray-800 rounded-lg hover:bg-gray-900">
                                    Proceed to Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default ConfirmOrder

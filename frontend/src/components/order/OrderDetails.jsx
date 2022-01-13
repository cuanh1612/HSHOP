import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/loader'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, clearErrors } from '../../actions/orderActions'


export const OrderDetails = ({ match }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, order } = useSelector(state => state.orderDetails)
    console.log('huy',order);
    let shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus
    if(order){
        shippingInfo = order.shippingInfo
        orderItems = order.orderItems
        paymentInfo = order.paymentInfo
        user = order.user
        totalPrice = order.totalPrice
        orderStatus = order.orderStatus
    }

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, match.params.id])

    const shippingDetails = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true:false
    return (
        <>
            <MetaData title={'Order Details'} />

            {loading ? <Loader /> : (
                <>
                    <div className="container container-fluid">
                        <div className="row d-flex justify-content-between">
                            <div className="mt-5 col-12 col-lg-8 order-details">
                                <h1 className="my-5">Order # {order._id}</h1>
                                <h4 className="mb-4">Shipping Info</h4>
                                <p><b>Name:</b> {user && user.name}</p>
                                <p><b>Phone:</b>{shippingInfo && shippingInfo.phoneNo}</p>
                                <p className="mb-4"><b>Address:</b>{shippingDetails}</p>
                                <p><b>Amount:</b> ${totalPrice}</p>
                                <hr />
                                <h4 className="my-4">Payment</h4>
                                <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>
                                <h4 className="my-4">Order Status:</h4>
                                <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"}>
                                    <b>{orderStatus}</b>
                                </p>
                                <h4 className="my-4">Order Items:</h4>
                                <hr />
                                <div className="my-1 cart-item">
                                    {orderItems && orderItems.map(item => (
                                        <div key={item.product} className="my-5 row">
                                            <div className="col-4 col-lg-2">
                                                <img src={item.image} alt={item.name} height={45} width={65} />
                                            </div>
                                            <div className="col-5 col-lg-5">
                                                <Link to={`/products/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div className="mt-4 col-4 col-lg-2 mt-lg-0">
                                                <p>${item.price}</p>
                                            </div>
                                            <div className="mt-4 col-4 col-lg-3 mt-lg-0">
                                                <p>{item.quantity} Piece(s)</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default OrderDetails

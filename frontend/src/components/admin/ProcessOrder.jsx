import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, updateOrder } from '../../actions/orderActions'
import { UPDATE_ORDER_RESET, CLEAR_ERRORS } from '../../constants/orderConstants'

export default function ProcessOrder({ match }) {
    const [status, setStatus] = useState('')

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, order } = useSelector(state => state.orderDetails)
    const { shippingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order || ''
    const { error, isUpdated } = useSelector(state => state.order)

    const orderId = match.params.id

    useEffect(() => {
        dispatch(getOrderDetails(orderId))

        if (error) {
            alert.error(error)
            dispatch({
                type: CLEAR_ERRORS
            })
        }

        if (isUpdated) {
            alert.success('Order updated successfully')
            dispatch({
                type: UPDATE_ORDER_RESET
            })
        }
    }, [dispatch, alert, error, isUpdated, orderId])


    const updateOrderHandler = (id) => {
        const formData = new FormData()
        formData.set('status', status)

        dispatch(updateOrder(id, formData))
    }

    const shippingDetail = shippingInfo && `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalcode}, ${shippingInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false
    return (
        <>
            <MetaData title={`Process Order # ${order && order._id} Orders`} />
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>

                <div className='col-12 col-md-10'>
                    <>
                        {
                            loading ? <Loader /> : (
                                <div className="row d-flex justify-content-around">
                                    <div className="col-12 col-lg-7 order-details">
                                        <h1 className="my-5">Order # {order && order._id}</h1>
                                        <h4 className="mb-4">Shipping Info</h4>
                                        <p><b>Name:</b> {user && user.name}</p>
                                        <p><b>Phone:</b> {shippingInfo && shippingInfo.phoneNo}</p>
                                        <p className="mb-4"><b>Address:</b>{shippingDetail && shippingDetail}</p>
                                        <p><b>Amount:</b> ${totalPrice && totalPrice.toFixed(2)}</p>
                                        <hr />

                                        <h4 className="my-4">Payment</h4>
                                        <p className={isPaid ? "greenColor" : "redColor"}><b>{isPaid ? "PAID" : "NOT PAID"}</b></p>

                                        <h4 className="my-4">Stripe ID</h4>
                                        <p><b>{paymentInfo && paymentInfo.id}</b></p>

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
                                    <div className="mt-5 col-12 col-lg-3">
                                        <h4 className="my-4">Status</h4>
                                        <div className="form-group">
                                            <select className="form-control" name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </div>
                                        <button className="btn btn-primary btn-block" onClick={()=>updateOrderHandler(order._id)}>
                                            Update Status
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </>
                </div>
            </div>
        </>
    )
}


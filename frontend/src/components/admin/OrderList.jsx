import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/loader'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, clearErrors, deleteOrder } from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/orderConstants'

const OrderList = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, orders } = useSelector(state => state.AllOrders)
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {

        dispatch(allOrders())
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        console.log(isDeleted)
        if (isDeleted) {
            alert.success('Order deleted successfully')
            history.push('/admin/orders')
            dispatch({ type: DELETE_ORDER_RESET })
        }
    }, [dispatch, alert, error, isDeleted, history])

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'No of Items',
                    field: 'numofItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numofItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                    <>
                        <Link to={`/admin/order/${order._id}`} className="px-2 py-1 btn btn-primary">
                            <i className="fas fa-eye"></i>
                        </Link>
                        <button className="px-2 py-1 ml-2 btn btn-danger" onClick={() => deleteOrderHandler(order._id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </>
            })
        })

        return data
    }

    return (
        <>
            <MetaData title={"All Orders"} />
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>

                <div className='col-12 col-md-10'>
                    <>
                        <h1 className='my-5'>All Orders</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </>
                </div>
            </div>
        </>
    );
}

export default OrderList;

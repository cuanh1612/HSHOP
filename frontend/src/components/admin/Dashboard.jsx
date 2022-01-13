import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'
import Loader from '../layouts/loader'

import { useDispatch, useSelector } from 'react-redux'

import { getAdminProduct } from '../../actions/productActions'
import { allOrders } from '../../actions/orderActions'
import { allUsers } from '../../actions/userActions'

const Dashboard = () => {

    const dispatch = useDispatch()
    const { products } = useSelector(state => state.products)
    const { orders, totalAmount, loading } = useSelector(state => state.AllOrders)
    const { users } = useSelector(state => state.allUsers)

    let outOfStock = 0

    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1
        }
    })

    useEffect(() => {
        dispatch(getAdminProduct())
        dispatch(allOrders())
        dispatch(allUsers())
    }, [dispatch])

    return (
        <>
            <div className='row'>
                <div className='col-12 col-md-2'>
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>

                    {loading ? <Loader /> : (
                        <>
                            <MetaData title={'Admin dashboard'} />
                            <div className="pr-4 row">
                                <div className="mb-3 col-xl-12 col-sm-12">
                                    <div className="text-white card bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Amount<br /> <b>${totalAmount && totalAmount.toFixed(2)}</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pr-4 row">
                                <div className="mb-3 col-xl-3 col-sm-6">
                                    <div className="text-white card bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Products<br /> <b>{products && products.length}</b></div>
                                        </div>
                                        <Link className="clearfix text-white card-footer small z-1" to="/admin/products">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="mb-3 col-xl-3 col-sm-6">
                                    <div className="text-white card bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Orders<br /> <b>{orders && orders.length}</b></div>
                                        </div>
                                        <Link className="clearfix text-white card-footer small z-1" to="/admin/orders">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="mb-3 col-xl-3 col-sm-6">
                                    <div className="text-white card bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>{users && users.length}</b></div>
                                        </div>
                                        <Link className="clearfix text-white card-footer small z-1" to="/admin/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                                <div className="mb-3 col-xl-3 col-sm-6">
                                    <div className="text-white card bg-warning o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Out of Stock<br /> <b>{outOfStock}</b></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </>
    )
}

export default Dashboard
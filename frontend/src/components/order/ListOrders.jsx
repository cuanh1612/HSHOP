import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {MDBDataTable} from 'mdbreact'
 
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/loader'

import {useAlert} from 'react-alert'
import {useDispatch, useSelector} from 'react-redux'
import {myOrders, clearErrors} from '../../actions/orderActions'

const ListOrders = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const {loading, error, orders} = useSelector(state=>state.myOrder)

    useEffect(() =>{
        
        dispatch(myOrders())
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error])

    const setOrder = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num of item',
                    field: 'numOfItems',
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
                    sort: 'asc'
                }
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{color:'green'}}>{order.orderStatus}</p>
                    : <p style={{color:'red'}}>{order.orderStatus}</p>,
                actions:
                <Link to={`/order/${order._id}`} className="btn btn-primary">
                    <i className="fa fa-eye"></i>
                </Link>
                
            })
        })

        return data
    }

    return (
        <>
            <MetaData title = {'My Order'}/>

            <h1 className="mt-5">Ny Order</h1>

            {
                loading? <Loader/> : (
                    <MDBDataTable
                        data={setOrder()}
                        className="px-3"
                        bordered
                        striped
                        hover
                    />
                )
            }
        </>
    )
}

export default ListOrders

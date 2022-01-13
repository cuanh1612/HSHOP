import React from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'

const OrderSuccess = () => {
    return (
        <>
            <MetaData title={'Order Success'} />
            <div className="container container-fluid">
                <div className="row justify-content-center">
                    <div className="mt-5 text-center col-6">
                        <img className="mx-auto my-5 img-fluid d-block" src="https://freepngimg.com/thumb/success/6-2-success-png-image.png" alt="Order Success" width={200} height={200} />
                        <h2>Your Order has been placed successfully.</h2>
                        <Link to="/orders/me">Go to Orders</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderSuccess

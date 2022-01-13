import React from 'react'
import { Link } from 'react-router-dom'

const CheckoutStep = ({ shipping, confirmOrder, payment }) => {
    return (
        <div className="flex justify-center w-full mt-5">
            {
                shipping ? (!confirmOrder ? <Link to='#!' className='float-right' style={{ textDecoration: "none" }}>
                    <div className="flex items-center px-2 py-2 space-x-2 font-semibold border-b-2 border-blue-400">
                        <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-400 rounded-full">
                            <i class="fas fa-shipping-fast"></i>
                        </div>
                        <p>Shipping</p>
                        <div className="w-2 border border-blue-400"></div>
                    </div>
                </Link> : <Link to='/shipping' disabled style={{ textDecoration: "none" }}>
                    <div className="flex items-center px-2 py-2 space-x-2 font-semibold border-b-2 border-blue-400">
                        <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-400 rounded-full">
                            <i class="fas fa-check"></i>
                        </div>
                        <p>Shipping</p>
                        <div className="w-2 border border-blue-400"></div>
                    </div>
                </Link>)
                    : (
                        <Link to='#!' className='float-right' style={{ textDecoration: "none" }}>
                            <div className="flex items-center px-2 py-2 space-x-2 font-semibold">
                                <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-400 rounded-full">
                                    <i class="fas fa-shipping-fast"></i>
                                </div>
                                <p>Shipping</p>
                                <div className="w-2 border border-blue-400"></div>
                            </div>
                        </Link>
                    )
            }

            {
                confirmOrder ? (!payment ? <Link to='#!' className='float-right' style={{ textDecoration: "none" }}>
                    <div className="flex items-center px-2 py-2 space-x-2 font-semibold border-b-2 border-blue-400">
                        <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-400 rounded-full">
                            <i class="fas fa-clipboard-check"></i>
                        </div>
                        <p>Confirm</p>
                        <div className="w-2 border border-blue-400"></div>
                    </div>
                </Link> : <Link to='/orders/confirm' disabled style={{ textDecoration: "none" }}>
                    <div className="flex items-center px-2 py-2 space-x-2 font-semibold border-b-2 border-blue-400">
                        <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-400 rounded-full">
                            <i class="fas fa-check"></i>
                        </div>
                        <p>Confirm</p>
                        <div className="w-2 border border-blue-400"></div>
                    </div>
                </Link>)
                    : (
                        <Link to='#!' className='float-right' style={{ textDecoration: "none" }}>
                            <div className="flex items-center px-2 py-2 space-x-2 font-semibold">
                                <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-400 rounded-full">
                                    <i class="fas fa-clipboard-check"></i>
                                </div>
                                <p>Confirm</p>
                                <div className="w-2 border border-blue-400"></div>
                            </div>
                        </Link>
                    )
            }


            {
                !payment ? <Link to='#!' className='float-right' style={{ textDecoration: "none" }}>
                    <div className="flex items-center px-2 py-2 space-x-2 font-semibold ">
                        <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-400 rounded-full">
                            <i class="fas fa-shopping-basket"></i>
                        </div>
                        <p>Payment</p>
                    </div>
                </Link> : <Link to='/payment' className='float-right' style={{ textDecoration: "none" }}>
                    <div className="flex items-center px-2 py-2 space-x-2 font-semibold border-b-2 border-blue-400">
                        <div className="flex items-center justify-center w-10 h-10 text-white bg-blue-400 rounded-full">
                            <i class="fas fa-shopping-basket"></i>
                        </div>
                        <p>Payment</p>
                    </div>
                </Link>
            }
        </div>
    )
}

export default CheckoutStep
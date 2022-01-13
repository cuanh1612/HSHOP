import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItemTocart, removeItemFromCart } from '../../actions/cartActions'
import EmpatyCart from '../Other/EmpatyCart'


const Cart = ({ history }) => {
    const dispatch = useDispatch()

    const { cartItems } = useSelector(state => state.cart)

    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const increaseQty = (id, quantity, stock) => {
        const newQty = quantity + 1

        if (newQty > stock) return

        dispatch(addItemTocart(id, newQty))
    }

    const decreaseQty = (id, quantity) => {
        const newQty = quantity - 1

        if (newQty <= 0) return

        dispatch(addItemTocart(id, newQty))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <>
            {cartItems.length === 0 ? <EmpatyCart/> : (
                <>
                    <div className="w-full bg-white">
                        <div className="max-w-2xl px-4 py-16 mx-auto sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                            <h1 className="mb-2 text-2xl font-semibold">Your Cart: {cartItems.length} item(s)</h1>
                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                                <div className="col-span-1 space-y-4 lg:col-span-2">
                                    <hr className="mb-2" />
                                    {cartItems.map(item => (
                                        <div key={item.product} className="flex items-center px-3 py-3 space-x-10 bg-gray-50">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="object-cover object-center w-16 h-16 md:w-14 md:h-14"
                                            />
                                            <div className="grid w-full h-full grid-cols-2 gap-5 lg:grid-cols-4 md:grid-cols-3">
                                                <Link to={`/product/${item.product}`} style={{textDecoration: "none"}}>
                                                    <div className="font-semibold">{item.name}</div>
                                                </Link>
                                                <div className="font-semibold text-red-500">${item.price}</div>
                                                <div className="flex items-center space-x-3">
                                                    <button className="bg-gray-200 rounded-sm h-7 w-7 hover:bg-gray-300 focus:outline-none" onClick={() => decreaseQty(item.product, item.quantity)}>-</button>
                                                    <p>{item.quantity}</p>
                                                    <button className="bg-gray-200 rounded-sm h-7 w-7 hover:bg-gray-300 focus:outline-none" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</button>
                                                </div>
                                                <div>
                                                    <i id="delete_cart_item" className="fa fa-trash btn btn-danger h-7" onClick={() => removeCartItemHandler(item.product)} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <hr className="mt-3" />
                                </div>
                                <div className="col-span-1 px-3 py-3 space-y-3 rounded-lg shadow h-52">
                                    <p className="font-semibold">Order Summary</p>
                                    <hr />
                                    <div className="flex justify-between">
                                        <p className="font-semibold">
                                            Subtotal:
                                        </p>
                                        <p className="font-medium">
                                            {cartItems.reduce((acc, item) => (acc + Number(item.quantity)), 0)} (Units)
                                        </p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="font-semibold">
                                            Est. Total:
                                        </p>
                                        <p className="font-medium text-red-500">
                                            ${cartItems.reduce((acc, item) => (acc + (Number(item.quantity) * item.price)), 0).toFixed(2)}
                                        </p>
                                    </div>
                                    <hr />
                                    <button onClick={checkoutHandler} className="w-full py-2 text-white transition duration-150 bg-gray-800 rounded-lg hover:bg-gray-900">
                                        Check out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>









                    {/* <div className="container container-fluid">
                        <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
                        <div className="row d-flex justify-content-between">
                            <div className="col-12 col-lg-8">

                                {cartItems.map(item => (
                                    <>
                                        <hr />
                                        <div key={item.product} className="cart-item">
                                            <div className="row">
                                                <div className="col-4 col-lg-3">
                                                    <img src={item.image} alt="Laptop" height={90} width={115} />
                                                </div>
                                                <div className="col-5 col-lg-3">
                                                    <Link to={`/products/${item.product}`}>{item.name}</Link>
                                                </div>
                                                <div className="mt-4 col-4 col-lg-2 mt-lg-0">
                                                    <p id="card_item_price">${item.price}</p>
                                                </div>

                                                
                                                <div className="mt-4 col-4 col-lg-3 mt-lg-0">
                                                    <div className="stockCounter d-inline">
                                                        <span className="btn btn-danger minus" onClick={() => decreaseQty(item.product, item.quantity)}>-</span>
                                                        <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />
                                                        <span className="btn btn-primary plus" onClick={() => increaseQty(item.product, item.quantity, item.stock)}>+</span>
                                                    </div>
                                                </div>
                                                <div className="mt-4 col-4 col-lg-1 mt-lg-0">
                                                    <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={()=>removeCartItemHandler(item.product)} />
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </>
                                ))}
                            </div>
                            <div className="my-4 col-12 col-lg-3">
                                <div id="order_summary">
                                    <h4>Order Summary</h4>
                                    <hr />
                                    <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc+ Number(item.quantity)), 0)} (Units)</span></p>
                                    <p>Est. total: <span className="order-summary-values">${cartItems.reduce((acc, item) => (acc+ (Number(item.quantity) * item.price)), 0).toFixed(2)}</span></p>
                                    <hr />
                                    <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Check out</button>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </>
            )}
        </>
    )
}

export default Cart
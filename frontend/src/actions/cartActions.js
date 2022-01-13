import {ADD_TO_CARD, REMOVE_ITEM_CART, SAVE_SHIPPING_INFOR, RESET_ITEM_CART} from '../constants/cartConstants'
import axios from 'axios'

export const addItemTocart = (id, quantity) => async (dispatch, getstate) => {
    const {data} = await axios.get(process.env.REACT_APP_URL_SERVER + `/api/v1/product/${id}`)

    dispatch({
        type: ADD_TO_CARD,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getstate().cart.cartItems))
}

export const removeItemFromCart = (id) => async (dispatch, getstate) => {

    dispatch({
        type: REMOVE_ITEM_CART,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getstate().cart.cartItems))
}

export const removeLocalStorage = () => async (dispatch, getstate) => {

    dispatch({
        type: RESET_ITEM_CART
    })

    localStorage.setItem('cartItems', JSON.stringify(getstate().cart.cartItems))
}


export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFOR,
        payload: data
    })

    localStorage.setItem('shippingInfo', JSON.stringify(data))
}



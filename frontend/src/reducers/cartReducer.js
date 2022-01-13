import {
    ADD_TO_CARD, 
    REMOVE_ITEM_CART, 
    SAVE_SHIPPING_INFOR,
    RESET_ITEM_CART} 
from '../constants/cartConstants'

export const cartReducer = (state = {cartItems: [], shippingInfo: {}}, action) =>{
    switch (action.type) {
        case ADD_TO_CARD:
            const item = action.payload

            const isItemExist = state.cartItems.find(i => i.product === item.product)

            if(isItemExist){
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === isItemExist.product ? item : i)
                }
            }else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        
        case REMOVE_ITEM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(i=> i.product !== action.payload)
            }

        case SAVE_SHIPPING_INFOR:
            return {
                ...state,
                shippingInfo: action.payload
            }
        case RESET_ITEM_CART:
            return {
                ...state,
                cartItems: []
            }
        default:
            return state
    }
}
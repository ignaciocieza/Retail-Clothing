import {
    TOGGLE_MENU_HIDDEN,
    TOGGLE_MENU_HIDDEN_TRUE,
    ADD_ITEM,
    CLEAR_ITEM_FROM_CART,
    REMOVE_ITEM,
    CLEAR_CART,
    SET_CART_FROM_FIREBASE,
} from '../actions/typeActions';
import {
    addItemToCart,
    clearItem,
    removeItemFromCart
} from './helperFunctions';

const INITIAL_STATE = {
    hidden: true,
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TOGGLE_MENU_HIDDEN:
            return ({
                ...state,
                hidden: !state.hidden
            })
        case TOGGLE_MENU_HIDDEN_TRUE:
            return ({
                ...state,
                hidden: true
            })
        case ADD_ITEM:
            return ({
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            })
        case CLEAR_ITEM_FROM_CART:
            return ({
                ...state,
                cartItems: clearItem(state.cartItems, action.payload)
            })
        case REMOVE_ITEM:
            return ({
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            });
        case CLEAR_CART:
            return ({
                ...state,
                cartItems: []
            });
        case SET_CART_FROM_FIREBASE:
            return ({
                ...state,
                cartItems: action.payload
            })
        default:
            return state;
    }
};

export default cartReducer;
import {
    TOGGLE_MENU_HIDDEN,
    TOGGLE_MENU_HIDDEN_TRUE,
    ADD_ITEM,
    CLEAR_ITEM_FROM_CART,
    REMOVE_ITEM,
    CLEAR_CART,
    SET_CART_FROM_FIREBASE,
    SHOW_TEXT,
    INIT_POINT,
    SET_DETAIL_ITEM
} from '../actions/typeActions';
import {
    addItemToCart,
    clearItem,
    removeItemFromCart
} from './helperFunctions';

const INITIAL_STATE = {
    hidden: true,
    cartItems: [],
    showText: false,
    initPoint: null,
    detailItem: null,
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
        case SHOW_TEXT:
            return ({
                ...state,
                showText: true
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
        case SET_DETAIL_ITEM:
            return ({
                ...state,
                detailItem: action.payload
            })
        case INIT_POINT:
            return ({
                ...state,
                initPoint: action.payload
            })
        default:
            return state;
    }
};

export default cartReducer;
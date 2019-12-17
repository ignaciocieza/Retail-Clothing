import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import {
    clearItemFromCart,
    addItem,
    removeItem
} from '../../../api/actions/indexActions';

import './checkoutItem.styles.scss';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
    const { name, imageUrl, price, quantity } = cartItem; // * Desestruct
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item' />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={() => removeItem(cartItem)}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={() => addItem(cartItem)}>
                    &#10095;
                </div>
            </span>
            <span className='price'>${price}</span>
            <div className='remove-button' onClick={() => clearItem(cartItem)}>
                &#10005;
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    clearItem: bindActionCreators(clearItemFromCart, dispatch),
    addItem: bindActionCreators(addItem, dispatch),
    removeItem: bindActionCreators(removeItem, dispatch)
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
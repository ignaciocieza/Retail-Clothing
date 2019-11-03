import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StripeButton from '../../widgets/stripe-button/StripeButton';
import CheckoutItem from '../../widgets/checkout-item/CheckoutItem';
import {
    selectCartItems,
    selectCartTotal
} from '../../../api/reducers/helperFunctions';
import './checkOut.styles.scss';

const CheckoutPage = ({ cartItems, total }) =>(
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {cartItems.map(cartItem => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
        <div className='total'>TOTAL: ${total}</div>
        <div className='test-warning'>
            *Please use the following test credit card for payments*
            <br />
            4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
        </div>
        <StripeButton price={total} />
    </div>
);

/**
 * Lo que hace el selector es traer una parte del store (la que se vaya a usar),
 * en vez de traer todo el store. De manera que se aumenta la performance.
 * Ademas dentro de estos selectores, se pueden realizar otras operaciones.
 * Los selectores, utilizan el clouser.
 */
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
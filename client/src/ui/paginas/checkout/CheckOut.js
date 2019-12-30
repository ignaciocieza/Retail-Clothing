import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import StripeButton from '../../widgets/stripe-button/StripeButton';
import MercadoPago from '../../widgets/mercado-pago/MercadoPago';
import CheckoutItem from '../../widgets/checkout-item/CheckoutItem';
import {
    selectCartItems,
    selectCartTotal,
    selectCurrentUser
} from '../../../api/reducers/helperFunctions';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import './checkOut.styles.scss';

const CheckoutPage = ({ cartItems, total, currentUser }) => (
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
        <div className='total'> TOTAL: ${total}</div>
        {/* <div className='test-warning'>
            *Please use the following test credit card for payments*
            <br />
            4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
        </div> */}
        {currentUser ?
            (
                <React.Fragment>
                    <div className='button'>
                        <StripeButton price={total} />
                    </div>
                    <MercadoPago />
                </React.Fragment>
            )
            :
            (<Tooltip title="You must Sign In to Pay" placement="top" arrow className='button'>
                <Button className='button'>Pay Now</Button>
            </Tooltip>)
        }
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
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(CheckoutPage);
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import CustomButton from '../custom-button/CustomButtom';
import CartItem from '../cart-item/CartItem';
import {
    toggleCartHidden
} from '../../../api/actions/indexActions';
import { selectCartItems } from '../../../api/reducers/helperFunctions'
import './cartDropDown.styles.scss';

const CartDropDown = ({ cartItems, history, toggleCartHidden }) => (
    <div className='cart-dropdown'>
        <div className='cart-items '>
            {cartItems.length ?
                cartItems.map((cartItem) => (
                    <CartItem key={cartItem.id} item={cartItem} />
                )) : <span className='empty-message'>Your cart is emmpty</span>
            }
        </div>
        <CustomButton
            onClick={() => {
                history.push('/checkout');
                toggleCartHidden();
            }}
        >
            Checkout
        </CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

const mapDispatchToProps = (dispatch) => ({
    toggleCartHidden: bindActionCreators(toggleCartHidden, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartDropDown));

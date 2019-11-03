import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { createStructuredSelector } from 'reselect';
import { ReactComponent as ShoppingIcon } from '../../../assets/shopping-bag.svg';
import {
    toggleCartHidden
} from '../../../api/actions/indexActions';
import {selectCartItemsCount} from '../../../api/reducers/helperFunctions';
import './cartIcon.styles.scss';


const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    toggleCartHidden: bindActionCreators(toggleCartHidden, dispatch)
})

const mapStateToProps =createStructuredSelector ({    
    itemCount: selectCartItemsCount
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
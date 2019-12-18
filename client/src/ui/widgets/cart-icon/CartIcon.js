import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { toggleMenuHiddenToTrue } from '../../../api/actions/indexActions';
import { selectCartItemsCount } from '../../../api/reducers/helperFunctions';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import './cartIcon.styles.scss';
import useStyles from './cartIcon.styles.js';

const CartIcon = ({ itemCount, history, toggleMenuHiddenToTrue }) => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.contentShadow}></div>
            <div className={classes.contentShadowTwo}></div>
            <div className={classes.footer}  >{
                itemCount > 0 ? (<div className={classes.bubleCart}>
                    <span className={classes.bubleCartText} >{itemCount}</span>
                </div>) : ""}
                <ShoppingCartIcon
                    className={classes.shoppingCartIcon}
                    onClick={() => {
                        history.push('/checkout');
                        toggleMenuHiddenToTrue()
                    }}
                />
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
});

const mapDispatchToProps = (dispatch) => ({
    toggleMenuHiddenToTrue: bindActionCreators(toggleMenuHiddenToTrue, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartIcon));
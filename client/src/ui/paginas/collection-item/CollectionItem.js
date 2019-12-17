import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Grid } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {
    addItem
} from '../../../api/actions/indexActions';
import useStyles from './collectionItem.styles';


const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;
    const classes = useStyles();

    return (
        <Grid item xs={6} md={3} className={classes.grid}>
            <div className={classes.imageContainer}>
                <AddShoppingCartIcon className={classes.addShoppingCartIcon} onClick={() => addItem(item)} />
                <img src={imageUrl} alt="No imagen" className={classes.image} />
                <div className={classes.bubleDescont}>
                    <span className={classes.bubleText} >-10</span>
                </div>
            </div>
            <span className={classes.textTitle}>{name}</span>
            <span className={classes.textPriceList}>${price}</span>
            <span className={classes.textPrice}>${price - (price*0.1)}</span>
        </Grid>
    );
};

const mapDispatchToProps = dispatch => ({
    addItem: bindActionCreators(addItem, dispatch),
});

export default connect(
    null,
    mapDispatchToProps
)(CollectionItem);
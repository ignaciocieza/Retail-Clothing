import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { createStructuredSelector } from 'reselect';
import { signOutStart, toggleMenuHidden } from '../../../api/actions/indexActions';
import { selectCurrentUser, selectCartHidden } from '../../../api/reducers/helperFunctions';
import { Button } from '@material-ui/core';
// import SearchIcon from '@material-ui/icons/Search';
import SearchBar from '../../widgets/search-bar/SearchBar';
import useStyles from './menuPhone.styles';

const MenuPhone = ({ signOutStart, currentUser, toggleMenuHidden }) => {
    const classes = useStyles();
    return (
            <div className={classes.content}>
                <div className={classes.contentShadow}></div>
                <div className={classes.searchIconContent}>
                    {/* <SearchIcon className={classes.searchIcon} /> */}
                    <SearchBar/>
                </div>
                <div className={classes.barraVerticalContent}>
                    <div className={classes.barraVertical}></div>
                </div>
                {
                    currentUser ? (
                        <Button
                            color="inherit"
                            className={classes.button}
                            onClick={() => {
                                signOutStart();
                                toggleMenuHidden();
                            }}
                        > SING OUT</Button>
                    ) : (
                            <Button color="inherit" className={classes.button} component={Link} to='/signin' onClick={toggleMenuHidden}> SING IN</Button>
                        )
                }
                <Button color="inherit" className={classes.button} component={Link} to='/shop/womens' onClick={toggleMenuHidden}>WOMEN</Button>
                <Button color="inherit" className={classes.button} component={Link} to='/shop/mens' onClick={toggleMenuHidden}>MEN</Button>
                <Button color="inherit" className={classes.button} component={Link} to='/shop/jackets' onClick={toggleMenuHidden}>JACKETS</Button>
                <Button color="inherit" className={classes.button} component={Link} to='/shop/sneakers' onClick={toggleMenuHidden}>SNEAKERS</Button>
                <Button color="inherit" className={classes.button} component={Link} to='/shop/hats' onClick={toggleMenuHidden}>HATS</Button>
                <Button color="inherit" className={classes.button} component={Link} to='/shop' onClick={toggleMenuHidden}>SHOP</Button>
            </div>      
    );
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = (dispatch) => ({
    signOutStart: bindActionCreators(signOutStart, dispatch),
    toggleMenuHidden: bindActionCreators(toggleMenuHidden, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuPhone);
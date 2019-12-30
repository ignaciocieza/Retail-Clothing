import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { createStructuredSelector } from 'reselect';
import Header from './Header';
import Main from './Main';
import {
    checkUserSession,
} from '../../api/actions/indexActions';
import {selectCartHidden} from '../../api/reducers/helperFunctions';
import CartIcon from '../widgets/cart-icon/CartIcon';
import AsideBar from '../widgets/aside-bar/AsideBar';
import SettingBar from '../widgets/setting-bar/SettingBar';
import './app.styles.css';

const App = ({ checkUserSession, hidden }) => {

    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    return (
        <div className={hidden ? '' : 'app-overflow'}>
            <Header />
            <SettingBar/>           
            <Main />
            <AsideBar/>
            <CartIcon/>
        </div >
    )
}

const mapStateToProps = createStructuredSelector({
    hidden: selectCartHidden
});

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: bindActionCreators(checkUserSession, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
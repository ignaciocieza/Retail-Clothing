import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Header from './Header';
import Main from './Main';
import {
    checkUserSession,
} from '../../api/actions/indexActions';
import CartIcon from '../widgets/cart-icon/CartIcon';
import AsideBar from '../widgets/aside-bar/AsideBar';
import SettingBar from '../widgets/setting-bar/SettingBar';
import './app.styles.css';

const App = ({ checkUserSession }) => {

    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    return (
        <div className='app'>
            <Header />
            <SettingBar/>           
            <Main />
            <AsideBar/>
            <CartIcon/>
        </div >
    )
}

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: bindActionCreators(checkUserSession, dispatch)
})

export default connect(null, mapDispatchToProps)(App);
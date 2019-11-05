import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import Header from './Header';
import Main from './Main';
import {
    checkUserSession,
} from '../../api/actions/indexActions';
import './app.styles.css';
//import {GlobalStyle} from './global.styles';


const App = ({ checkUserSession }) => {

    //unsubscribeFromAuth = null;

    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    //!!!!un vez que se suben los datos, ya no es necesario tenerla.
    //collectionArray.map-> devuelvo un nuevo array con los campos que se quieren pasar a la base de datos
    //addCollectionAndDocuments('collections',collectionArray.map(({title,items})=>({title,items})));

    //Cierra la sesion de google antes de cerrar la aplicacion.
    // componentWillUnmount() {
    //     this.unsubscribeFromAuth();
    // }

    return (
        <React.Fragment>
            {/* <GlobalStyle /> */}
            <Header />
            <Main />
        </React.Fragment>
    )

}
//!!!!un vez que se suben los datos, ya no es necesario tenerla.
// const mapStateToProps = createStructuredSelector({
//     collectionArray: selectCollectionForPreview
// });

const mapDispatchToProps = (dispatch) => ({
    checkUserSession: bindActionCreators(checkUserSession, dispatch)
})

export default connect(null, mapDispatchToProps)(App);
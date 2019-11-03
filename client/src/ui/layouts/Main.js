import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { createStructuredSelector } from 'reselect';
import HomePage from '../paginas/home-page/HomePage';
import SignInAndSignUpPage from '../paginas/sign-in-and-sign-up/SignInAndSignUpPage';
import CheckOut from '../paginas/checkout/CheckOut';
import CollectionOverviewContainer from '../paginas/collections-overview/CollectionOverviewContainer';
import CollectionContainer from '../paginas/collection/CollectionContainer';
import {
  selectCurrentUser
} from '../../api/reducers/helperFunctions';
import {
  fetchCollectionsStart
} from '../../api/actions/indexActions';
import './main.styles.css';


const Main = ({ fetchCollectionsStart }) => {

  useEffect(()=>{ //(*notas: Hooks)
    fetchCollectionsStart();
  },[fetchCollectionsStart]); //--> se add "fetchCollectionsStart", vez de dejarlo vacio, para evitar warning

  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/shop' component={CollectionOverviewContainer} />
        )} />
          <Route path={`/shop/:collectionId`} component={CollectionContainer} />
        )} />
          <Route exact path='/checkout' component={CheckOut} />
        <Route exact path='/signin' render={() => {
          return (
            this.props.currentUser ?
              (<Redirect to='/' />) :
              (<SignInAndSignUpPage />)
          )
        }}
        />
      </Switch>
    </React.Fragment>
  );
}
/**
 * Nota: "render" -> invoca a una funcion (como si fuese un evento)
 */
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: bindActionCreators(fetchCollectionsStart, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);

import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { createStructuredSelector } from 'reselect';
import {
  selectCurrentUser
} from '../../api/reducers/helperFunctions';
import {
  fetchCollectionsStart
} from '../../api/actions/indexActions';
import Spinner from '../widgets/with-spinner/Spinner';
import ErrorBoundary from '../widgets/error-boundary/ErrorBoundary';

//importar bibliotecas de manera dinámica (*performance)
const HomePage = lazy(() => import('../paginas/home-page/HomePage'));
const SignInAndSignUpPage = lazy(() => import('../paginas/sign-in-and-sign-up/SignInAndSignUpPage'));
const CheckOut = lazy(() => import('../paginas/checkout/CheckOut'));
const CollectionOverviewContainer = lazy(() => import('../paginas/collections-overview/CollectionOverviewContainer'));
const CollectionContainer = lazy(() => import('../paginas/collection/CollectionContainer'));
const MenuPhone = lazy(() => import('../paginas/menu-phone/MenuPhone'));
const SearchPage = lazy(() => import('../paginas/search-page/SearchPage'));
//

const Main = ({ fetchCollectionsStart, currentUser }) => {

  useEffect(() => { //(*notas: Hooks)
    fetchCollectionsStart();
  }, [fetchCollectionsStart]); //--> se add "fetchCollectionsStart", vez de dejarlo vacio, para evitar warning

  return (
    <React.Fragment>
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />
            {/* <Route exact path='/' component={Swipeable} /> */}
            <Route exact path='/search' component={SearchPage} />
            <Route exact path='/shop' component={CollectionOverviewContainer} />
            <Route path={`/shop/:collectionId`} component={CollectionContainer} />
            <Route exact path='/checkout' component={CheckOut} />
            <Route exact path='/menu' component={MenuPhone} />
            <Route exact path='/signin' render={() => {
              return (
                currentUser ?
                  (<Redirect to='/' />) :
                  (<SignInAndSignUpPage />)
              )
            }}
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: bindActionCreators(fetchCollectionsStart, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);

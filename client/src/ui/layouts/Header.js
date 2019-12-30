import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectCartHidden } from '../../api/reducers/helperFunctions';
import { signOutStart, toggleMenuHidden, setInitPoint } from '../../api/actions/indexActions';
import { AppBar, CssBaseline, IconButton, Button, Toolbar, Hidden, Grow } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import LocalPlayIcon from '@material-ui/icons/LocalPlay';
import SearchBar from '../widgets/search-bar/SearchBar';
import useStyles from './headerStyles';
import MenuPhone from '../paginas/menu-phone/MenuPhone';

const Header = ({ currentUser, signOutStart, toggleMenuHidden, hidden, history, setInitPoint }) => {

  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.contentShadow}></div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar className={classes.appBar}>
          <Toolbar  >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              className={classes.menuButton}
              // component={Link}
              // to='/menu'
              onClick={toggleMenuHidden} //on cartReducer
            >
              <MenuIcon className={classes.menuIcon} />
              {/* <div color="inherit" className={classes.buttonIcon} >
                <Logo className={classes.logo} />                
              </div> */}
              <LocalPlayIcon className={classes.buttonIcon} />
            </IconButton>
            <Hidden smDown >
              <div className={classes.content}>
                {/* <Button color="inherit" className={classes.buttonIcon} component={Link} to='/' > */}
                {/* <Logo className={classes.logo}/> */}
                <LocalPlayIcon className={classes.buttonIcon} onClick={() => history.push("/")} />
                {/* </Button> */}
                <Button color="inherit" className={classes.button} component={Link} to='/shop/womens'>WOMEN</Button>
                <Button color="inherit" className={classes.button} component={Link} to='/shop/mens'>MEN</Button>
                <Button color="inherit" className={classes.button} component={Link} to='/shop/jackets'>JACKETS</Button>
                <Button color="inherit" className={classes.button} component={Link} to='/shop/sneakers'>SNEAKERS</Button>
                <Button color="inherit" className={classes.button} component={Link} to='/shop/hats'>HATS</Button>
                <Button color="inherit" className={classes.button} component={Link} to='/shop'>SHOP</Button>
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
                        setInitPoint(null);
                      }}
                    >
                      SING OUT
                    </Button>
                  ) : (
                      <Button color="inherit" className={classes.button} component={Link} to='/signin'> SING IN</Button>
                    )
                }
              </div>
              <div className={classes.searchIconContent}>
                {/* <SearchIcon className={classes.searchIcon} /> */}
                <SearchBar />
              </div>
            </Hidden>
          </Toolbar>
        </AppBar>
      </div >
      {/* {hidden ? "" : <MenuPhone />} */}
      <Grow in={!hidden} mountOnEnter unmountOnExit timeout={1000}>
        <MenuPhone />
      </Grow>
    </React.Fragment >
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: bindActionCreators(signOutStart, dispatch),
  toggleMenuHidden: bindActionCreators(toggleMenuHidden, dispatch),
  setInitPoint: bindActionCreators(setInitPoint, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));

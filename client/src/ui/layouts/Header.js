import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { createStructuredSelector } from 'reselect';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../widgets/cart-icon/CartIcon';
import CartDropDown from '../widgets/cart-dropdown/CartDropDown';
import {
  selectCartHidden,
  selectCurrentUser
} from '../../api/reducers/helperFunctions';
import { signOutStart } from '../../api/actions/indexActions';
import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionDiv
} from './headerStyles.js';


const Header = ({ currentUser, hidden,signOutStart }) => (
  <HeaderContainer>
    <LogoContainer as={Link} to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <OptionDiv as={Link} to='/shop'>
        SHOP
      </OptionDiv>
      <OptionDiv to='/shop'>
        CONTACT
      </OptionDiv>
      {currentUser ? (
        <OptionDiv onClick={signOutStart}>
          SING OUT
        </OptionDiv>
      ) : (
          <OptionDiv as={Link} to='/signin'>
            SING IN
        </OptionDiv>
        )
      }
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropDown />}
  </HeaderContainer>
);

/**
 * @param {Foma de desestructurar, un reducer combinado} param0 
 * { user: { currentUser }, cart: { hidden } }
 * 
 */// !!!"createStructuredSelector" -> evita repetir el 'state', ya que lo pasa automaticamente.

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: bindActionCreators(signOutStart, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React from 'react';
import './customButtom.styles.scss';

const CustomButtom = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (
  <button
    className={
      `${inverted ? 'google-sign-in' : ''} 
      ${isGoogleSignIn ? 'google-sing-in' : ''}
      custom-button`
      }
      {...otherProps}
  >
    {children}
  </button>
);

export default CustomButtom;

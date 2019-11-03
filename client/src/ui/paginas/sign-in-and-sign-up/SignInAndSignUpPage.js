import React from 'react';
import SignIn from '../../widgets/sign-in/SignIn';
import SignUp from '../../widgets/sign-up/SignUp';
import './signInAndSignUpPage.styles.scss';

const SignInAndSignUpPage = () => (
    <div className='sign-in-and-sign-up'>
        <SignIn />
        <SignUp />
    </div>
);

export default SignInAndSignUpPage;
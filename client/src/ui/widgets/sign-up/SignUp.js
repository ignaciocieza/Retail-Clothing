import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import FormInput from '../form-input/FormInput';
import CustomButton from '../custom-button/CustomButtom';
import { signUpStart } from '../../../api/actions/indexActions';
import './signUp.styles.scss';

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { displayName, email, password, confirmPassword } = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;//corta el evento
        }

        signUpStart({ displayName, email, password });
    };

    const handleChange = event => {
        const { name, value } = event.target;

        setCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <div className='sign-up'>
            <h2 className='title'>I DO NOT HAVE AN ACCOUNT</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    );

}

const mapDispatchToProps = (dispatch) => ({
    signUpStart: bindActionCreators(signUpStart, dispatch)
})

export default connect(null, mapDispatchToProps)(SignUp);
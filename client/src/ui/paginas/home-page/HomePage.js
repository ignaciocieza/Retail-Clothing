import React from 'react';
import Directory from '../directory/Directory';
import { HomePageStyles } from './HomePageStyles';

const HomePage = () => {
    //throw Error; //testear componente "ErrorBoundary"
    return (
        <HomePageStyles>
            <Directory />
        </HomePageStyles>
    )
};

export default HomePage;
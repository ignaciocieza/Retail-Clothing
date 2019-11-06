import React, { Profiler } from 'react'; //--> Profiler: mide el tiempo de rendeo
import Directory from '../directory/Directory';
import { HomePageStyles } from './HomePageStyles';

const HomePage = () => {
    //throw Error; //testear componente "ErrorBoundary", de Main.js
    return (
        <HomePageStyles>
            <Profiler id='Directory' onRender={(id,phase,actualDuration)=>{
                console.log({
                    id,
                    phase,
                    actualDuration
                });
            }}>
                <Directory />
            </Profiler>
        </HomePageStyles>
    )
};

export default HomePage;
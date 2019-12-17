import React, { Profiler } from 'react'; //--> Profiler: mide el tiempo de rendeo
// import Directory from '../directory/Directory';
import imageCollection from '../../../assets/collection-new1.png';
import './homePage.styles.scss';

const HomePage = () => {
    //throw Error; //testear componente "ErrorBoundary", de Main.js
    return (
        <React.Fragment>
            <Profiler id='Directory' onRender={(id, phase, actualDuration) => {
                console.log({
                    id,
                    phase,
                    actualDuration
                });
            }}>
                <div className='homepage'>
                    <img src={imageCollection} alt="no imagen" className='imagen' />
                </div>
                {/* <Directory /> */}
            </Profiler>
        </React.Fragment>
    )
};

export default HomePage;
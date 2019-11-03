import React from 'react';
import { SpinnerOverlay, SpinnerContainer } from './withSpinner.styles';

/**
 * HOC, toma el componente "WrappedComponent" (componente a desplegar cuando se cargaron los datos)
 * y retorna un nuevo componente funcional.
 * Esta funcion tiene la forma: WithSpinner(WrappedComponent)()
 */
const WithSpinner = WrappedComponent =>({isLoading, ...otherProps})=>{
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer/>
        </SpinnerOverlay>
    ):(
        <WrappedComponent {...otherProps} />
    )
}

export default WithSpinner;

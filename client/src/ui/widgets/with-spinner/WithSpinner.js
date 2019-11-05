import React from 'react';
import Spinner from './Spinner';

/**
 * HOC, toma el componente "WrappedComponent" (componente a desplegar cuando se cargaron los datos)
 * y retorna un nuevo componente funcional.
 * Esta funcion tiene la forma: WithSpinner(WrappedComponent)()
 */
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
    return (isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />);
}

export default WithSpinner;

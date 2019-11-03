import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionLoaded } from '../../../api/reducers/helperFunctions';
import WithSpinner from '../../widgets/with-spinner/WithSpinner';
import Collection from './Collection';

/**
 * Patron: Container Pattern
 * Ej:
 * HOC, para spinner (de App.js) -->Nota: no se observa porque los datos se obtienen en App.js
 * const CollectionPageWithSpinner = WithSpinner(Collection);
 */
const mapStateToProps = createStructuredSelector({
    isLoading: (state)=>!selectIsCollectionLoaded(state)//se pone en forma de funcion 
                                                        //para poder retornar un boolean, con el "!"
});

//Flujo: se pasa Collection a WithSpinner quien recive las props del connect  
const CollectionContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(Collection);

export default CollectionContainer;
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionFetching } from '../../../api/reducers/helperFunctions';
import WithSpinner from '../../widgets/with-spinner/WithSpinner';
import CollectionOverview from './CollectionOverview';

/**
 * Patron: Container Pattern
 */
const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
});

//Se lee de derecha a izq: 1ro "CollectionOverview"
//compose conecta y pasa las props al componente HOC WithSpinner.
const CollectionOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionOverview);

export default CollectionOverviewContainer;

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsSearchValues } from '../../../api/reducers/helperFunctions';
import { Grid } from '@material-ui/core';
import CollectionItem from '../collection-item/CollectionItem';
import useStyles from '../collection/collection.styles';

const SearchPage = ({ collectionsSearchValues }) => {
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {collectionsSearchValues !== null && collectionsSearchValues.length  ? (
                <React.Fragment>
                    {/* <h2 className={classes.title}>Search Results:</h2> */}
                    <Grid
                        container
                        direction="row"
                        className={classes.container}
                    >
                        {
                            collectionsSearchValues
                            .filter((item, idx) => idx < 10) //filtro para evitar cargar todo el contenido de "shopReducer->collectionsSearchValues"
                                                            //puede aplicar un filtro de cantidad a buscar o como boton buscar mas.
                            .map(item => <CollectionItem key={item.id} item={item} />)
                        }
                    </Grid>
                </React.Fragment>) : (
                    <h1> No Search Results... </h1>
                )}
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    collectionsSearchValues: selectCollectionsSearchValues
});

export default connect(mapStateToProps, null)(SearchPage);

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Grid } from '@material-ui/core';
import { selectCollectionForPreview } from '../../../api/reducers/helperFunctions';
import CollectionPreview from '../colletion-preview/CollectionPreview';
import useStyles from './collectionOverview.styles';

const CollectionOverview = ({ collections }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                className={classes.container}
            >
                {collections.map(({ id, ...otherCollectionProps }) => (
                    <CollectionPreview key={id} {...otherCollectionProps} />
                ))}
            </Grid>
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
});

export default connect(mapStateToProps, null)(CollectionOverview);
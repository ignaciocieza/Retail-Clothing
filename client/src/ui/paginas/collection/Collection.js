import React from 'react';
import { connect } from 'react-redux';
import { selectCollection } from '../../../api/reducers/helperFunctions';
import { Grid } from '@material-ui/core';
import CollectionItem from '../collection-item/CollectionItem';
import useStyles from './collection.styles';

const Collection = ({ collection }) => {
    const { title, items } = collection;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h2 className={classes.title}>{title}</h2>
            <Grid
                container
                direction="row"
                className={classes.container}
            >
                {
                    items.map(item => <CollectionItem key={item.id} item={item} />)
                }
            </Grid>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    collection: selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps, null)(Collection);
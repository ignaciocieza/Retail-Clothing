import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import CustomButton from '../../widgets/custom-button/CustomButtom';
import { 
    addItem 
} from '../../../api/actions/indexActions';

import './collectionItem.styles.scss';

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;

    return (
        <div className='collection-item'>
            <div
                className='image'
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className='collection-footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <CustomButton onClick={() => addItem(item)} inverted>
                Add to cart
        </CustomButton>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addItem: bindActionCreators(addItem,dispatch),
});

export default connect(
    null,
    mapDispatchToProps
)(CollectionItem);
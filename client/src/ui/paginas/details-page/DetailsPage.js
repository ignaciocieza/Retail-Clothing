import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { createStructuredSelector } from 'reselect';
import ImageGallery from 'react-image-gallery';
import { selectItemDetail } from '../../../api/reducers/helperFunctions';
import { addItem } from '../../../api/actions/indexActions';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import collectionOne from '../../../assets/collection3modif.jpg';
import collectionTwo from '../../../assets/collection4modif.jpg';
import './detailPage.scss';

const DetailsPage = ({ item, addItem }) => {

    const { name, price, imageUrl } = item;
    const images = [
        { original: imageUrl },
        { original: collectionOne },
        { original: collectionTwo },
    ]

    return (
        <div className='root'>
            <ImageGallery originalAlt="No imagen"showFullscreenButton={false} showThumbnails={false} showBullets={true} items={images} />
            <AddShoppingCartIcon className='addShoppingCartIcon' onClick={() => addItem(item)} />
            <span className='textPrice'>${price - (price * 0.1)}</span>
            <span className='textTitle'>{name}</span>
            <span className='detailText'> Long sleeve shirt by maison coupe mandarin collar button down front with gold hardware two chest pockets pintuck details at shoulders and pockets contrast </span>
            <hr className='bar'></hr>
            <span className='selectText'>Select size</span>
            <div className='contentBoxSize'>
                <input type="radio" name="s-size" id="small" className='boxSize' />
                <input type="radio" name="s-size" id="medium" className='boxSize' />
                <input type="radio" name="s-size" id="large" className='boxSize' />
                <input type="radio" name="s-size" id="x-large" className='boxSize' />
                <input type="radio" name="s-size" id="xx-large" className='boxSize' />
                <label className='label' htmlFor="small">S</label>
                <label className='label' htmlFor="medium">M</label>
                <label className='label' htmlFor="large">L</label>
                <label className='label' htmlFor="x-large">XL</label>
                <label className='label' htmlFor="xx-large">XXL</label>
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    item: selectItemDetail
});

const mapDispatchToProps = dispatch => ({
    addItem: bindActionCreators(addItem, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
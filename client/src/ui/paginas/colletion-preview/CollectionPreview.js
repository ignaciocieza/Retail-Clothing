import React from 'react';
import CollectionItem from '../collection-item/CollectionItem';
import './collectionPreview.styles.scss';

const CollectionPreview = ({ title, items }) => {

    return (
        <div className='collection-preview'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <div className='preview'>
                {items
                    .filter((item, idx) => idx < 4)//idx, parmetro que usa filter para saber la cantidad de items que tiene que retornar
                    .map(item => (                  //, tomando el indice del array como referencia   
                        <CollectionItem key={item.id} item={item} />
                    ))}
            </div>
        </div>
    )
}

export default CollectionPreview;
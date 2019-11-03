import React from 'react';
import { connect } from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectDirectorySections} from '../../../api/reducers/helperFunctions';
import MenuItem from '../../widgets/menu-item/MenuItem'
import './directory.styles.scss';

const Directory = ({sections}) => {
    return (
        <div className='directory-menu'>
            {sections.map(({ id, ...otherSectionProps }) => (
                <MenuItem key={id} {...otherSectionProps} />
            ))}
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    sections: selectDirectorySections 
})

export default connect(mapStateToProps, null)(Directory);
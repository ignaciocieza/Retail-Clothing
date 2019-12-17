import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {selectShowText,selectCurrentUser} from '../../../api/reducers/helperFunctions';
import TuneIcon from '@material-ui/icons/Tune';
import useStyles from './settingBar.styles';

const SettingBar = ({showText,currentUser}) => {
    const clasess = useStyles();
    console.log(showText);
    return (
        <div className={clasess.root} >            
            <div className={clasess.frontDiv}>
                {showText && !currentUser ?<h3 className={clasess.text}>*Sign In to buy*</h3>:""}
                <TuneIcon className={clasess.filterIcon}  />
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    showText:selectShowText,
    currentUser: selectCurrentUser
});

export default connect(mapStateToProps,null)(SettingBar);
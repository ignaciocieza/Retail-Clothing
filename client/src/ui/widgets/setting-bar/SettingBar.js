import React from 'react';
import TuneIcon from '@material-ui/icons/Tune';
import useStyles from './settingBar.styles';

const SettingBar = () => {
    const clasess = useStyles();
    return (
        <div className={clasess.root} >
            <div className={clasess.frontDiv}>
                <TuneIcon className={clasess.filterIcon}  />
            </div>
        </div>
    );
};

export default SettingBar;
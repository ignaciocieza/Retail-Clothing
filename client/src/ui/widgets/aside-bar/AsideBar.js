import React from 'react';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import useStyles from './asideBar.styles';

const AsideBar = () => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.contentShadow}></div>
            <div className={classes.contentShadowTwo}></div>
            <div className={classes.asideBar}>
                <InstagramIcon className={classes.asideBarIcons} />
                <TwitterIcon className={classes.asideBarIcons} />
                <FacebookIcon className={classes.asideBarIcons} />
            </div>
        </React.Fragment>

    )
};

export default AsideBar;
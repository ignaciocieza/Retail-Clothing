import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        background: theme.palette.primary.main,
    },
    text:{
        fontSize:12,
        marginRight:"5%",
        [theme.breakpoints.down('md')]: {
            fontSize:11,
            marginRight:"0%",
        },
    },
    frontDiv: {
        height: '6.2vh',
        display: 'flex',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('md')]: {
            clipPath: 'polygon(6% 0, 100% 0, 100% 100%, 0 100%, 0 100%);',
            height: '4.5vh',
        },
        alignItems: 'center',
        background: theme.palette.background.paper,
        clipPath: 'polygon(3% 0, 100% 0, 100% 0, 100% 100%, 0 100%)',

        // '&::before':{
        //     content: '""',
        //     position: 'absolute',
        //     width:'10vw',
        //     height:'10vh',
        //     top:0,
        //     left:-10,
        //     background: 'red',
        //     transform: 'rotate(40deg)',
        // }

    },
    filterIcon: {
        marginRight: '2.5%',
        fontSize: 30,
        [theme.breakpoints.down('md')]: {
            fontSize: '1.5rem',
        },
    }
})
);

export default useStyles;
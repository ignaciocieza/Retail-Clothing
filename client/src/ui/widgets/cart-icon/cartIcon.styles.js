import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    contentShadow:{
        width: '7%',
        height: '6%',
        position: 'fixed',
        right: '0%',
        bottom: '0%',
        //filter: 'drop-shadow(-3px -2px 3px rgba(0,0,0,0.1))',
        boxShadow: theme.shadows[15],
        [theme.breakpoints.down('md')]: {
            height: "6%",
        }           
    },
    contentShadowTwo:{
        width: '5%',
        height: '10%',
        position: 'fixed',
        right: '0%',
        bottom: '0%',
        //filter: 'drop-shadow(-3px -2px 3px rgba(0,0,0,0.1))',
        boxShadow: theme.shadows[15],
        [theme.breakpoints.down('md')]: {
            height: "4%",
            width: '12%',
        }   
    },
    footer: {
        position: 'fixed',
        right: '0%',
        bottom: '0%',
        width: '7%',
        height: '10%',        
        background: theme.palette.secondary.main,
        clipPath: 'polygon(25% 0%, 100% 0, 100% 100%, 0 100%, 0% 38%)',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('md')]: {
            width: '12%',
            //height: '6%',
            height: `calc(${theme.height}px * 0.06)`,
            zIndex:6,
        },
    },
    bubleCart: {
        position: "absolute",
        top: '4%',
        left: "41%",
        width: "1.1rem",
        height: "1.1rem",
        borderRadius: "50%",
        backgroundColor: theme.palette.secondary.dark,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    bubleCartText: {
        fontSize: "80%",
    },
    shoppingCartIcon: {
        cursor:"pointer",
        fontSize: 30,
        [theme.breakpoints.down('md')]: {
            fontSize: 23,
        },
    },
}));

export default useStyles;
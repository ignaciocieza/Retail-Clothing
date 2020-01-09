import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

grid: {
    display: 'flex',
    flexDirection: "column",
    alignItems: "center",
},
imageContainer: {
    position: "relative",
},
image: {
    // maxWidth: '96%', 
    // maxHeight: '100%',
    width: '96%', 
    height: '100%',
    zIndex:1,
},
addShoppingCartIcon: {
    position: "absolute",
    top: "2%",
    left: "3%",
    fontSize: "228%",
    color: theme.palette.secondary.dark,
    [theme.breakpoints.down('md')]: {
        left: "9%",
    },
    cursor: "pointer",
    '&:active': {
        transform: "matrix(0.60,0.80,-0.80,0.60,0,0)",
    }
},
bubleDescont: {
    position: "absolute",
    bottom: '-2%',
    left: "41%",
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    opacity:"0.8",
    backgroundColor: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
},
bubleText: {
    fontSize: "1rem",
    padding: "24%",
},
textTitle: {
    fontSize: "1.2rem",
    marginTop: "5%",
    cursor:"pointer",
    [theme.breakpoints.down('md')]: {
        fontSize: "1rem",
    },
},
textPriceList: {
    fontSize: ".8rem",
    textDecoration: "line-through",
    margin: "1%",
    [theme.breakpoints.down('md')]: {
        fontSize: ".5rem",
    },
},
textPrice: {
    fontSize: "1rem",
    marginTop: "1%",
    marginBottom: "7%",
    [theme.breakpoints.down('md')]: {
        fontSize: "0.8rem",
        marginBottom: "1.5rem",
    },
},
}));

export default useStyles;
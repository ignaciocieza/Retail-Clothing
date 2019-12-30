import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    contentShadow:{
        width: "98%",
        height: "0.1%",
        position: "absolute",
        top: "9%",
        left: "3%",
        boxShadow: theme.shadows[3],
        zIndex:3,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    root: {
        display: 'flex', 
        height: `calc(${theme.height}px * 0.09)`,       
    },
    appBar: {
        boxShadow: theme.shadows[0],
        position:'relative',
    },
    menuButton: {
        alignItems:'center',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    menuIcon:{
        fontSize:"1.9rem",
    },
    buttonIcon:{
        fontSize:63,
        alignSelf: "center",
        opacity:" 0.6",
        margin: "0% 0% 0.3% 1%",
        cursor: "pointer",
        [theme.breakpoints.down('md')]: {
            marginLeft: "-50%",
            marginBottom: "1%",
            fontBize: "83px",
            opacity:" 0.1",
        }
    },
    button:{
        fontSize:18,
        flexGrow: 1,
        zIndex:2,       
    },
    barraVerticalContent:{
        flexGrow: .1,
        display: "flex",
        alignItems: "center",        
    },
    barraVertical:{        
        borderLeft: `0.2rem solid ${theme.palette.secondary.dark}`, 
        height: "1.5rem",
    },    
    content: {
        display:"flex",
        flexGrow: 1,
        marginRight: "5%",
    },
    searchIconContent:{
        width: "31%",
        position: "absolute",        
        top: "0%",        
        left: "67.5%",
    },
    // searchIcon:{
    //     fontSize: 30,
    //     margin: "7%",
    //     cursor: "pointer"
    // }
}));

export default useStyles;
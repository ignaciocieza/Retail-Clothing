import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        margin: '0 auto',
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        background: theme.palette.background.paper,

        [theme.breakpoints.down('md')]: {
            marginTop: "5%",
        }
    },
    container: {
        width: '84vw',
        background: theme.palette.background.paper,

    },
    title:{
        fontSize: "2.4rem",
        marginTop: "-1%",
        marginBottom: "2%",
    }
}));

export default useStyles;
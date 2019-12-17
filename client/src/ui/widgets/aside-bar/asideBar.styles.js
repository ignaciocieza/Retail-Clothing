import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

    contentShadow: {
        width: "4%",
        height: "42%",
        position: "fixed",
        top: "20%",
        right: "0%",
        // filter: 'drop-shadow(-10px -3px 3px rgba(0,0,0,0.1))',
        boxShadow: theme.shadows[12],
        [theme.breakpoints.down('md')]: {
            position: "absolute",
            top: "0%",
            left: "0%",
            width: "65%",
            height: "13%",
            boxShadow: theme.shadows[5],
        }
    },
    contentShadowTwo: {
        width: "4%",
        height: "35%",
        position: "fixed",
        top: "27%",
        right: "3%",
        boxShadow: theme.shadows[12],
        [theme.breakpoints.down('md')]: {
            display: "none",
        }
    },
    asideBar: {
        clipPath: 'polygon(27% 0%, 100% 0, 100% 100%, 0 100%, 0% 17%)',
        boxShadow: theme.shadows[3],
        position: 'fixed',
        right: '0%',
        top: '20%',
        width: '7%',
        height: '44%',
        background: theme.palette.secondary.main,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('md')]: {
            position: "absolute",
            width: "70%",
            height: "5%",
            top: "9%",
            left: "0%",
            clipPath: "polygon(6% 0%, 100% 0, 93% 100%, 0 100%, 0% 81%)",
            flexDirection: "row",
            background: theme.palette.primary.main,
        },
    },
    asideBarIcons: {
        cursor: "pointer",
        fontSize: 40,
        flexGrow: 1,
        opacity: "0.7",
        [theme.breakpoints.down('md')]: {
            fontSize: 24,
        }
    },
}));

export default useStyles;
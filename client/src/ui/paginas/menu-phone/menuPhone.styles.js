import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    contentShadow: {
        width: "65%",
        height: "0.1%",
        boxShadow: theme.shadows[2],
    },
    content: {
        height: `calc(${theme.height}px * 0.87)`,
        width: "100vw",
        position: "absolute",
        top: `calc(${theme.height}px * 0.14)`,
        left: "0%",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.primary.main,
    },
    searchIconContent: {
        display: "flex",
        justifyContent: "flex-end",
    },
    searchIcon: {
        fontSize: 23,
        margin: "3% 3% 3% 0",
        cursor: "pointer"
    },
    barraVerticalContent: {
        display: "flex",
        justifyContent: "center",
    },
    barraVertical: {
        borderBottom: `0.1rem solid ${theme.palette.secondary.dark}`,
        width: "88%",
    },
    button: {
        fontSize: 18,
        flexGrow: 1,
    },
}));

export default useStyles;
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        margin: '0 auto',
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        background: theme.palette.background.paper
    },
    container: {
        width: '84vw',
        background: theme.palette.background.paper,
    }
}));

export default useStyles;
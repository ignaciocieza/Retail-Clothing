import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    buttonOne:{
        //color: theme.palette.primary.dark,
        margin:"1%",
        backgroundColor: theme.palette.secondary.dark,
        clipPath: "polygon(4% 0, 96% 0, 100% 6%, 100% 92%, 96% 100%, 5% 100%, 0 93%, 0 6%)",

        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            color:  theme.palette.primary.light,
        }
    },
    buttonTwo:{
        margin:"1%",
        backgroundColor: "#ffdcd1",
        clipPath: "polygon(4% 0, 96% 0, 100% 6%, 100% 92%, 96% 100%, 5% 100%, 0 93%, 0 6%)"
    }
}));

export default useStyles;
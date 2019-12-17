import {createMuiTheme } from '@material-ui/core';

const theme=createMuiTheme({
    palette:{
        primary: {
            main:'#ffdcd1',
            dark:'#cbaaa0', 
            light:'ffffff',         
        },
        secondary: {
            main:'#feeae6',
            dark:'#cbb8b4',
            light:'ffffff',
        },
        // type: 'main'
    }
});

export default theme;
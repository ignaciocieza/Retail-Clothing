import {createMuiTheme } from '@material-ui/core';

let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

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
    },
    height: h, //calcula el height en mobil y 
            // hace que no se desplace el contenido al modif. el height de la pantalla
});

export default theme;
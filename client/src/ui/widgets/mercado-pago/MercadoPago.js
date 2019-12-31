import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartInitPoint } from '../../../api/reducers/helperFunctions';
import { bindActionCreators } from "redux";
import { setInitPoint } from '../../../api/actions/indexActions';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import useStyles from './mercadoPago.styles';

const MercadoPago = ({ cartItems, setInitPoint, initPoint }) => {

    const classes = useStyles();

    const arrayCartItemsModif = cartItems.map(element => ({
        id: element.id,
        title: element.name,
        quantity: element.quantity,
        currency_id: 'ARS',
        unit_price: element.price
    }));

    //peticion a nuestro servidor (server.js)
    const onToken = () => {
        axios({
            url: 'mercadopago',
            method: 'post',
            data: {
                items: arrayCartItemsModif
            },
        }).then(response => {
            setInitPoint(response.data);
        }).catch(error => {
            console.error('Error en el pago:', error);
            alert('Error en el pago');
        });
    };

    return (
        <React.Fragment>
            {initPoint ?                
                <Button
                    href={initPoint}
                    target="_blank"
                    onClick={()=>setInitPoint(null)}
                    className={classes.buttonOne}
                >
                    Go To MercadoPago
                </Button>                
                :
                <Button onClick={onToken} className={classes.buttonTwo}> Pay With MercadoPago </Button>                
            }
        </React.Fragment>
    );
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    initPoint: selectCartInitPoint
});

const mapDispatchToProps = dispatch => ({
    setInitPoint: bindActionCreators(setInitPoint, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MercadoPago);
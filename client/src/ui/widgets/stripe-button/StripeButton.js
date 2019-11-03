import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishablekey = 'pk_test_xbt1Be8lAuU4MB9nK3Ji6nh500BAudmAfe'; //clave dada por stripe.com

    //peticion a nuestro servidor (server.js)
    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response =>{
            alert('Pago realiazado exitosamente');
        }).catch(error=>{
            console.log('Error en el pago:',JSON.parse(error));
            alert('Error en el pago');
        });
    };

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN ecommerce'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now Panel'
            token={onToken}
            stripeKey={publishablekey}
        />
    );
};

export default StripeButton;
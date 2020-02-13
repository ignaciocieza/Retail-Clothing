const express = require('express'); //En el servidor no se usa es6, por esto se importa de esta manera
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');//--> comprime codigo para ser subido a heroku
const enforce = require('express-sslify'); //-->biblio. para encriptar https ("PWA")

if (process.env.NODE_ENV !== 'production') require('dotenv').config(); //accede .env para la clave secreta
//requerir de la biblioteca 'stripe' y luego invocar el proceso de obtencion de la clave (se le fijo la ruta en "require('dotenv').config();"). 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mercadopago = require('mercadopago');
mercadopago.configure({
     access_token: process.env.MERCADOPAGO_SECRET_KEY,
 });

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(bodyParser.json()); //Middalware: que hace que todos los request los parsee a json
app.use(bodyParser.urlencoded({ extended: true })); //hace que se pasen solo los caracteres habilitados para url
app.use(enforce.HTTPS({ trustProtoHeader: true })); //encriptado https para que "PWA" pueda usarse en "Heroku"
app.use(cors());                                    //|_Activar Al actualizar Heroku!!!!! (desactivar en desarrollo)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    }) //* -> todo url que usuario "hit", golpee. se ejecuta la funcion
}

//cuando el servidor reciba la peticion de service-worker, 
//devuelva el archivo service-worker de la carpeta build 
app.get('/service-worker.js', (req, res) => {
    res.send(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

//despues de que el codigo corra, lo pongo a escuchar en el puerto 5000.
app.listen(port, error => {
    if (error) throw error;
    console.log('server running on port:' + port);
});

/**permite dar con el "endpoint" de Stripe.
*"source": se pasa un token.
*"amount": la cantidad de dinero 
* "currency": tipo de moneda.
* "req" -> todo lo que proviene del front
* "res" -> lo que va a devolver el servidor
**/
app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    }

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr }) 
        } else {
            res.status(200).send({ success: stripeRes })
        }
    });
});

app.post('/mercadopago', (req, res) => {

    mercadopago.preferences.create(req.body)
        .then(function (response) {
            // Este valor reemplazará el string "$$init_point$$" en tu HTML
            //global.init_point = response.body.init_point;
            res.status(200).send(response.body.init_point);
        }).catch(function (error) {
            console.log(error);
        });
});
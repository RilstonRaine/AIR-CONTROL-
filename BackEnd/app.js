const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const init = require('./src/config/mongoDB');

const routerControle = require('./src/routes/rotasControle');
const routerUsuario = require('./src/routes/rotasUsuario');
const routerAuth = require('./src/routes/rotasAuths');

const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/controles', routerControle);
app.use('/login', routerUsuario);
app.use('/auth', routerAuth);

init();

app.listen(port, () => {
    console.log(`Servidor iniciado em http://127.0.0.1:${port}/`);
})
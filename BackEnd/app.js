const express = require('express');
const cors = require('cors');

const init = require('./src/config/mongoDB');

const routerControle = require('./src/routes/rotasControle');
const routerUsuario = require('./src/routes/rotasUsuario');
const routerAuth = require('./src/routes/rotasAuths');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));

app.use('/auth', routerAuth);
app.use('/controle', routerControle);
app.use('/login', routerUsuario);


init();

app.listen(port, () => {
    console.log(`Servidor iniciado em http://127.0.0.1:${port}/`);
});

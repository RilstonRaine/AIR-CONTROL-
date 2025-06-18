const express = require('express');
const router = express.Router();
const usuarioControler = require('../controllers/usuarioControler');

router.post('/', usuarioControler.cadastrarUsuario);

module.exports = router;
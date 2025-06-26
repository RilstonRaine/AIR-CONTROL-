const express = require('express')
const router = express.Router()
const usuarioController = require('./usuarioControler')

router.post('/register', usuarioControler.cadastrarUsuario)

module.exports = router
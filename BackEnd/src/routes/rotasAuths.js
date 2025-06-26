const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioControler');
const authController = require('../controllers/authController');

router.post('/register', usuarioController.cadastrarUsuario);
router.post('/login', authController.login);

module.exports = router;
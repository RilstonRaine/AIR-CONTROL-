const express = require('express');
const router = express.Router();
const controler = require('../controllers/controleControlers');
const autenticarToken = require('../middleware/auth');

router.get('/', autenticarToken, controler.listarControles);
router.post('/:id', autenticarToken, controler.criarControle);
router.delete('/:id', autenticarToken, controler.excluirControle);

module.exports = router;
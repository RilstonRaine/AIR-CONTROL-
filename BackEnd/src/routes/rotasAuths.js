const express = require('express')
const router = express.Router();
const authControler = require('../controllers/authControler');

router.post('/', authControler.login);

module.exports = router;
const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    login: { type: String, required: true},
    senha: { type: String, required: true},
})

module.exports = mongoose.model('Usuario', usuarioSchema);
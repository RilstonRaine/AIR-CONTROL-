const mongoose = require('mongoose')

const controleSchema = new mongoose.Schema({
    
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },

    nome: {type: String, default: "Novo controle"},
    ligar: { type: String, required: true },
    desligar: { type: String, required: true },
    aumentar: { type: String, required: true },
    diminuir: { type: String, required: true },

});

module.exports = mongoose.model('Controle', controleSchema);
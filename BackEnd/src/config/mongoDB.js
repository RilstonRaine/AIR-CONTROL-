const mongoose = require('mongoose')

const init = async() => {
    try {
        await mongoose.connect('mongodb+srv://tauaferreira:t10062005@teste.y0xxkdl.mongodb.net/?retryWrites=true&w=majority&appName=Teste');

        console.log("Conectado ao banco mongoDB");
    }catch(error){
        console.error("Erro ao tentar conectar ao banco:", error);
    }
}

module.exports = init;
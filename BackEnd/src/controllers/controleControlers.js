const Controle = require('../models/Controle');

//GET /controles
exports.listarControles = async (req, res) => {
    const controles = await Controle.find();

    res.json((controles));
}

//POST /controles
exports.criarControle = async (req, res) => {
    const { ligar, desligar, aumentar, diminuir, nome, usuario } = req.body;

    if( !ligar || !desligar || !aumentar || !diminuir){
        return res.status(400).send("ERRO: Os argumentos obrigatórios não foram passados");
    }

    if( !usuario ){
        return res.status(400).send("ERRO: Usuário é necessário")
    }

    try{
        const novoControle = await Controle.create({ usuario, nome, ligar, desligar, aumentar, diminuir});
        res.status(201).send(novoControle)
    }catch(error){
        console.error("Erro ao criar Controle: ", error);
        return res.status(500).send("Erro ao criar controle");
    }
}

//DELETE /controles/:id
exports.excluirControle = async (req, res) => {
    const { id } = req.body;

    if(!id){
        return res.status(400).send("ERRO: ID do controle é necessária para expclusão");
    }

    try{
        await Controle.deleteOne(id);

        res.status(204).send('Controle deletado');
    }catch(error){
        res.status(500).send('Erro ao deletar o controle');
    }
}

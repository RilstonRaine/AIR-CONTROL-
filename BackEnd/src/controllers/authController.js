const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const SECRET = "fjiuewhuoirho3u2hroo3hoi32j0fj0fnionwoncvu32u0r3829r9";

exports.SECRET = SECRET;

exports.login = async (req, res) => {
    console.log('Recebido login:', req.body);
    const { login, senha } = req.body;

    if(!login || !senha){
        console.log('Login ou senha faltando:', req.body);
        return res.status(400).send("ERRO: Login e senha são obrigatórios");
    }

    try{
        const usuario = await Usuario.findOne({login, senha});

        if(!usuario){
            return res.status(401).send("ERRO: Credenciais inválidas");
        }

        const token = jwt.sign({id: usuario._id, login: usuario.login}, SECRET, { expiresIn: "5h" });

        res.json({token});
    }catch(error){
        console.error("Erro ao gerar token:", error);
        res.status(500).send("Erro ao gerar token do usuario");
    }
}
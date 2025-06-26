const Usuario = require('../models/Usuario')

exports.cadastrarUsuario = async (req, res) => {
  const { login, senha } = req.body;

  if (!login || !senha) {
    return res.status(400).send("Login e senha são obrigatórios");
  }

  try {
    await Usuario.create({ login, senha });
    res.status(201).send("Usuário criado com sucesso.");
  } catch (error) {
    console.error("Erro ao cadastrar usuario:", error);

    if (error.code === 11000) {
      return res.status(400).send("Login já cadastrado.");
    }

    res.status(500).send("Erro ao cadastrar usuario");
  }
};
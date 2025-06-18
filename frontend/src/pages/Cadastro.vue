<template>
  <div class="cadastro-container">
    <h2>Cadastrar Usuário</h2>
    <form @submit.prevent="cadastrar">
      <input type="text" v-model="email" placeholder="Email" required />
      <input type="password" v-model="senha" placeholder="Senha" required />
      <button type="submit">Cadastrar</button>
      <p v-if="mensagem">{{ mensagem }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Login from './Login.vue';

export default {
  data() {
    return {
      login: '',
      senha: '',
      mensagem: ''
    }
  },
  methods: {
    async cadastrar() {
      try {
        await axios.post('http://127.0.0.1:3000/login', {
          login: this.email,
          senha: this.senha
        });
        this.mensagem = 'Cadastro realizado com sucesso!';
        this.$router.push('/login');
      } catch (err) {
        this.mensagem = 'Erro ao cadastrar.';
      }
    }
  }
}
</script>

<style scoped>
.cadastro-container {
  max-width: 300px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
}
input, button {
  margin: 5px 0;
}
</style>
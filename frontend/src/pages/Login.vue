<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="fazerLogin">
      <input type="text" v-model="email" placeholder="Email" required />
      <input type="password" v-model="senha" placeholder="Senha" required />
      <button type="submit">Entrar</button>
      <p v-if="erro" class="erro">{{ erro }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      senha: '',
      erro: ''
    }
  },
  methods: {
    async fazerLogin() {
      try {
        const res = await axios.post('http://127.0.0.1:3000/auth', {
          login: this.email,
          senha: this.senha
        });

        localStorage.setItem('token', res.data.token);
        this.$router.push('/dashboard'); // Redireciona para a área protegida
      } catch (err) {
        this.erro = 'Credenciais inválidas.';
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
}
input, button {
  margin: 5px 0;
}
.erro {
  color: red;
}
</style>

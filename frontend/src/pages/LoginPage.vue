<template>
  <div class="login-page">
    <h1>Login</h1>
    <AuthForm 
      isLogin 
      @submit="handleLogin" 
    />
    <p>
      Não tem uma conta? 
      <router-link to="/register">Cadastre-se</router-link>
    </p>
  </div>
</template>

<script>
import AuthForm from '../components/AuthForm.vue'
import authService from '../services/auth'

export default {
  components: {
    AuthForm
  },
  methods: {
    async handleLogin(credentials) {
      try {
        const { token, user } = await authService.login(credentials.email, credentials.password)
        
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
        
        this.$router.push('/dashboard')
      } catch (error) {
        alert(error.message || 'Erro ao fazer login')
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}
</style>
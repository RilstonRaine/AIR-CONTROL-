<template>
  <div class="login-container">
      <div class="form-wrapper">
        <h2>Login</h2>
        <AuthForm 
          isLogin 
          :loading="loading"
          @submit="handleLogin" 
          ref="authForm"
        />
        <p>
          Não tem uma conta? 
          <router-link to="/register">Cadastre-se</router-link>
        </p>
      </div>
    </div>
</template>

<script>
import AuthForm from '../components/AuthForm.vue'
import authService from '../services/auth'

export default {
  components: {
    AuthForm
  },

  data() {
    return {
      loading: false,
    }
  },
  methods: {
    async handleLogin(credentials) {
    if (this.loading) return; // evita reentradas
      this.loading = true
      try {
        const { token } = await authService.login({
          login: credentials.email,
          senha: credentials.password
        })
        localStorage.setItem('token', token)
        this.$refs.authForm.resetForm()
        this.$router.push('/dashboard')
      } catch (error) {
        alert(error.message || 'Erro ao fazer login')
      } finally {
        this.loading = false
      }
    }
  }

}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fa;
}

.form-wrapper {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.form-wrapper h2 {
  margin-bottom: 1rem;
}

.form-wrapper p {
  margin-top: 1rem;
  font-size: 14px;
}
</style>
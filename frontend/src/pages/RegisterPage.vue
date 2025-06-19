<template>
  <div class="register-container">
    <h2>Cadastro</h2>
    
    <form @submit.prevent="handleRegister" class="register-form">
      
      <div class="form-group">
        <label>Email</label>
        <input 
          type="email" 
          v-model="form.email" 
          required
          placeholder="seu@email.com"
        >
      </div>
      
      <div class="form-group">
        <label>Senha</label>
        <input 
          type="password" 
          v-model="form.password" 
          required
          placeholder="Senha"
        >
      </div>
      
      <div class="form-group">
        <label>Confirmar Senha</label>
        <input 
          type="password" 
          v-model="form.confirmPassword" 
          required
          placeholder="Confirme sua senha"
        >
      </div>
      
      <button type="submit" :disabled="loading">
        {{ loading ? 'Cadastrando...' : 'Criar Conta' }}
      </button>
      
      <div v-if="error" class="error-message">{{ error }}</div>
    </form>
    
    <p class="login-link">
      Já tem uma conta? <router-link to="/login">Faça login</router-link>
    </p>
  </div>
</template>

<script>
import authService from '../services/auth'

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      loading: false,
      error: null
    }
  },
  methods: {
    async handleRegister() {
      this.loading = true
      this.error = null
      
      try {
        if (this.form.password !== this.form.confirmPassword) {
          throw new Error('As senhas não coincidem')
        }

        if (this.form.password.length < 3) {
          throw new Error('A senha deve ter pelo menos 3 caracteres')
        }

        console.log('Iniciando cadastro...', this.form)
        
        const result = await authService.register(this.form)
        console.log('Cadastro bem-sucedido:', result)
        
        // Armazena o token e redireciona
        localStorage.setItem('token', result.token)
        localStorage.setItem('user', JSON.stringify(result.user))
        
        this.$router.push('/dashboard')
        
      } catch (error) {
        console.error('Erro completo:', error)
        this.error = error.message
        
        if (error.message.includes('404')) {
          this.error = 'Endpoint não encontrado. Verifique a conexão com o servidor.'
        } else if (error.message.includes('Network Error')) {
          this.error = 'Servidor indisponível. Verifique sua conexão.'
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
}

.register-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.8rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: #e74c3c;
  margin-top: 1rem;
  text-align: center;
}

.login-link {
  text-align: center;
  margin-top: 1.5rem;
}

.login-link a {
  color: #42b983;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
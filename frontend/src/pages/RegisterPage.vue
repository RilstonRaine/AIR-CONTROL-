<template>
  <div class="register-container">
      <div class="form-wrapper">
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
              
        <button type="submit" :disabled="loading">
          {{ loading ? 'Cadastrando...' : 'Criar Conta' }}
        </button>
        
        <div v-if="success" class="success-message">{{ success }}</div>
        <div v-if="error" class="error-message">{{ error }}</div>
      
      </form>
      
      <p class="login-link">
        Já tem uma conta? <router-link to="/login">Faça login</router-link>
      </p>
    </div>
  </div> 
</template>

<script>
import authService from '../services/auth'

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false,
      error: null,
      success: null
    }
  },
  methods: {
    async handleRegister() {
      this.loading = true
      this.error = null
      this.success = null
      
      try {
        if (this.form.password.length < 3) {
          throw new Error('A senha deve ter pelo menos 3 caracteres')
        }

        const payload = {
          login: this.form.email,
          senha: this.form.password
        }

        const response = await authService.register(payload)
        this.success = response || 'Usuário cadastrado com sucesso.'
        
        setTimeout(() => {
          this.$router.push('/login')
        }, 1500)
        
      } catch (error) {
        console.error('Erro completo:', error)
        this.error = error.message
      } finally {
        this.loading = false
      }
    }
  }
}

</script>

<style scoped>
.register-container {
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

.form-group {
  margin-bottom: 1.2rem;
  text-align: left;
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
}

.success-message {
  color: #2ecc71;
  margin-top: 1rem;
}

.error-message {
  color: #e74c3c;
  margin-top: 1rem;
}

.login-link {
  margin-top: 1.5rem;
  font-size: 14px;
}
</style>
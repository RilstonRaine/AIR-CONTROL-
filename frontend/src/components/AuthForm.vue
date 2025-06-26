<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
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
      {{ loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Cadastrar' }}
    </button>

    <div v-if="error" class="error-message">{{ error }}</div>
  </form>
</template>

<script>
export default {
  props: {
    isLogin: { type: Boolean, default: true },
    loading: { type: Boolean, default: false }
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    async handleSubmit() {
      if (this.loading) return;
      this.error = ''
      
      if (!this.form.email || !this.form.password) {
        this.error = 'Preencha o e-mail e a senha corretamente.'
        return
      }
      
      this.$emit('submit', {
        email: this.form.email,
        password: this.form.password
      })
    },
    resetForm() {
      this.form.email = ''
      this.form.password = ''
      this.error = ''
    }
  }
}
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}
</style>

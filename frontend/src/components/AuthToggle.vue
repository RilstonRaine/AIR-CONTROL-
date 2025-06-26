<template>
  <div class="toggle-container">
    {{ isLogin ? 'Novo por aqui?' : 'Já tem uma conta?' }}
    <button @click="toggleAuth" class="toggle-btn">
      {{ isLogin ? 'Criar conta' : 'Fazer login' }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  isLogin: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['toggle'])

const toggleAuth = () => {
  emit('toggle')
}
</script>

<style scoped>
.toggle-container {
  margin-top: 1.5rem;
  text-align: center;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.toggle-btn {
  background: none;
  border: none;
  color: #42b983;
  font-weight: 500;
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  margin-left: 0.3rem;
}

.toggle-btn:hover {
  text-decoration: underline;
}
</style>
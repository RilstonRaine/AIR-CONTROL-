<script setup>
import { useRoute } from 'vue-router'
import SideBar from './components/SideBar.vue'

const route = useRoute()
</script>

<template>
  <div class="layout">
    <SideBar v-if="route.path !== '/login' && route.path !== '/cadastro'" />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>  
.layout {
  height: 100vh;
  display: flex;
  justify-content: end;
}

.main-content {
    width: 80%;
    display: flex;
    flex-direction: column;
}
</style>

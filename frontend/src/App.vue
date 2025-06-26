<script setup>
import { useRoute } from 'vue-router'
import SideBar from './components/SideBar.vue'

const route = useRoute()
</script>

<template>
  <div class="layout">
    <SideBar v-if="route.path !== '/login' && route.path !== '/register'" />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>



import { createRouter, createWebHistory } from 'vue-router'

import Login from '../pages/Login.vue'
import Cadastro from '../pages/Cadastro.vue'
import Dashboard from '../pages/Dashboard.vue'
import Controle from '../pages/Aparelho.vue'

const routes = [
  { path: '/',
    redirect: '/login' 
  },
  { path: '/login',
    component: Login
  },
  { path: '/cadastro',
    component: Cadastro
  },
  { path: '/dashboard',
    component: Dashboard
  },
  { path: '/controle',
    component: Controle
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Pra protecger  rotas privadas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  // Definir as rotas que precisam de autenticação
  const rotasProtegidas = ['/dashboard', '/controle'];

  if (rotasProtegidas.includes(to.path) && !token) {
    next('/login'); // Redireciona para login se não estiver logado
  } else {
    next();
  }
});

export default router
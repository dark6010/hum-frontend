<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Barra de navegación -->
    <nav class="bg-blue-600 text-white shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <div class="text-2xl font-bold">
            <NuxtLink to="/cpanel">Panel de Administración</NuxtLink>
          </div>
          <button @click="drawer = !drawer" class="md:hidden">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <div class="container mx-auto px-4 py-6 flex flex-col md:flex-row">
      <!-- Menú lateral -->
      <div :class="['md:w-64 bg-white shadow rounded-lg p-4 mb-6 md:mb-0 md:mr-6', 
                   drawer ? 'block' : 'hidden md:block']">
        <h2 class="text-xl font-semibold mb-4">Menú</h2>
        <ul class="space-y-2">
          <li v-for="(item, i) in menuItems" :key="i">
            <button 
              @click="navigateTo(item.route)"
              :class="['w-full text-left px-4 py-2 rounded transition', 
                      currentView === item.route ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100']">
              <i :class="item.icon + ' mr-2'"></i> {{ item.title }}
            </button>
          </li>
        </ul>
      </div>

      <!-- Contenido principal -->
      <div class="flex-1">
        <div v-if="currentView === 'dashboard'">
          <h1 class="text-3xl font-bold mb-6">Panel Principal</h1>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div v-for="(card, i) in dashboardCards" :key="i" 
                 class="bg-white p-6 rounded-lg shadow text-center" 
                 :class="card.color">
              <i :class="card.icon + ' text-2xl mb-3'"></i>
              <h3 class="font-semibold text-lg">{{ card.title }}</h3>
              <p class="text-sm">{{ card.text }}</p>
            </div>
          </div>
        </div>

        <div v-else>
          <h1 class="text-3xl font-bold mb-2">{{ currentTitle }}</h1>
          <div class="bg-white p-2 rounded-lg shadow">
            <!-- <p class="mb-4">Aquí iría el contenido específico para {{ currentTitle }}</p> -->
            
            <div v-if="currentView === 'createNews'" class="space-y-4">
              <CreateNews/>
            </div>
            <div v-if="currentView === 'deleteNews'" class="space-y-4">
              <DeleteNews/>
            </div>
            <div v-if="currentView === 'updateNews'" class="space-y-4">
              <UpdateNews/>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import CreateNews from '@/components/home/CreateNews.vue'
import DeleteNews from '@/components/home/DeleteNews.vue'
import UpdateNews from '@/components/home/UpdateNews.vue'
definePageMeta({
  middleware: 'auth'
})
const drawer = ref(false)
const currentView = ref('createNews')

const menuItems = [
  // { title: 'Panel Principal', icon: 'fas fa-tachometer-alt', route: 'dashboard' },
  { title: 'Crear Noticia', icon: 'fas fa-plus-circle', route: 'createNews' },
  { title: 'Eliminar Noticia', icon: 'fas fa-trash', route: 'deleteNews' },
  { title: 'Actualizar Noticia', icon: 'fas fa-edit', route: 'updateNews' },
  { title: 'Crear Profesor', icon: 'fas fa-user-plus', route: 'createTeacher' },
  { title: 'Eliminar Profesor', icon: 'fas fa-user-times', route: 'deleteTeacher' },
  { title: 'Actualizar Profesor', icon: 'fas fa-user-edit', route: 'updateTeacher' },
]

const dashboardCards = [
  { title: 'Noticias', icon: 'fas fa-newspaper', text: 'Gestionar contenido', color: 'bg-blue-100' },
  { title: 'Profesores', icon: 'fas fa-chalkboard-teacher', text: 'Administrar profesores', color: 'bg-green-100' },
  { title: 'Usuarios', icon: 'fas fa-users', text: 'Gestionar usuarios', color: 'bg-yellow-100' },
  { title: 'Configuración', icon: 'fas fa-cog', text: 'Ajustes del sistema', color: 'bg-red-100' },
]

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Título', value: 'title' },
  { text: 'Fecha', value: 'date' },
  { text: 'Acciones', value: 'actions' },
]

const items = [
  { id: 1, title: 'Noticia de ejemplo 1', date: '2023-05-15' },
  { id: 2, title: 'Noticia de ejemplo 2', date: '2023-05-10' },
  { id: 3, title: 'Noticia de ejemplo 3', date: '2023-05-05' },
]

const currentTitle = computed(() => {
  const item = menuItems.find(item => item.route === currentView.value)
  return item ? item.title : 'Panel de Administración'
})

function navigateTo(route) {
  currentView.value = route
  drawer.value = false
}
</script>

<style>
/* Estilos personalizados si son necesarios */
</style>
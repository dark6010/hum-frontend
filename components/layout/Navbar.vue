<template>
    <nav class="bg-blue-800 text-white shadow-lg">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center py-4">
          <div class="text-2xl font-bold">
            <NuxtLink to="/">Ciencias de la Educación</NuxtLink>
          </div>
          
          <div class="hidden md:flex space-x-6">
            <NuxtLink 
              v-for="link in navLinks" 
              :key="link.path" 
              :to="link.path"
              class="hover:text-blue-200 transition"
              active-class="text-blue-200 font-semibold"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
          
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button @click="isOpen = !isOpen" class="text-white focus:outline-none">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile menu -->
        <div v-if="isOpen" class="md:hidden pb-4">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            class="block py-2 hover:bg-blue-700 px-4 rounded transition"
            active-class="bg-blue-700 font-semibold"
            @click="isOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  const isOpen = ref(false);
  
  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/la-carrera', label: 'La Carrera' },
    { path: '/dependencias', label: 'Dependencias' },
    { path: '/academia', label: 'Academia' },
    { path: '/salidas-laterales', label: 'Salidas Laterales' },
    { path: '/vida-estudiantil', label: 'Vida Estudiantil' },
    { path: '/contacto', label: 'Contacto' }
  ];
  </script>
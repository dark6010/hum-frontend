<template>
  <nav class="bg-navy-custom text-white shadow-lg relative overflow-hidden">
    <!-- Efecto de borde dorado -->
    <div class="absolute bottom-0 left-0 w-full h-1.5 bg-gold-gradient"></div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="flex justify-between items-center py-4">
        <div class="text-2xl font-bold">
          <NuxtLink to="/" class="group relative">
            <span class="relative z-10 text-gold-light">{{ Title }}</span>
            <span class="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-gold-light to-gold-medium transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
        </div>
        
        <div class="hidden md:flex space-x-6">
          <NuxtLink 
            v-for="link in navLinks" 
            :key="link.path" 
            :to="link.path"
            class="transition duration-300 relative group hover-gold"
            :class="{'text-gold-light font-semibold': route.path === link.path}"
          >
            {{ link.label }}
            <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-medium transition-all duration-300 group-hover:w-full"></span>
          </NuxtLink>
        </div>
        
        <!-- Mobile menu button -->
        <div class="md:hidden">
          <button @click="isOpen = !isOpen" class="text-white focus:outline-none transition hover:opacity-80">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Mobile menu -->
      <div v-if="isOpen" class="md:hidden pb-4 mt-2 rounded-lg bg-navy-dark border border-gold-custom">
        <NuxtLink 
          v-for="(link, index) in navLinks" 
          :key="link.path" 
          :to="link.path"
          class="block py-3 px-4 transition duration-300 border-b border-gold-custom"
          :class="{
            'text-white bg-gold-custom font-semibold': route.path === link.path,
            'text-gray-200': route.path !== link.path,
            'border-b-0': index === navLinks.length - 1
          }"
          @click="isOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
  
  <script setup>
  import {Title} from '~/configs/navbar.js'
  const title = ref(Title);
  const isOpen = ref(false);
  const route = useRoute();
  onMounted(() => {
    console.log('Ruta actual (cliente):', route.path);
  });
  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/la-carrera', label: 'La Carrera' },
    { path: '/dependencias', label: 'Dependencias' },
    // { path: '/academia', label: 'Academia' },
    { path: '/salidas-laterales', label: 'Salidas Laterales' },
    { path: '/vida-estudiantil', label: 'Vida Estudiantil' },
    { path: '/contacto', label: 'Contacto' }
  ];
  </script>
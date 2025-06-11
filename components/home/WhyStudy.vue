<template>
    <section class="py-12 bg-blue-900 text-white"> <!-- Cambiado a bg-blue-900 para mayor contraste -->
      <div class="container mx-auto px-4">
        <div class="max-w-3xl mx-auto text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4 text-white"> <!-- Texto blanco sólido -->
            ¿Por qué estudiar Ciencias de la Educación?
          </h2>
          <p class="text-xl text-blue-100 font-medium"> <!-- Texto más claro y grueso -->
            Descubre las oportunidades y ventajas de formarte como profesional en educación
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div 
            v-for="(point, index) in points" 
            :key="index" 
            class="bg-white/5 rounded-lg p-6 backdrop-blur-sm border border-white/20 hover:bg-white/10 transition" <!-- Efecto hover -->
          >
            <div class="text-blue-50 mb-4"> <!-- Icono más claro -->
              <svg class="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2 text-white"> <!-- Título blanco sólido -->
              {{ point.title }}
            </h3>
            <p class="text-blue-50 leading-relaxed"> <!-- Texto claro con mejor interlineado -->
              {{ point.description }}
            </p>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink 
            to="/la-carrera" 
            class="inline-flex items-center px-6 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg hover:shadow-xl"
          >
            Conoce más sobre la carrera
            <svg class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const props = defineProps({
    points: {
      type: Array,
      required: true
    }
  });
  </script>
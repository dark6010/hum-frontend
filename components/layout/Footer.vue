<template>
    <!-- <footer class="bg-navy-custom text-white py-8"> -->
    <footer class="bg-navy-custom text-gold-light py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">{{ titulo1 }}</h3>
            <p class="text-white">{{ contenido1 }}</p>
          </div>
          
          <div>
            <h3 class="text-xl font-bold mb-4">Enlaces rápidos</h3>
            <ul class="space-y-2">
              <li v-for="link in quickLinks" :key="link.path">
                <NuxtLink :to="link.path" class="text-gray-300 hover:text-white transition">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 class="text-xl font-bold mb-4">{{ titulo3 }}</h3>
            <p class="text-gray-300">{{ contenido3.p1 }}</p>
            <p class="text-gray-300">{{ contenido3.p2 }}</p>
            <p class="text-gray-300">{{ contenido3.p3 }}</p>
          </div>
        </div>
        
        <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>{{ copyright }}</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import {zona1,zona3, copyright as Copyright} from '~/configs/footer.js'
  const titulo1= ref(zona1.titulo)
  const contenido1= ref(zona1.contenido)
  const titulo3= ref(zona3.titulo)
  const contenido3= ref(zona3.contenido)
  const copyright= Copyright
  const quickLinks = [
    { path: '/la-carrera', label: 'Malla curricular' },
    // { path: '/academia/docentes', label: 'Docentes' },
    // { path: '/academia/materias', label: 'Materias' },
    // { path: '/vida-estudiantil', label: 'Vida estudiantil' },
    // { path: '/contacto', label: 'Contáctanos' }
  ];
  </script>
<style scoped>
</style>
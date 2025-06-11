<template>
    <footer class="bg-gray-800 text-white py-8">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">Ciencias de la Educación</h3>
            <p class="text-gray-300">Formando profesionales en educación con excelencia académica y compromiso social.</p>
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
            <h3 class="text-xl font-bold mb-4">Contacto</h3>
            <p class="text-gray-300">Dirección: Av. Universitaria 123</p>
            <p class="text-gray-300">Teléfono: +591 4 1234567</p>
            <p class="text-gray-300">Email: educacion@universidad.edu</p>
          </div>
        </div>
        
        <div class="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} Carrera de Ciencias de la Educación. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  const quickLinks = [
    { path: '/la-carrera', label: 'Malla curricular' },
    { path: '/academia/docentes', label: 'Docentes' },
    { path: '/academia/materias', label: 'Materias' },
    { path: '/vida-estudiantil', label: 'Vida estudiantil' },
    { path: '/contacto', label: 'Contáctanos' }
  ];
  </script>
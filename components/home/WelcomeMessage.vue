<template>
    <section class="py-12 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-600 mb-4">{{ content.title }}</h2>
          <p class="text-lg text-gray-600 mb-6">{{ content.description }}</p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-blue-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-blue-800 mb-4">Lo que nos distingue</h3>
            <ul class="space-y-3">
              <li v-for="(item, index) in content.highlights" :key="index" class="flex items-start">
                <svg class="h-5 w-5 text-blue-600 mt-1 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700">{{ item }}</span>
              </li>
            </ul>
          </div>
          
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-xl font-semibold text-blue-800 mb-4">Nuestros valores</h3>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="(value, index) in values" :key="index" class="bg-white p-4 rounded shadow-sm">
                <div class="text-blue-600 mb-2">
                  <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <h4 class="font-medium text-gray-800">{{ value.title }}</h4>
                <p class="text-sm text-gray-600">{{ value.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const props = defineProps({
    content: {
      type: Object,
      required: true
    }
  });
  
  const values = [
    {
      title: 'Excelencia',
      description: 'Buscamos la calidad en todos nuestros procesos formativos.'
    },
    {
      title: 'Innovación',
      description: 'Promovemos la creatividad y el pensamiento crítico.'
    },
    {
      title: 'Compromiso',
      description: 'Trabajamos con responsabilidad social y ética profesional.'
    },
    {
      title: 'Inclusión',
      description: 'Valoramos la diversidad y promovemos la equidad.'
    }
  ];
  </script>
<style scoped>

</style>
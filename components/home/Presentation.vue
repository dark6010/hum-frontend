<template>
  <section class="institutional-info bg-gray-50 py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2 class="text-3xl font-bold text-center text-blue-800 mb-12">
        La Carrera
      </h2>

      <!-- Pestañas/Navegación -->
      <div class="flex flex-wrap justify-center mb-8 gap-2">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-4 py-2 rounded-lg transition-all"
          :class="{
            'bg-blue-600 text-white': activeTab === tab.id,
            'bg-white text-blue-800 hover:bg-blue-100': activeTab !== tab.id
          }"
          :aria-current="activeTab === tab.id ? 'page' : null"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Contenido dinámico -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-6 md:p-8 lg:p-10">
          <!-- Misión -->
          <div v-show="activeTab === 'mision'" class="fade-in">
            <h3 class="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
              <Icon name="material-symbols:mission" class="mr-2" />
              Misión
            </h3>
            <p class="text-gray-700 leading-relaxed">
              {{ institutionalData.mision }}
            </p>
          </div>

          <!-- Visión -->
          <div v-show="activeTab === 'vision'" class="fade-in">
            <h3 class="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
              <Icon name="mdi:eye" class="mr-2" />
              Visión
            </h3>
            <p class="text-gray-700 leading-relaxed">
              {{ institutionalData.vision }}
            </p>
          </div>

          <!-- Objetivos -->
          <div v-show="activeTab === 'objetivos'" class="fade-in">
            <h3 class="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
              <Icon name="mdi:target" class="mr-2" />
              Objetivos
            </h3>
            <ul class="grid md:grid-cols-2 gap-4">
              <li
                v-for="(objetivo, index) in institutionalData.objetivos"
                :key="index"
                class="flex items-start mb-2"
              >
                <span class="text-blue-500 mr-2 mt-1">•</span>
                <span class="text-gray-700">{{ objetivo }}</span>
              </li>
            </ul>
          </div>

          <!-- Historial -->
          <div v-show="activeTab === 'historial'" class="fade-in">
            <h3 class="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
              <Icon name="mdi:history" class="mr-2" />
              Reseña Histórica
            </h3>
            <div class="prose max-w-none text-gray-700">
              <p v-for="(parrafo, index) in institutionalData.historial" :key="index">
                {{ parrafo }}
              </p>
            </div>
            <div v-if="institutionalData.fundacion" class="mt-6 p-4 bg-blue-50 rounded-lg">
              <p class="font-medium text-blue-800">
                Fundada en: {{ institutionalData.fundacion }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// Datos de ejemplo (deberías reemplazarlos con tus datos reales)
const institutionalData = {
  mision: 'Formar profesionales en educación con excelencia académica, comprometidos con la transformación social y el desarrollo humano integral mediante la investigación, innovación pedagógica y vinculación con la comunidad.',
  vision: 'Ser referente nacional en la formación de educadores que lideren los procesos de cambio en el sistema educativo, con enfoque inclusivo, intercultural y de sostenibilidad ambiental para el año 2030.',
  objetivos: [
    'Desarrollar competencias pedagógicas avanzadas en los estudiantes',
    'Fomentar la investigación educativa aplicada',
    'Promover la innovación en metodologías de enseñanza',
    'Establecer alianzas estratégicas con instituciones educativas',
    'Establecer alianzas de triple impacto social',
    'Contribuir a la solución de problemas educativos nacionales'
  ],
  historial: [
    'La Carrera de Ciencias de la Educación fue creada en 1985 como respuesta a la necesidad de profesionalizar la labor docente en el país.',
    'Inició sus actividades con un plan de estudios pionero que integraba teoría y práctica educativa. A lo largo de los años ha actualizado su malla curricular en cuatro ocasiones, la última en 2020 para incorporar competencias digitales y educación virtual.',
    'Actualmente cuenta con más de 2,000 egresados que se desempeñan en diversos ámbitos del sistema educativo nacional e internacional.'
  ],
  fundacion: '15 de marzo de 1985'
}

const tabs = [
  { id: 'mision', label: 'Misión' },
  { id: 'vision', label: 'Visión' },
  { id: 'objetivos', label: 'Objetivos' },
  { id: 'historial', label: 'Reseña Histórica' }
]

const activeTab = ref('mision')
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.prose {
  line-height: 1.75;
}

.prose p:not(:last-child) {
  margin-bottom: 1rem;
}
</style>
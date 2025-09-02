<template>
  <section class="curriculum-map py-16 bg-white">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-blue-800 mb-3">Malla Curricular</h2>
        <p class="text-gray-600 max-w-3xl mx-auto">
          A continuación, se presenta la malla curricular, la misma que permitirá observar gráficamente las Unidades Pedagógicas de Formación, Áreas, Ejes Articuladores, Ciclos, Cursos y la titulación como Técnico Superior, las menciones profesionales, así como los recorridos académicos dispuestos para los estudiantes de Ciencias de la Educación
        </p>
      </div>

      <!-- Controles de visualización -->
      <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div class="flex space-x-2">
          <button
            v-for="(option, index) in viewOptions"
            :key="index"
            @click="activeView = option.value"
            class="px-4 py-2 rounded-md border transition"
            :class="{
              'bg-navy-custom text-white border-blue-600': activeView === option.value,
              'bg-white text-gray-700 border-gray-300 hover:bg-gray-50': activeView !== option.value
            }"
          >
            {{ option.label }}
          </button>
        </div>

        <div class="relative">
          <label for="semester" class="sr-only">Semestre</label>
          <select
            id="semester"
            v-model="selectedSemester"
            class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            v-if="activeView === 'semestral'"
          >
            <option value="all">Todos los semestres</option>
            <option v-for="n in 8" :key="n" :value="n">
              Semestre {{ n }}
            </option>
          </select>
        </div>
      </div>

      <!-- Visualización principal -->
      <div class="bg-gray-50 rounded-xl shadow-md overflow-hidden">
        <!-- Vista de imagen completa (predeterminada) -->
        <div v-show="activeView === 'completa'" class="p-4 md:p-6">
          <div class="relative pb-2/3 h-auto">
            <img
              :src="mallaImage"
              alt="Malla curricular completa de Ciencias de la Educación"
              class="w-full h-auto rounded-lg border border-gray-200 shadow-sm cursor-zoom-in"
              @click="openZoom"
              ref="mainImage"
            />
            <button
              v-if="!isZoomed"
              @click="openZoom"
              class="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-blue-600 p-2 rounded-full shadow-md transition-all hover:scale-105"
              aria-label="Ampliar imagen"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <p class="text-sm text-gray-500 mt-2 text-center">
            Haz clic en la imagen para ampliar
          </p>
        </div>

        <!-- Vista semestral (lista interactiva) -->
        <div v-show="activeView === 'semestral'" class="p-6">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="semester in filteredSemesters"
              :key="semester.number"
              class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
            >
              <div class="bg-navy-custom px-4 py-3">
                <h3 class="text-lg font-semibold text-white">
                  Semestre {{ semester.number }}
                </h3>
              </div>
              <ul class="divide-y divide-gray-100">
                <li
                  v-for="course in semester.courses"
                  :key="course.code"
                  class="px-4 py-3 hover:bg-blue-50 transition"
                >
                  <div class="flex justify-between">
                    <div>
                      <h4 class="font-medium text-gray-800">{{ course.name }}</h4>
                      <p class="text-sm text-gray-500">{{ course.code }}</p>
                    </div>
                    <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {{ course.credits }} créditos
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Descarga -->
      <div class="mt-6 flex flex-wrap justify-center gap-4">
        <a
          href="/curriculumMap/malla-curricular.pdf"
          download
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Descargar PDF
        </a>
        <button
          @click="printImage"
          class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd" />
          </svg>
          Imprimir
        </button>
      </div>
    </div>

    <!-- Modal para zoom -->
    <div
      v-if="isZoomed"
      class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      @click.self="closeZoom"
    >
      <div class="relative max-w-6xl max-h-screen">
        <img
          :src="mallaImage"
          alt="Malla curricular ampliada"
          class="max-w-full max-h-screen object-contain"
        />
        <button
          @click="closeZoom"
          class="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition"
          aria-label="Cerrar zoom"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Configuración de la imagen (reemplaza con tu ruta real)
const mallaImage = '/CurriculumMap/malla.jpg'

// Estado del componente
const activeView = ref('completa') // 'completa' o 'semestral'
const selectedSemester = ref('all')
const isZoomed = ref(false)
const mainImage = ref(null)

// Opciones de visualización
const viewOptions = [
  { value: 'completa', label: 'Vista completa' },
  { value: 'semestral', label: 'Vista por semestres' }
]

// Datos de ejemplo para la vista semestral (deberías reemplazarlos con tus datos reales)
const semestersData = [
  {
    number: 1,
    courses: [
      { code: 'PED-101', name: 'Introducción a la Pedagogía', credits: 4 },
      { code: 'PSI-101', name: 'Psicología General', credits: 4 },
      { code: 'FIL-101', name: 'Filosofía de la Educación', credits: 3 }
    ]
  },
  {
    number: 2,
    courses: [
      { code: 'PED-102', name: 'Didáctica General', credits: 4 },
      { code: 'PSI-102', name: 'Psicología del Desarrollo', credits: 4 },
      { code: 'SOC-101', name: 'Sociología de la Educación', credits: 3 }
    ]
  }
  // Agrega los demás semestres...
]

// Filtrar semestres según selección
const filteredSemesters = computed(() => {
  if (selectedSemester.value === 'all') {
    return semestersData
  }
  return semestersData.filter(s => s.number === parseInt(selectedSemester.value))
})

// Funciones para el zoom
const openZoom = () => {
  isZoomed.value = true
  document.body.style.overflow = 'hidden'
}

const closeZoom = () => {
  isZoomed.value = false
  document.body.style.overflow = ''
}

// Función para imprimir
const printImage = () => {
  const printWindow = window.open('', '_blank')
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Malla Curricular - Ciencias de la Educación</title>
        <style>
          body { text-align: center; margin: 0; padding: 20px; }
          img { max-width: 100%; height: auto; }
          h1 { margin-bottom: 20px; color: #1a365d; }
          @media print {
            body { padding: 0; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>Malla Curricular - Ciencias de la Educación</h1>
        <img src="${mallaImage}" alt="Malla curricular completa">
        <button onclick="window.print()" style="margin-top: 20px; padding: 10px 20px; background: #1a365d; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Imprimir
        </button>
      </body>
    </html>
  `)
  printWindow.document.close()
}
</script>

<style scoped>
.curriculum-map {
  scroll-margin-top: 2rem;
}

/* Animación para el zoom */
img {
  transition: transform 0.3s ease;
}

img:hover {
  transform: scale(1.02);
}
</style>
<template>
  <section class="graduation-options py-16 bg-gray-50">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-blue-800 mb-3">Modalidades de Titulación</h2>
        <p class="text-gray-600 max-w-3xl mx-auto">
          Conoce las opciones para obtener tu título profesional en Ciencias de la Educación - UMSS
        </p>
      </div>

      <!-- Filtros -->
      <div class="flex flex-wrap justify-center gap-3 mb-8">
        <button
          v-for="filter in filters"
          :key="filter.value"
          @click="activeFilter = filter.value"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all"
          :class="{
            'bg-blue-600 text-white': activeFilter === filter.value,
            'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50': activeFilter !== filter.value
          }"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Modalidades -->
      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="modalidad in filteredModalidades"
          :key="modalidad.id"
          class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-start mb-4">
              <div class="bg-blue-100 p-3 rounded-lg mr-4">
                <Icon :name="modalidad.icon" class="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 class="text-xl font-semibold text-gray-800">{{ modalidad.nombre }}</h3>
                <p class="text-blue-600 font-medium">{{ modalidad.duracion }}</p>
              </div>
            </div>

            <div class="prose text-gray-600 mb-4">
              <p>{{ modalidad.descripcion }}</p>
            </div>

            <div class="mt-4">
              <h4 class="font-medium text-gray-800 mb-2">Requisitos:</h4>
              <ul class="space-y-2">
                <li v-for="(req, index) in modalidad.requisitos" :key="index" class="flex items-start">
                  <span class="text-blue-500 mr-2 mt-1">•</span>
                  <span class="text-gray-700">{{ req }}</span>
                </li>
              </ul>
            </div>

            <div class="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-3">
              <span
                v-for="tag in modalidad.tags"
                :key="tag"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Nota adicional -->
      <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <p class="text-blue-800">
          <strong>Importante:</strong> Todas las modalidades requieren haber aprobado el 100% del plan de estudios y no tener deudas con la UMSS.
          Para más información, contactar con la <a href="#" class="text-blue-600 underline">Unidad de Titulación</a>.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
// Datos específicos para Ciencias de la Educación - UMSS
const modalidades = [
  {
    id: 1,
    nombre: 'Tesis de Grado',
    icon: 'mdi:file-document-edit',
    duracion: '6-12 meses',
    descripcion: 'Investigación original sobre un tema educativo relevante, con rigor metodológico y contribución al campo disciplinar.',
    requisitos: [
      'Aprobación del proyecto de tesis',
      'Tutor asignado por la carrera',
      'Defensa pública ante tribunal',
      'Cumplir con normas APA y formato UMSS'
    ],
    tags: ['Investigación', 'Individual', 'Evaluación oral'],
    tipo: 'investigacion'
  },
  {
    id: 2,
    nombre: 'Examen de Grado',
    icon: 'mdi:book-education',
    duracion: '1-3 meses',
    descripcion: 'Evaluación integral de conocimientos mediante examen escrito y/o oral sobre las áreas fundamentales de la carrera.',
    requisitos: [
      'Promedio general mínimo de 75/100',
      'Aprobar examen escrito eliminatorio',
      'Sustentación oral ante tribunal',
      'Portafolio de evidencias académicas'
    ],
    tags: ['Conocimientos', 'Individual', 'Evaluación escrita/oral'],
    tipo: 'evaluacion'
  },
  {
    id: 3,
    nombre: 'Trabajo Dirigido',
    icon: 'mdi:briefcase-account',
    duracion: '4-8 meses',
    descripcion: 'Intervención educativa en contexto real con diagnóstico, implementación y evaluación de propuesta pedagógica.',
    requisitos: [
      'Convenio con institución receptora',
      'Informe técnico detallado',
      'Evidencias de la intervención',
      'Sustentación pública de resultados'
    ],
    tags: ['Práctica', 'Campo educativo', 'Aplicación'],
    tipo: 'practica'
  },
  {
    id: 4,
    nombre: 'Excelencia Académica',
    icon: 'mdi:medal',
    duracion: 'Directo',
    descripcion: 'Titulación automática para estudiantes con destacado rendimiento académico durante toda la carrera.',
    requisitos: [
      'Promedio general ≥ 85/100',
      'Haber culminado en tiempo reglamentario',
      'No haber reprobado ninguna materia',
      'Aprobar examen de suficiencia'
    ],
    tags: ['Mérito', 'Alto rendimiento', 'Automático'],
    tipo: 'especial'
  }
]

const filters = [
  { value: 'todas', label: 'Todas' },
  { value: 'investigacion', label: 'Investigación' },
  { value: 'evaluacion', label: 'Evaluación' },
  { value: 'practica', label: 'Práctica' },
  { value: 'especial', label: 'Especiales' }
]

const activeFilter = ref('todas')

const filteredModalidades = computed(() => {
  if (activeFilter.value === 'todas') return modalidades
  return modalidades.filter(m => m.tipo === activeFilter.value)
})
</script>

<style scoped>
.graduation-options {
  scroll-margin-top: 2rem;
}

.prose p {
  line-height: 1.6;
  margin-bottom: 1rem;
}
</style>
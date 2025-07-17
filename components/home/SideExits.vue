<template>
  <section class="technical-programs py-16 bg-gray-50">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-blue-800 mb-3">Programas de Formación Técnica</h2>
        <p class="text-gray-600 max-w-3xl mx-auto">
          Salidas laterales con titulación técnica intermedia en Ciencias de la Educación - UMSS
        </p>
      </div>

      <!-- Pestañas de programas -->
      <div class="flex flex-wrap justify-center gap-3 mb-8">
        <button
          v-for="program in programs"
          :key="program.id"
          @click="activeProgram = program.id"
          class="px-6 py-3 rounded-lg font-medium transition-all flex items-center"
          :class="{
            'bg-blue-600 text-white': activeProgram === program.id,
            'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50': activeProgram !== program.id
          }"
        >
          <Icon :name="program.icon" class="mr-2" />
          {{ program.name }}
        </button>
      </div>

      <!-- Contenido del programa seleccionado -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden">
        <div class="p-6 md:p-8">
          <!-- Descripción -->
          <div class="mb-8">
            <h3 class="text-xl font-semibold text-blue-700 mb-4 flex items-center border-b pb-2">
              <Icon name="mdi:text-box" class="mr-2" />
              Descripción del Programa
            </h3>
            <p class="text-gray-700 leading-relaxed">
              {{ currentProgram.description }}
            </p>
          </div>

          <!-- Plan de Estudios -->
          <div class="mb-8">
            <h3 class="text-xl font-semibold text-blue-700 mb-4 flex items-center border-b pb-2">
              <Icon name="mdi:book-education" class="mr-2" />
              Plan de Estudios
            </h3>
            
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Semestres -->
              <div v-for="(semester, index) in currentProgram.curriculum" :key="index" class="bg-gray-50 rounded-lg p-4">
                <h4 class="font-medium text-blue-800 mb-3">Semestre {{ index + 1 }}</h4>
                <ul class="space-y-2">
                  <li v-for="(course, i) in semester" :key="i" class="flex items-start">
                    <span class="text-blue-500 mr-2 mt-1">•</span>
                    <span class="text-gray-700">{{ course }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Perfil Profesional -->
          <div>
            <h3 class="text-xl font-semibold text-blue-700 mb-4 flex items-center border-b pb-2">
              <Icon name="mdi:account-tie" class="mr-2" />
              Perfil Profesional
            </h3>
            
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Competencias -->
              <div class="bg-blue-50 rounded-lg p-4">
                <h4 class="font-medium text-blue-800 mb-3 flex items-center">
                  <Icon name="mdi:check-circle" class="mr-2" />
                  Competencias
                </h4>
                <ul class="space-y-2">
                  <li v-for="(skill, i) in currentProgram.profile.skills" :key="'skill'+i" class="flex items-start">
                    <span class="text-blue-500 mr-2 mt-1">•</span>
                    <span class="text-gray-700">{{ skill }}</span>
                  </li>
                </ul>
              </div>
              
              <!-- Campos Laborales -->
              <div class="bg-green-50 rounded-lg p-4">
                <h4 class="font-medium text-green-800 mb-3 flex items-center">
                  <Icon name="mdi:briefcase" class="mr-2" />
                  Campos Laborales
                </h4>
                <ul class="space-y-2">
                  <li v-for="(field, i) in currentProgram.profile.workFields" :key="'field'+i" class="flex items-start">
                    <span class="text-green-500 mr-2 mt-1">•</span>
                    <span class="text-gray-700">{{ field }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Información adicional -->
          <div class="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
            <div class="flex">
              <div class="flex-shrink-0">
                <Icon name="mdi:information" class="h-5 w-5 text-yellow-600" />
              </div>
              <div class="ml-3">
                <h4 class="text-sm font-medium text-yellow-800">Requisitos de titulación</h4>
                <div class="mt-2 text-sm text-yellow-700">
                  <ul class="list-disc pl-5 space-y-1">
                    <li v-for="(req, i) in currentProgram.requirements" :key="'req'+i">
                      {{ req }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nota sobre continuidad -->
      <div class="mt-8 text-center text-sm text-gray-500">
        <p>Estos programas técnicos permiten la continuidad hacia la licenciatura en Ciencias de la Educación</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

// Datos específicos para UMSS
const programsData = [
  {
    id: 'tics',
    name: 'Técnico Superior en TICs Aplicadas a la Educación',
    icon: 'mdi:monitor-cellphone',
    description: 'Programa técnico intermedio que forma especialistas en la integración de tecnologías digitales en procesos educativos, con habilidades para diseñar, implementar y evaluar recursos tecnopedagógicos en diversos contextos formativos.',
    curriculum: [
      [
        'Bases Psicopedagógicas',
        'Tecnologías Educativas I',
        'Ofimática Educativa',
        'Diseño Gráfico para Educación'
      ],
      [
        'Tecnologías Educativas II',
        'Producción de Materiales Digitales',
        'Plataformas Virtuales de Aprendizaje',
        'Metodología de la Investigación'
      ],
      [
        'Diseño Instruccional',
        'Gamificación Educativa',
        'Producción Audiovisual Educativa',
        'Práctica Técnica en Entornos Reales'
      ]
    ],
    profile: {
      skills: [
        'Diseñar recursos educativos digitales',
        'Implementar plataformas virtuales de aprendizaje',
        'Asesorar en integración tecnopedagógica',
        'Evaluar proyectos de TIC en educación',
        'Capacitar docentes en herramientas digitales'
      ],
      workFields: [
        'Centros de recursos tecnológicos educativos',
        'Departamentos TIC en instituciones educativas',
        'Editoriales digitales educativas',
        'Empresas de e-learning',
        'Consultoría tecnopedagógica'
      ]
    },
    requirements: [
      'Aprobar el 100% del plan de estudios',
      'Presentar proyecto técnico aplicado',
      'Aprobar práctica técnica',
      'Sustentación pública del proyecto',
      'No tener deudas con la UMSS'
    ]
  },
  {
    id: 'infantil',
    name: 'Técnico Superior en Educación Infantil',
    icon: 'mdi:human-child',
    description: 'Formación técnica especializada en atención educativa a la primera infancia (0-6 años), con enfoque en desarrollo integral, didáctica específica y atención a la diversidad en contextos formales y no formales.',
    curriculum: [
      [
        'Psicología del Desarrollo Infantil',
        'Didáctica de la Educación Inicial',
        'Juego y Aprendizaje',
        'Expresión Artística en la Infancia'
      ],
      [
        'Neuroeducación Infantil',
        'Estimulación Temprana',
        'Literatura Infantil',
        'Observación y Registro del Comportamiento'
      ],
      [
        'Educación Inclusiva en Primera Infancia',
        'Diseño de Ambientes de Aprendizaje',
        'Alimentación y Nutrición Infantil',
        'Práctica Técnica en Centros Infantiles'
      ]
    ],
    profile: {
      skills: [
        'Diseñar propuestas pedagógicas para primera infancia',
        'Implementar estrategias de estimulación temprana',
        'Evaluar desarrollo infantil integral',
        'Crear ambientes de aprendizaje significativos',
        'Trabajar con familias y comunidad'
      ],
      workFields: [
        'Centros de Educación Inicial públicos/privados',
        'Programas de atención a la primera infancia',
        'Guarderías y centros de cuidado infantil',
        'Espacios de estimulación temprana',
        'Proyectos comunitarios para infancia'
      ]
    },
    requirements: [
      'Aprobar el 100% del plan de estudios',
      'Presentar portafolio de prácticas',
      'Aprobar práctica técnica en centros infantiles',
      'Sustentación de experiencia práctica',
      'No tener deudas con la UMSS'
    ]
  }
]

const programs = [
  { id: 'tics', name: 'TICs Educativas', icon: 'mdi:monitor-cellphone' },
  { id: 'infantil', name: 'Educación Infantil', icon: 'mdi:human-child' }
]

const activeProgram = ref('tics')

const currentProgram = computed(() => {
  return programsData.find(p => p.id === activeProgram.value)
})
</script>

<style scoped>
.technical-programs {
  scroll-margin-top: 2rem;
}

/* Transición suave al cambiar programas */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
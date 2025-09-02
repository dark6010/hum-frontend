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
            'bg-navy-custom text-gold-light': activeTab === tab.id,
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
            <ul class="list-disc list-inside space-y-2">
              <li v-for="(parrafo, index) in institutionalData.historial" :key="index">
                {{ parrafo }}
              </li>
            </ul>
            <div v-if="institutionalData.fundacion" class="mt-6 p-4 bg-blue-50 rounded-lg">
              <p class="font-medium text-blue-800">
                Creada en: {{ institutionalData.fundacion }}
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
  mision: 'Es una institución académica que desarrolla los procesos de formación, investigación, interacción y gestión institucional con excelencia, en el ámbito de las Ciencias de la Educación para contribuir al desarrollo educativo y social a nivel local, nacional e internacional',
  vision: 'Ser una institución universitaria referente y reconocida a nivel nacional, por la calidad en la formación de profesionales en Ciencias de la Educaciones',
  objetivos: [
    'Conocer y aportar políticas educativas pertinentes que respondan cabalmente a la diversidad geográfica, cultural y lingüística del país.',
    'Fomentar el desarrollo de teorías y prácticas educativas innovadoras en función de mejorar los procesos educativos y que contribuya a la creación de una pedagogía plurinacional.',
    'Contribuir a la formación de profesionales en Ciencias de la Educación, que situada crítica y reflexivamente en la realidad boliviana y nuestras diferencias multiculturales, sean activos y partícipes de los procesos de transformación tanto en la sociedad global como en el Sistema Educativo Plurinacional con la aceptación e integración de todos.',
    'Ampliar en los estudiantes la visión de los agentes educativos para que mas allá de la escuela, perciban los retos de nuestra diversidad cultural, la pedagogía y gestión educativa, la educación intra e intercultural, comunitaria, productiva y plurilingüe, la orientación educativa, la psicopedagogía y de educación inclusiva, la tecnología educativa y la investigación social y educativa, para que exista correspondencia con las necesidades y expectativas reales del medio o entorno natura.',
    'Desarrollar en los estudiantes habilidades de investigación científica del fenómeno educativo en el contexto de la realidad nacional, para proponer soluciones alternativas en función de una educación liberadora y descolonizadora.',
    'Contribuir a la producción científica y tecnológica en el área educativa para promover el crecimiento y desarrollo del país.',
    'Formar profesionales capaces de coadyuvar en el mejoramiento de la formación docente de los distintos niveles del Sistema Educativo Plurinacional y de los docentes de la Universidad.',
    'Desarrollar habilidades para el uso adecuado de las NTIC´s en la producción de materiales educativos, cursos a distancia, plataformas virtuales, investigación etnográfica virtual, etc.',
    'Despertar en los estudiantes la conciencia y la educación ambiental para su intervención en programas y proyectos que busquen un real desarrollo sostenible desde el sistema educativo plurinacional.',
    'Tomar mayor responsabilidad en los procesos de desarrollo humano para mejorar la educación de la población en general.'
  ],
  historial: [
    'Creada en abril de 1974, parte del Departamento de Humanidades y Ciencias de la Educación, dependiente de Facultad de Ciencias Puras de UMSS.',
    'Primer plan de estudios, en 1977, una sumatoria de materias destinado a la cualificación de docentes normalistas.',
    'En 1979 se estructuró el plan de estudios por áreas y se privilegia el área de investigación.',
    'En 1983, se establecen los ciclos común y el diferenciado; se proponen áreas de administración, orientación educativa, psicopedagogía y educación popular.',
    'En 1987-1995 se hace diagnóstico y constata que práctica social dominante fue área administrativa y emergentes las de investigación, orientación y educación especial.',
    'En 1995, se define el objeto de estudio y el perfil del licenciado y se realiza la propuesta por objetos de transformación, líneas y dimensiones.',
    'El 2005 se realizó un análisis de la situación del perfil del profesional, partiendo de demandas que deben responder al mencionado perfil.',
    'El 2013 se implementa el nuevo plan de estudios que es parte del rediseño, el mismo está vigente.',
    'En 2018-2020 se ajusta: nuevas y reubicación de asignaturas, definición de menciones, énfasis a práctica preprofesional, reorganización modalidades de titulación y disminución de 8 a 6 materias por semestre.',
    'La malla curricular ajustada, se implementa desde la gestión II/2020.',
    'En mayo del 2022 se aprueba el proceso de autoevaluación.',
    'En octubre del 2023, como resultado de Evaluación Externa, logra la Acreditación con una nota de 87/100.'
  ],
  fundacion: 'abril de 1974'
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
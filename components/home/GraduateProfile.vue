<template>
  <section class="graduate-profile py-16 bg-white">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Encabezado -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-blue-800 mb-3">Perfil de Egresado</h2>
        <p class="text-gray-600 max-w-3xl mx-auto">
          Profesionales capacitados para transformar realidades educativas con excelencia académica y compromiso social
        </p>
      </div>

      <!-- Pestañas -->
      <div class="flex overflow-x-auto pb-2 mb-8 scrollbar-hide">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="flex-shrink-0 px-6 py-3 font-medium text-sm rounded-t-lg transition-colors"
          :class="{
            'bg-blue-600 text-white': activeTab === tab.id,
            'bg-gray-100 text-gray-700 hover:bg-gray-200': activeTab !== tab.id
          }"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Contenido de pestañas -->
      <div class="bg-gray-50 rounded-xl shadow-sm p-6 md:p-8">
        <!-- COMPETENCIAS -->
        <div v-show="activeTab === 'competencias'" class="space-y-8">
          <div v-for="(grupo, index) in competencias" :key="index" class="competence-group">
            <h3 class="text-xl font-semibold text-blue-700 mb-4 flex items-center">
              <Icon :name="grupo.icon" class="mr-2 text-blue-500" />
              {{ grupo.categoria }}
            </h3>
            <ul class="grid md:grid-cols-2 gap-4">
              <li v-for="(competencia, i) in grupo.items" :key="i" class="bg-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition">
                <div class="flex items-start">
                  <span class="text-blue-500 mr-3 mt-1">
                    <Icon name="mdi:check-circle" />
                  </span>
                  <div>
                    <h4 class="font-medium text-gray-800">{{ competencia.titulo }}</h4>
                    <p class="text-gray-600 text-sm mt-1">{{ competencia.descripcion }}</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- CAMPOS LABORALES -->
        <div v-show="activeTab === 'campos'" class="space-y-8">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(campo, index) in camposLaborales" :key="index" class="bg-white rounded-lg shadow-xs border border-gray-100 overflow-hidden hover:shadow-md transition">
              <div class="bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-3">
                <h3 class="text-lg font-semibold text-white flex items-center">
                  <Icon :name="campo.icon" class="mr-2" />
                  {{ campo.area }}
                </h3>
              </div>
              <div class="p-4">
                <ul class="space-y-3">
                  <li v-for="(item, i) in campo.puestos" :key="i" class="flex items-start">
                    <span class="text-blue-500 mr-2 mt-1">•</span>
                    <span class="text-gray-700">{{ item }}</span>
                  </li>
                </ul>
                <div v-if="campo.instituciones" class="mt-4 pt-3 border-t border-gray-100">
                  <p class="text-sm font-medium text-gray-500 mb-2">Instituciones:</p>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="(inst, idx) in campo.instituciones" :key="idx" class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {{ inst }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sello UMSS -->
      <div class="mt-12 text-center">
        <div class="inline-flex items-center bg-blue-50 px-6 py-3 rounded-full">
          <Icon name="mdi:shield-check" class="text-blue-600 text-2xl mr-2" />
          <span class="text-blue-800 font-medium">Formación con calidad académica - UMSS</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Datos específicos para Ciencias de la Educación - UMSS
const competencias = [
  {
    categoria: "Competencias Pedagógicas",
    icon: "mdi:teach",
    items: [
      {
        titulo: "Diseño curricular",
        descripcion: "Elaborar planes y programas educativos según contextos y necesidades"
      },
      {
        titulo: "Evaluación educativa",
        descripcion: "Aplicar instrumentos de evaluación con enfoque formativo e inclusivo"
      },
      {
        titulo: "Innovación didáctica",
        descripcion: "Implementar estrategias pedagógicas con uso de TICs"
      },
      {
        titulo: "Atención a la diversidad",
        descripcion: "Desarrollar prácticas educativas interculturales e inclusivas"
      }
    ]
  },
  {
    categoria: "Competencias Investigativas",
    icon: "mdi:microscope",
    items: [
      {
        titulo: "Investigación educativa",
        descripcion: "Diseñar proyectos de investigación para resolver problemas pedagógicos"
      },
      {
        titulo: "Análisis crítico",
        descripcion: "Interpretar realidades educativas con fundamento teórico-metodológico"
      },
      {
        titulo: "Producción académica",
        descripcion: "Elaborar documentos científicos según normas de publicación"
      }
    ]
  },
  {
    categoria: "Competencias Sociales",
    icon: "mdi:account-group",
    items: [
      {
        titulo: "Liderazgo educativo",
        descripcion: "Gestionar proyectos educativos comunitarios con participación social"
      },
      {
        titulo: "Mediación intercultural",
        descripcion: "Promover diálogo de saberes en contextos multiculturales"
      },
      {
        titulo: "Ética profesional",
        descripcion: "Actuar con responsabilidad social y compromiso con la educación pública"
      }
    ]
  }
]

const camposLaborales = [
  {
    area: "Educación Formal",
    icon: "mdi:school",
    puestos: [
      "Docente en niveles inicial, primario y secundario",
      "Director/Coordinador de unidades educativas",
      "Asesor pedagógico en instituciones educativas",
      "Diseñador de materiales educativos"
    ],
    instituciones: [
      "SEDUCA", 
      "Unidades Educativas fiscales/privadas",
      "Institutos técnicos"
    ]
  },
  {
    area: "Educación Superior",
    icon: "mdi:account-tie",
    puestos: [
      "Docente universitario",
      "Investigador educativo",
      "Planificador curricular",
      "Evaluador de calidad educativa"
    ],
    instituciones: [
      "UMSS", 
      "Universidades privadas",
      "Institutos de formación docente"
    ]
  },
  {
    area: "Sector Público",
    icon: "mdi:government",
    puestos: [
      "Técnico en ministerios de educación",
      "Diseñador de políticas educativas",
      "Evaluador de proyectos educativos",
      "Capacitador docente"
    ],
    instituciones: [
      "Ministerio de Educación", 
      "Gobiernos autónomos",
      "Organismos internacionales"
    ]
  },
  {
    area: "ONGs y Cooperación",
    icon: "mdi:handshake",
    puestos: [
      "Coordinador de proyectos educativos",
      "Facilitador en educación no formal",
      "Consultor en desarrollo educativo",
      "Educador comunitario"
    ],
    instituciones: [
      "UNICEF", 
      "Save the Children",
      "Fundaciones educativas"
    ]
  },
  {
    area: "Sector Privado",
    icon: "mdi:briefcase",
    puestos: [
      "Diseñador de programas de capacitación",
      "Especialista en RRHH y formación",
      "Consultor educativo empresarial",
      "Editorialista especializado"
    ],
    instituciones: [
      "Empresas privadas", 
      "Editoriales",
      "Consultoras educativas"
    ]
  },
  {
    area: "Emprendimiento Educativo",
    icon: "mdi:lightbulb-on",
    puestos: [
      "Creador de centros educativos alternativos",
      "Desarrollador de apps educativas",
      "Asesor educativo independiente",
      "Creador de contenidos digitales"
    ],
    instituciones: [
      "Centros propios", 
      "Plataformas digitales",
      "Consultoría independiente"
    ]
  }
]

const tabs = [
  { id: 'competencias', label: 'Competencias Profesionales' },
  { id: 'campos', label: 'Campos Laborales' }
]

const activeTab = ref('competencias')
</script>

<style scoped>
.graduate-profile {
  scroll-margin-top: 2rem;
}

.competence-group:not(:last-child) {
  padding-bottom: 2rem;
  border-bottom: 1px dashed #e5e7eb;
  margin-bottom: 2rem;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
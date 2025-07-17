<template>
  <section class="organizational-structure py-16 bg-gray-50">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-blue-800 mb-3">Estructura Organizacional</h2>
        <p class="text-gray-600 max-w-3xl mx-auto">
          Conoce el equipo y servicios que apoyan tu formación en Ciencias de la Educación - UMSS
        </p>
      </div>

      <!-- Filtro por áreas -->
      <div class="flex flex-wrap justify-center gap-3 mb-8">
        <button
          v-for="area in areas"
          :key="area.id"
          @click="activeArea = area.id"
          class="px-4 py-2 rounded-full text-sm font-medium transition-all"
          :class="{
            'bg-blue-600 text-white': activeArea === area.id,
            'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50': activeArea !== area.id
          }"
        >
          {{ area.label }}
        </button>
      </div>

      <!-- Contenido principal -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Tarjeta para cada unidad -->
        <div
          v-for="unit in filteredUnits"
          :key="unit.id"
          class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition"
        >
          <div class="bg-gradient-to-r from-blue-700 to-blue-800 p-4">
            <h3 class="text-xl font-semibold text-white flex items-center">
              <Icon :name="unit.icon" class="mr-2" />
              {{ unit.nombre }}
            </h3>
          </div>
          
          <div class="p-6">
            <!-- Responsable -->
            <div class="mb-4 flex items-start">
              <Icon name="mdi:account-tie" class="text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 class="font-medium text-gray-800">Responsable:</h4>
                <p class="text-gray-600">{{ unit.responsable }}</p>
                <p class="text-sm text-gray-500 mt-1">{{ unit.cargo }}</p>
              </div>
            </div>

            <!-- Contacto -->
            <div class="mb-4 flex items-start">
              <Icon name="mdi:email" class="text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 class="font-medium text-gray-800">Contacto:</h4>
                <p class="text-gray-600">{{ unit.contacto.email }}</p>
                <p class="text-sm text-gray-600">{{ unit.contacto.telefono }}</p>
              </div>
            </div>

            <!-- Horario de atención -->
            <div class="mb-4 flex items-start">
              <Icon name="mdi:clock" class="text-blue-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h4 class="font-medium text-gray-800">Horario:</h4>
                <p class="text-gray-600">{{ unit.horario }}</p>
              </div>
            </div>

            <!-- Funciones principales -->
            <div>
              <h4 class="font-medium text-gray-800 mb-2 flex items-center">
                <Icon name="mdi:clipboard-list" class="text-blue-600 mr-2" />
                Funciones principales:
              </h4>
              <ul class="space-y-2">
                <li v-for="(funcion, index) in unit.funciones" :key="index" class="flex items-start">
                  <span class="text-blue-500 mr-2 mt-1">•</span>
                  <span class="text-gray-700">{{ funcion }}</span>
                </li>
              </ul>
            </div>

            <!-- Servicios destacados -->
            <div v-if="unit.servicios" class="mt-4 pt-4 border-t border-gray-100">
              <h4 class="font-medium text-gray-800 mb-2 flex items-center">
                <Icon name="mdi:account-group" class="text-blue-600 mr-2" />
                Servicios:
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="(servicio, idx) in unit.servicios"
                  :key="idx"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {{ servicio }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Nota adicional -->
      <div class="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <p class="text-blue-800">
          <strong>Ubicación física:</strong> Todos estos equipos se encuentran en el Edificio de la Facultad de Humanidades - UMSS, 
          <a href="https://maps.app.goo.gl/..." target="_blank" class="text-blue-600 underline">Calle xxx, Campus Central</a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
// Datos específicos para Ciencias de la Educación - UMSS
const unidades = [
  {
    id: 1,
    nombre: "Secretaría de Carrera",
    icon: "mdi:desktop-classic",
    area: "administrativo",
    responsable: "Lic. María Pérez",
    cargo: "Secretaria Administrativa",
    contacto: {
      email: "secretaria.educacion@umss.edu.bo",
      telefono: "+591 4 4234567 int. 123"
    },
    horario: "Lunes a Viernes: 8:00 - 12:30 / 14:30 - 18:30",
    funciones: [
      "Gestión de trámites académicos",
      "Registro y control de calificaciones",
      "Emisión de certificados",
      "Coordinación de horarios",
      "Atención al estudiante"
    ],
    servicios: [
      "Certificados",
      "Matrículas",
      "Trámites"
    ]
  },
  {
    id: 2,
    nombre: "Jefatura de Departamento Técnico Pedagógico",
    icon: "mdi:account-tie-hat",
    area: "academico",
    responsable: "M.Sc. Juan Rodríguez",
    cargo: "Jefe de Departamento",
    contacto: {
      email: "jefatura.dtp@umss.edu.bo",
      telefono: "+591 4 4234567 int. 124"
    },
    horario: "Lunes a Viernes: 9:00 - 12:00 / 15:00 - 18:00",
    funciones: [
      "Planificación curricular",
      "Supervisión pedagógica",
      "Evaluación docente",
      "Innovación educativa",
      "Gestión de prácticas preprofesionales"
    ]
  },
  {
    id: 3,
    nombre: "Programa de Gestión Educativa",
    icon: "mdi:chart-box",
    area: "academico",
    responsable: "Lic. Carla Fernández",
    cargo: "Coordinadora",
    contacto: {
      email: "gestion.educativa@umss.edu.bo",
      telefono: "+591 4 4234567 int. 125"
    },
    horario: "Lunes a Jueves: 10:00 - 12:30 / 15:30 - 18:00",
    funciones: [
      "Formación en administración educativa",
      "Capacitación en gestión escolar",
      "Asesoramiento a unidades educativas",
      "Investigación en políticas educativas"
    ],
    servicios: [
      "Talleres",
      "Asesorías",
      "Investigación"
    ]
  },
  {
    id: 4,
    nombre: "Programa de Psicopedagogía",
    icon: "mdi:brain",
    area: "academico",
    responsable: "Lic. Pablo Gutiérrez",
    cargo: "Coordinador",
    contacto: {
      email: "psicopedagogia.educacion@umss.edu.bo",
      telefono: "+591 4 4234567 int. 126"
    },
    horario: "Martes y Jueves: 9:30 - 12:30 / Miércoles: 15:00 - 18:00",
    funciones: [
      "Atención psicopedagógica",
      "Orientación vocacional",
      "Evaluación diagnóstica",
      "Talleres de desarrollo educativo"
    ],
    servicios: [
      "Consultas",
      "Evaluaciones",
      "Talleres"
    ]
  },
  {
    id: 5,
    nombre: "Programa de Territorio",
    icon: "mdi:map-marker-radius",
    area: "extension",
    responsable: "Lic. Ana Vargas",
    cargo: "Coordinadora",
    contacto: {
      email: "territorio.educacion@umss.edu.bo",
      telefono: "+591 4 4234567 int. 127"
    },
    horario: "Lunes a Miércoles: 8:30 - 12:30 / Viernes: 14:00 - 17:00",
    funciones: [
      "Vinculación con comunidades",
      "Proyectos educativos comunitarios",
      "Prácticas en contexto real",
      "Educación popular"
    ]
  },
  {
    id: 6,
    nombre: "Centro de Investigación e Innovación Socioeducativa",
    icon: "mdi:flask",
    area: "investigacion",
    responsable: "Dr. Luis Martínez",
    cargo: "Director",
    contacto: {
      email: "investigacion.educacion@umss.edu.bo",
      telefono: "+591 4 4234567 int. 128"
    },
    horario: "Lunes a Viernes: 9:00 - 12:00",
    funciones: [
      "Promoción de investigación educativa",
      "Publicaciones científicas",
      "Seminarios de actualización",
      "Asesoramiento en proyectos",
      "Convenios interinstitucionales"
    ],
    servicios: [
      "Asesoría metodológica",
      "Publicaciones",
      "Seminarios"
    ]
  }
]

const areas = [
  { id: 'todos', label: 'Todos' },
  { id: 'administrativo', label: 'Administrativo' },
  { id: 'academico', label: 'Académico' },
  { id: 'investigacion', label: 'Investigación' },
  { id: 'extension', label: 'Extensión' }
]

const activeArea = ref('todos')

const filteredUnits = computed(() => {
  if (activeArea.value === 'todos') return unidades
  return unidades.filter(u => u.area === activeArea.value)
})
</script>

<style scoped>
.organizational-structure {
  scroll-margin-top: 2rem;
}

/* Efecto hover para las tarjetas */
.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
}
</style>
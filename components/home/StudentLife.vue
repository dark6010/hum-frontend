<template>
  <section class="student-life py-16 bg-white">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Encabezado -->
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-blue-800 mb-3">Vida Estudiantil</h2>
        <p class="text-gray-600 max-w-3xl mx-auto">
          Espacios de formación integral, comunidad y desarrollo extracurricular en Ciencias de la Educación - UMSS
        </p>
      </div>

      <!-- Pestañas -->
      <div class="flex flex-wrap justify-center gap-3 mb-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-6 py-3 rounded-lg font-medium transition-all flex items-center"
          :class="{
            'bg-blue-600 text-white': activeTab === tab.id,
            'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50': activeTab !== tab.id
          }"
        >
          <Icon :name="tab.icon" class="mr-2" />
          {{ tab.label }}
        </button>
      </div>

      <!-- Contenido de Sociedad Científica -->
      <div v-show="activeTab === 'cientifica'" class="space-y-8">
        <!-- Información general -->
        <div class="bg-blue-50 rounded-xl p-6 md:p-8">
          <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-1/3">
              <div class="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                <h3 class="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <Icon name="mdi:account-group" class="mr-2 text-blue-600" />
                  SOCIEDAD CIENTÍFICA
                </h3>
                <img src="/StudyPoints/img1.jpg" alt="Reunión de la Sociedad Científica" class="w-full rounded mb-4">
                <p class="text-sm text-gray-600">
                  <strong>Horario de reuniones:</strong> Viernes 16:00 - 18:00<br>
                  <strong>Lugar:</strong> Aula 12 - Facultad de Humanidades
                </p>
              </div>
            </div>
            <div class="md:w-2/3">
              <h3 class="text-xl font-semibold text-blue-800 mb-4">¿Qué es la SOCEED?</h3>
              <p class="text-gray-700 mb-4">
                La Sociedad Científica de Estudiantes de Ciencias de la Educación de la Universidad Mayor de San Simón es una institución que desarrolla actividades de carácter científico e investigativo a beneficio de los estudiantes y la comunidad como aporte a las ciencias sociales y tiene como fin incentivar y desarrollar en los estudiantes, la actividad científica e investigativa, así como toda actividad que fomente el desarrollo del conocimiento en las Ciencias de la Educación, teniendo como sede un ambiente dentro de la Facultad de Humanidades y Ciencias de laEducación.
                <br>
                <b>Misión:</b>
                <br>
                Planificar, ejecutar y difundir hechos investigativos y actividades; en el marco de la producción
                y recreación de conocimiento científico, contribuyendo a la formación del Estudiante de la
                Carrera de Ciencias de la Educación, logrando que sea crítico, reflexivo, analítico y propositivo.
                <br>
                <b>Visión</b>
                <br>
                Ser una institución líder de cambio y transformación de las estructuras internas y externas del
                sistema educativo, en función del dialogo franco e interacción permanente con las instituciones
                del medio educativo, para contribuir al desarrollo de la investigación institucional y académica
                de la UMSS y la sociedad en su conjunto.
              </p>
              
              <div class="grid md:grid-cols-2 gap-6">
                <!-- Objetivos -->
                <div class="bg-white p-4 rounded-lg shadow-xs border border-gray-100">
                  <h4 class="font-medium text-blue-800 mb-3 flex items-center">
                    <Icon name="mdi:target" class="mr-2 text-blue-600" />
                    Objetivos
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(obj, index) in scientificSociety.objectives" :key="index" class="flex items-start">
                      <span class="text-blue-500 mr-2 mt-1">•</span>
                      <span class="text-gray-700">{{ obj }}</span>
                    </li>
                  </ul>
                </div>
                
                <!-- Beneficios -->
                <div class="bg-white p-4 rounded-lg shadow-xs border border-gray-100">
                  <h4 class="font-medium text-blue-800 mb-3 flex items-center">
                    <Icon name="mdi:star" class="mr-2 text-blue-600" />
                    Beneficios
                  </h4>
                  <ul class="space-y-2">
                    <li v-for="(benefit, index) in scientificSociety.benefits" :key="index" class="flex items-start">
                      <span class="text-blue-500 mr-2 mt-1">•</span>
                      <span class="text-gray-700">{{ benefit }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actividades -->
        <div class="mt-8">
          <h3 class="text-2xl font-semibold text-blue-800 mb-6 flex items-center">
            <Icon name="mdi:calendar" class="mr-2 text-blue-600" />
            Actividades 2024
          </h3>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="(activity, index) in scientificSociety.activities" :key="index" class="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition">
              <div class="p-4">
                <div class="flex items-center mb-3">
                  <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 mr-3">
                    {{ activity.month }}
                  </span>
                  <span class="text-sm text-gray-500">{{ activity.type }}</span>
                </div>
                <h4 class="font-medium text-gray-800 mb-2">{{ activity.title }}</h4>
                <p class="text-gray-600 text-sm">{{ activity.description }}</p>
              </div>
              <div v-if="activity.cta" class="bg-gray-50 px-4 py-3 text-right">
                <a :href="activity.cta.link" class="text-sm font-medium text-blue-600 hover:text-blue-800">
                  {{ activity.cta.text }} &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Cómo unirse -->
        <div class="mt-12 bg-green-50 rounded-xl p-6 md:p-8 border border-green-100">
          <div class="md:flex items-center gap-8">
            <div class="md:w-1/3 mb-6 md:mb-0">
              <h3 class="text-2xl font-semibold text-green-800 mb-3">¡Únete a la SOCEED!</h3>
              <img src="/StudyPoints/img2.jpg" alt="Estudiantes investigando" class="rounded-lg shadow-sm">
            </div>
            <div class="md:w-2/3">
              <h4 class="font-medium text-green-800 mb-3">Requisitos para miembros:</h4>
              <ul class="space-y-2 mb-6">
                <li v-for="(req, index) in scientificSociety.requirements" :key="index" class="flex items-start">
                  <span class="text-green-500 mr-2 mt-1">•</span>
                  <span class="text-gray-700">{{ req }}</span>
                </li>
              </ul>
              
              <div class="bg-white p-4 rounded-lg shadow-xs">
                <h4 class="font-medium text-green-800 mb-3">Proceso de admisión:</h4>
                <ol class="space-y-3 list-decimal pl-5">
                  <li v-for="(step, index) in scientificSociety.admissionSteps" :key="index" class="text-gray-700">
                    {{ step }}
                  </li>
                </ol>
                
                <div class="mt-6">
                  <a 
                    href="https://forms.gle/..." 
                    target="_blank"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                  >
                    <Icon name="mdi:file-sign" class="mr-2" />
                    Formulario de inscripción
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenido de Actividades Extracurriculares -->
      <div v-show="activeTab === 'extracurricular'" class="space-y-8">
        <!-- Grupos estudiantiles -->
        <div>
          <h3 class="text-2xl font-semibold text-blue-800 mb-6 flex items-center">
            <Icon name="mdi:account-group" class="mr-2 text-blue-600" />
            Grupos Estudiantiles
          </h3>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div v-for="(group, index) in extracurricular.groups" :key="index" class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div class="p-6">
                <div class="flex items-start">
                  <div class="bg-blue-100 p-3 rounded-lg mr-4">
                    <Icon :name="group.icon" class="text-blue-600 text-2xl" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800">{{ group.name }}</h4>
                    <p class="text-blue-600 text-sm">{{ group.schedule }}</p>
                  </div>
                </div>
                
                <p class="text-gray-600 mt-3">{{ group.description }}</p>
                
                <div class="mt-4">
                  <h5 class="font-medium text-gray-800 mb-2">Actividades recientes:</h5>
                  <ul class="space-y-2">
                    <li v-for="(activity, i) in group.activities" :key="i" class="flex items-start">
                      <span class="text-blue-500 mr-2 mt-1">•</span>
                      <span class="text-gray-700">{{ activity }}</span>
                    </li>
                  </ul>
                </div>
                
                <div class="mt-4 pt-3 border-t border-gray-100">
                  <a :href="group.contact.link" class="text-sm font-medium text-blue-600 hover:text-blue-800 inline-flex items-center">
                    <Icon name="mdi:email" class="mr-1" />
                    {{ group.contact.text }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Eventos anuales -->
        <div class="mt-12">
          <h3 class="text-2xl font-semibold text-blue-800 mb-6 flex items-center">
            <Icon name="mdi:calendar-star" class="mr-2 text-blue-600" />
            Eventos Anuales
          </h3>
          
          <div class="bg-blue-50 rounded-xl p-6">
            <div class="grid md:grid-cols-3 gap-6">
              <div v-for="(event, index) in extracurricular.events" :key="index" class="bg-white rounded-lg shadow-sm p-4 border border-blue-100">
                <div class="flex items-center mb-3">
                  <span class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-800 font-bold mr-3">
                    {{ event.month }}
                  </span>
                  <h4 class="font-medium text-gray-800">{{ event.name }}</h4>
                </div>
                <p class="text-gray-600 text-sm">{{ event.description }}</p>
                <div v-if="event.highlight" class="mt-2">
                  <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                    <Icon name="mdi:star" class="mr-1" />
                    {{ event.highlight }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Voluntariados -->
        <div class="mt-12">
          <h3 class="text-2xl font-semibold text-blue-800 mb-6 flex items-center">
            <Icon name="mdi:hand-heart" class="mr-2 text-blue-600" />
            Oportunidades de Voluntariado
          </h3>
          
          <div class="bg-green-50 rounded-xl p-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div v-for="(volunteer, index) in extracurricular.volunteering" :key="index" class="bg-white rounded-lg shadow-sm overflow-hidden">
                <div class="p-4">
                  <h4 class="font-medium text-gray-800 mb-2">{{ volunteer.title }}</h4>
                  <p class="text-gray-600 text-sm mb-3">{{ volunteer.description }}</p>
                  <div class="flex flex-wrap gap-2 mb-3">
                    <span v-for="(tag, i) in volunteer.tags" :key="i" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {{ tag }}
                    </span>
                  </div>
                  <a :href="volunteer.link" class="text-sm font-medium text-green-600 hover:text-green-800 inline-flex items-center">
                    Más información &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const tabs = [
  { id: 'cientifica', label: 'Sociedad Científica', icon: 'mdi:microscope' },
  { id: 'extracurricular', label: 'Actividades Extracurriculares', icon: 'mdi:calendar-heart' }
]

const activeTab = ref('cientifica')

// Datos de la Sociedad Científica
const scientificSociety = {
  objectives: [
    "Fomentar la investigación científica entre estudiantes",
    "Organizar eventos académicos y científicos",
    "Promover la publicación de trabajos estudiantiles",
    "Establecer redes con sociedades científicas de otras universidades",
    "Asesorar en metodología de investigación a estudiantes"
  ],
  benefits: [
    "Acceso a talleres de investigación exclusivos",
    "Participación en eventos nacionales e internacionales",
    "Posibilidad de publicar en revistas estudiantiles",
    "Certificación de participación que suma a tu CV",
    "Contacto directo con investigadores y docentes"
  ],
  activities: [
    {
      month: "Marzo",
      type: "Taller",
      title: "Introducción a la Investigación Educativa",
      description: "Taller metodológico para iniciar proyectos de investigación",
      cta: { text: "Ver materiales", link: "#" }
    },
    {
      month: "Mayo",
      type: "Congreso",
      title: "III Encuentro de Jóvenes Investigadores",
      description: "Presentación de trabajos estudiantiles con evaluación de docentes",
      cta: { text: "Bases del evento", link: "#" }
    },
    {
      month: "Agosto",
      type: "Concurso",
      title: "Premio al Mejor Artículo Estudiantil",
      description: "Concurso anual de artículos científicos en educación"
    },
    {
      month: "Octubre",
      type: "Charla",
      title: "Metodologías Innovadoras en Investigación Educativa",
      description: "Con invitados internacionales"
    }
  ],
  requirements: [
    "Ser estudiante regular de Ciencias de la Educación",
    "Promedio general mínimo de 70/100",
    "Compromiso de participación continua",
    "Interés demostrado en investigación"
  ],
  admissionSteps: [
    "Llenar el formulario de solicitud",
    "Entrevista con el comité de admisiones",
    "Presentar carta de intención/motivación",
    "Aprobar taller introductorio obligatorio",
    "Pago de cuota simbólica de membresía (Bs. 50)"
  ]
}

// Datos de actividades extracurriculares
const extracurricular = {
  groups: [
    {
      name: "Grupo de Teatro Pedagógico",
      icon: "mdi:drama-masks",
      schedule: "Martes y Jueves 18:00-20:00",
      description: "Espacio para explorar técnicas teatrales aplicadas a la educación",
      activities: [
        "Montaje anual 'Pedagogía en Escena'",
        "Talleres de expresión corporal para docentes",
        "Intervenciones en unidades educativas"
      ],
      contact: {
        text: "teatroeducacion@umss.edu.bo",
        link: "mailto:teatroeducacion@umss.edu.bo"
      }
    },
    {
      name: "Círculo de Lectura Educativa",
      icon: "mdi:book-open",
      schedule: "Miércoles 16:00-18:00",
      description: "Análisis colectivo de textos fundamentales en pedagogía",
      activities: [
        "Club de lectura mensual",
        "Encuentros con autores",
        "Publicación de reseñas críticas"
      ],
      contact: {
        text: "lectura.educativa@umss.edu.bo",
        link: "mailto:lectura.educativa@umss.edu.bo"
      }
    }
  ],
  events: [
    {
      month: "Abr",
      name: "Semana de la Educación",
      description: "Evento central de la carrera con conferencias, talleres y presentaciones",
      highlight: "Evento destacado del año"
    },
    {
      month: "Jun",
      name: "Feria de Prácticas Innovadoras",
      description: "Exposición de proyectos pedagógicos innovadores de estudiantes"
    },
    {
      month: "Sep",
      name: "Encuentro de Egresados",
      description: "Espacio de intercambio entre estudiantes y graduados"
    },
    {
      month: "Nov",
      name: "Festival Artístico-Educativo",
      description: "Muestra de talentos y proyectos artísticos con enfoque pedagógico"
    }
  ],
  volunteering: [
    {
      title: "Alfabetización Comunitaria",
      description: "Programa de enseñanza de lectoescritura en barrios periféricos",
      tags: ["Responsabilidad social", "Práctica pedagógica", "40 horas"],
      link: "#"
    },
    {
      title: "Apoyo Escolar en Hospitales",
      description: "Acompañamiento educativo a niños en situación de hospitalización",
      tags: ["Educación inclusiva", "Horarios flexibles", "Formación en salud"],
      link: "#"
    }
  ]
}
</script>

<style scoped>
.student-life {
  scroll-margin-top: 2rem;
}

/* Efectos hover para tarjetas */
.hover-card:hover {
  transform: translateY(-3px);
  transition: all 0.3s ease;
}
</style>
<template>
  <div>
    <!-- Mensaje de bienvenida -->
    <Presentation />
    <hr>
    <CurriculumMap />
    <hr>
    <DegreeRequirements />
    <hr>
    <GraduateProfile />
    <hr>
    <WelcomeMessage :content="welcomeContent" />
    
    <!-- ¿Por qué estudiar Ciencias de la Educación? -->
    <!-- <WhyStudy :points="studyPoints" /> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '~/store/useGlobalStore';
import Presentation from '@/components/home/Presentation.vue'
import CurriculumMap from '@/components/home/CurriculumMap.vue'
import DegreeRequirements from '@/components/home/DegreeRequirements.vue'
import GraduateProfile from '@/components/home/GraduateProfile.vue'
import WelcomeMessage from '@/components/home/WelcomeMessage.vue'

const store = useGlobalStore();

// Datos del banner
const bannerSlides = ref([
  {
    id: 1,
    image: '/images/banner1.jpg',
    title: 'Excelencia en Educación de la umss',
    subtitle: 'Formando profesionales comprometidos con la transformación educativa'
  },
  {
    id: 2,
    image: '/images/banner2.jpg',
    title: 'Innovación Pedagógica',
    subtitle: 'Tecnologías y metodologías para la educación del siglo XXI'
  },
  {
    id: 3,
    image: '/images/banner3.jpg',
    title: 'Comunidad Educativa',
    subtitle: 'Un espacio para crecer y aprender juntos'
  }
]);

// Mensaje de bienvenida
const welcomeContent = ref({
  title: 'Bienvenidos a la Carrera de Ciencias de la Educación del futuro',
  description: 'Nuestra carrera forma profesionales capaces de analizar, diseñar, implementar y evaluar procesos educativos en diversos contextos. Con un enfoque humanista, crítico y transformador, nuestros egresados están preparados para enfrentar los desafíos del mundo educativo actual.',
  highlights: [
    'Más de 20 años formando educadores de primera',
    'Plan de estudios actualizado',
    'Cuerpo docente altamente calificado',
    'Vinculación con la comunidad educativa',
    'Docentes comprometidos con la educacion',
    'Ambientes totalmente equipados'
  ]
});

// Puntos clave para estudiar la carrera
const studyPoints = ref([
  {
    title: 'Amplio campo laboral',
    description: 'Oportunidades en instituciones educativas, ONGs, empresas y organismos internacionales, universidades locales.'
  },
  {
    title: 'Impacto social',
    description: 'Contribuye directamente al desarrollo educativo del país y la región.'
  },
  {
    title: 'Formación integral',
    description: 'Adquiere conocimientos pedagógicos, psicológicos, sociológicos y tecnológicos.'
  },
  {
    title: 'Investigación educativa al maximo',
    description: 'Participa en proyectos que generan conocimiento para mejorar los procesos de enseñanza.'
  }
]);

// Noticias y eventos (se cargarán desde la API)
const latestNews = ref([
  {_id:1, title:'Noticias financieras',
  images:['/images/banner3.jpg'],
  createdAt:new Date(),
  category:'nacional',
  excerpt:'se encontro oro en tal lugar'},
  {_id:2, title:'Llego una nave espacial',
  images:['/images/banner2.jpg'],
  createdAt:new Date(),
  category:'internacional',
  excerpt:'nuevos posibles avances '},
  {_id:3, title:'Noticias policiales',
  images:['/images/banner4.jpg'],
  createdAt:new Date(),
  category:'nacional',
  excerpt:'mejores planteamientos aparecieron'}]);
const upcomingEvents = ref([
  {id:1, 
  title:'Nuevos avances en el campo de la medicina',
  date:new Date(),
  endTime:'19:20',
  location:'salon 158',
  excerpt:'taller sobre nuevas bacterias'},
  {id:2, 
  title:'apertura de becas',
  date:new Date(),
  endTime:'20:15',
  location:'aula 245',
  excerpt:'se recibira documentacion'},
  {id:3, 
  title:'formacion profeciografica por autoridades',
  date:new Date(),
  endTime:'15:30',
  location:'paseo autonomico',
  excerpt:'inicio de la feria profesiografica'}]);

// Función para cargar datos
const fetchData = async () => {
  try {
    // Cargar noticias
    const newsResponse = await fetch('http://localhost:3001/api/news');
    if (newsResponse.ok) {
      latestNews.value = (await newsResponse.json()).data;
      console.log(4444, latestNews.value )
    }
    
    // Cargar eventos
    // const eventsResponse = await fetch('/api/events?limit=3');
    // if (eventsResponse.ok) {
    //   upcomingEvents.value = await eventsResponse.json();
    // }
    
    // Actualizar estado de carga
    store.setLoading(false);
  } catch (error) {
    console.error('Error fetching data:', error);
    store.setError('Ocurrió un error al cargar los datos. Por favor, intente nuevamente.');
  }
};

onMounted(() => {
  // store.setLoading(true);
  //fetchData();
});
useHead({
  title: 'La carrera',
  meta: [
    { 
      name: 'description', 
      content: 'Página principal de la Carrera de Ciencias de la Educación' 
    },
    // Puedes agregar más meta tags aquí
    { name: 'og:title', content: 'Carrera de Ciencias de la Educación' },
    { name: 'og:image', content: '/Banner/banner1.jpg' }
  ],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
  ]
})
</script>
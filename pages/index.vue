<template>
    <div>
      
      <!-- Banner principal -->
      <Banner :slides="bannerSlides" />
      
      <!-- Noticias y eventos -->
      <NewsEvents :news="latestNews" :events="upcomingEvents" />
      
      <!-- ¿Por qué estudiar Ciencias de la Educación? -->
      <WhyStudy :points="studyPoints" />
    </div>
  </template>
  
<script setup>
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faFacebookF, faTwitter, faInstagram, faYoutube, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
  library.add(faFacebookF, faTwitter, faInstagram, faYoutube, faLinkedinIn)
  import { ref, onMounted } from 'vue';
  import { useGlobalStore } from '~/store/useGlobalStore';
  import Banner from '@/components/home/Banner.vue'
  import NewsEvents from '@/components/home/NewsEvents.vue'
  import WhyStudy from '@/components/home/WhyStudy.vue'
  import {BannerSlides} from '~/configs/index.js'
  import {StudyPoints} from '~/configs/index.js'
  const store = useGlobalStore();
  
  // Datos del banner
  const bannerSlides = ref(BannerSlides);
  
  definePageMeta({
    middleware: 'auth'
  })
  
  // Puntos clave para estudiar la carrera
  const studyPoints = ref(StudyPoints);
  
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
    store.setLoading(true);
    fetchData();
  });
</script>
<style>

  /* html, body { */
    /* overflow-x: hidden; */
    /* width: 100%; */
    /* max-width: 100vw; */
  /* } */


</style>
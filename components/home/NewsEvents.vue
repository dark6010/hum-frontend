<template>
    <section class="py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Últimas noticias -->
          <div>
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-blue-800">Últimas noticias</h2>
              <NuxtLink to="/noticias" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Ver todas →
              </NuxtLink>
            </div>
            
            <div class="space-y-6">
              <div v-for="item in news" :key="item.id" class="bg-white rounded-lg shadow overflow-hidden">
                <img v-if="item.images" :src="'http://localhost:3001/images/'+item.images[0]" :alt="item.title" class="w-full h-48 object-cover">
                <div class="p-6">
                  <div class="flex items-center text-sm text-gray-500 mb-2">
                    <span>{{ formatDate(item.createdAt) }}</span>
                    <span class="mx-2">•</span>
                    <span>{{ item.category }}</span>
                  </div>
                  <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ item.title }}</h3>
                  <p class="text-gray-600 mb-4">{{ item.excerpt }}</p>
                  <NuxtLink :to="`/noticias/${item._id}`" class="text-blue-600 hover:text-blue-800 font-medium">
                    Leer más
                  </NuxtLink>
                </div>
              </div>
              
              <div v-if="news.length === 0" class="text-center py-8 text-gray-500">
                No hay noticias disponibles en este momento.
              </div>
            </div>
          </div>
          
          <!-- Próximos eventos -->
          <div>
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-blue-800">Próximos eventos</h2>
              <NuxtLink to="/eventos" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Ver todos →
              </NuxtLink>
            </div>
            
            <div class="space-y-6">
              <div v-for="event in events" :key="event.id" class="bg-white rounded-lg shadow overflow-hidden">
                <div class="p-6">
                  <div class="flex items-start">
                    <div class="bg-blue-100 text-blue-800 rounded-lg p-3 mr-4 text-center">
                      <div class="text-xl font-bold">{{ formatDay(event.date) }}</div>
                      <div class="text-sm uppercase">{{ formatMonth(event.date) }}</div>
                    </div>
                    <div>
                      <h3 class="text-xl font-semibold text-gray-800 mb-1">{{ event.title }}</h3>
                      <div class="flex items-center text-sm text-gray-500 mb-2">
                        <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        <span>{{ formatTime(event.date) }} - {{ event.endTime }}</span>
                      </div>
                      <div class="flex items-center text-sm text-gray-500 mb-3">
                        <svg class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span>{{ event.location }}</span>
                      </div>
                      <p class="text-gray-600 mb-4">{{ event.excerpt }}</p>
                      <NuxtLink :to="`/eventos/${event.slug}`" class="text-blue-600 hover:text-blue-800 font-medium">
                        Más información
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-if="events.length === 0" class="text-center py-8 text-gray-500">
                No hay eventos próximos programados.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const props = defineProps({
    news: {
      type: Array,
      default: () => []
    },
    events: {
      type: Array,
      default: () => []
    }
  });
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  const formatDay = (dateString) => {
    return new Date(dateString).getDate();
  };
  
  const formatMonth = (dateString) => {
    const options = { month: 'short' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };
  
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString('es-ES', options);
  };
  </script>
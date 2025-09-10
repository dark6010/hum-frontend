<template>
  <div class="w-full max-w-full">
    <Navbar />
    <div class="social-sidebar">
      <a href="#" target="_blank" class="social-icon facebook">
        <FontAwesomeIcon :icon="['fab', 'facebook-f']" />
      </a>
      <a href="https://tiktok.com" target="_blank" class="social-icon bg-black">
        <FontAwesomeIcon :icon="['fab', 'tiktok']" />
      </a>
      <a href="#" target="_blank" class="social-icon instagram">
        <FontAwesomeIcon :icon="['fab', 'instagram']" />
      </a>
      <a href="#" target="_blank" class="social-icon youtube">
        <FontAwesomeIcon :icon="['fab', 'youtube']" />
      </a>
      <a href="#" target="_blank" class="social-icon linkedin">
        <FontAwesomeIcon :icon="['fab', 'linkedin-in']" />
      </a>
    </div>
    <NuxtPage />
    <Footer />
    
    <!-- Loading overlay -->
    <div v-if="store.isLoading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-xl flex items-center">
        <svg class="animate-spin h-8 w-8 text-blue-600 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="text-gray-800">Cargando...</span>
      </div>
    </div>
    
    <!-- Error notification -->
    <div v-if="store.error" class="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-md">
      <div class="flex items-center">
        <svg class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>{{ store.error }}</span>
      </div>
    </div>
    
    <!-- Success notification -->
    <div v-if="store.success" class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-md">
      <div class="flex items-center">
        <svg class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span>{{ store.success }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGlobalStore } from '~/store/useGlobalStore';
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
// app.vue o layout default.vue
const { isAuthenticated, checkAuth } = useAuth();

onMounted(async () => {
  await checkAuth();
});
const store = useGlobalStore();
</script>
<style>
.social-sidebar {
  position: fixed;
  left: 0%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px 5px;
  border-radius: 0 10px 10px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.social-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 0;
  border-radius: 50%;
  color: white;
  font-size: 18px;
  transition: all 0.3s ease;
}

.social-icon:hover {
  transform: scale(1.1);
}

.facebook { background-color: #3b5998; }
.twitter { background-color: #1da1f2; }
.instagram { background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d); }
.youtube { background-color: #ff0000; }
.linkedin { background-color: #0077b5; }
</style>
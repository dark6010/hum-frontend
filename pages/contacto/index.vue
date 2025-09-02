<template>
  <div>
    <!-- Mensaje de bienvenida -->
    <Contact />
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '~/store/useGlobalStore';
import Contact from '@/components/home/Contact.vue'
definePageMeta({
  middleware: 'auth'
})
</script>
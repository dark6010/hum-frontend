<template>
  <div>
    <Dependencies />
    
    <!-- ¿Por qué estudiar Ciencias de la Educación? -->
    <!-- <WhyStudy :points="studyPoints" /> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '~/store/useGlobalStore';
import Dependencies from '@/components/home/Dependencies.vue'
definePageMeta({
  middleware: 'auth'
})
</script>
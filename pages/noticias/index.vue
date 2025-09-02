<template>
  <div>
    <p>sera sector donde se subiran las noticias</p>
    
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
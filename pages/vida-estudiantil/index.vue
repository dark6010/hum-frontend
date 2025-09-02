<template>
  <div>
    <!-- Mensaje de bienvenida -->
    <StudentLife />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '~/store/useGlobalStore';
import StudentLife from '@/components/home/StudentLife.vue'
definePageMeta({
  middleware: 'auth'
})
</script>
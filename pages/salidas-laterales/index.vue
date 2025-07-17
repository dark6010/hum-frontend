<template>
  <div>
    <!-- Mensaje de bienvenida -->
    <SideExits />
    
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useGlobalStore } from '~/store/useGlobalStore';
import SideExits from '@/components/home/SideExits.vue'
</script>
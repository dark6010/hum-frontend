<template>
  <div class="relative h-[70vh] min-h-[500px] overflow-hidden" @mouseenter="stopAutoPlay"
  @mouseleave="startAutoPlay">
    <!-- Slides -->
    <div 
      v-for="(slide, index) in slides"
      :key="slide.id"
      class="absolute inset-0 transition-opacity duration-1000"
      :class="{ 'opacity-100 z-10': currentSlide === index, 'opacity-0 z-0': currentSlide !== index }"
    >
      <img
        :src="slide.image"
        :alt="slide.title"
        class="absolute w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/40 flex items-center justify-center text-center px-4">
        <div>
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">{{ slide.title }}</h2>
          <p class="text-xl md:text-2xl text-white">{{ slide.subtitle }}</p>
        </div>
      </div>
    </div>

    <!-- Controles (Flechas) -->
    <button 
      @click="prevSlide"
      class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 rounded-full p-2 text-white hover:bg-white/50 transition z-20"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
      </svg>
    </button>

    <button 
      @click="nextSlide"
      class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 rounded-full p-2 text-white hover:bg-white/50 transition z-20"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
      </svg>
    </button>

    <!-- Indicadores (Puntos) -->
    <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
      <button 
        v-for="(_, index) in slides"
        :key="index"
        @click="currentSlide = index"
        class="w-3 h-3 rounded-full transition-all bg-white/50 hover:bg-white"
        :class="{ '!bg-white': currentSlide === index }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  slides: { 
    type: Array,
    required: true
  },
  autoPlay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 5000 // 5 segundos
  }
});

const currentSlide = ref(0);
let autoPlayInterval = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + props.slides.length) % props.slides.length;
};

const startAutoPlay = () => {
  if (props.autoPlay) {
    autoPlayInterval = setInterval(nextSlide, props.interval);
  }
};

const stopAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
};

onMounted(() => {
  startAutoPlay();
});

onBeforeUnmount(() => {
  stopAutoPlay();
});
</script>
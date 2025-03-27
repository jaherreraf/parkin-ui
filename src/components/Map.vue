<script setup>
import { ref } from 'vue'
import floorA from '@/assets/floorA.jpg'
import floorB from '@/assets/floorB.jpg'
import floorC from '@/assets/floorC.jpg'

const floors = ref([
  { title: 'Planta Baja', src: floorA },
  { title: 'Piso 1', src: floorB },
  { title: 'Piso 2', src: floorC }
])

const currentSlide = ref(0)

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % floors.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + floors.value.length) % floors.value.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}
</script>

<template>
  <div class="relative w-full overflow-hidden h-full min-h-96">
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-hidden rounded-lg md:h-full">
      <!-- Slides -->
      <div 
        v-for="(floor, index) in floors" 
        :key="index"
        class="absolute inset-0 transition-opacity duration-700 ease-in-out h-full w-full"
        :class="{ 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }"
      >
        <img 
          :src="floor.src" 
          :alt="floor.title" 
          class="w-full h-full object-contain "
        >
        <div class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
          {{ floor.title }}
        </div>
      </div>
    </div>

    <!-- Slider indicators -->
    <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
      <button 
        v-for="(_, index) in floors" 
        :key="index"
        type="button" 
        class="w-3 h-3 rounded-full transition-colors"
        :class="currentSlide === index ? 'bg-white' : 'bg-white/50'"
        @click="goToSlide(index)"
        :aria-label="`Ir a slide ${index + 1}`"
      ></button>
    </div>

    <!-- Slider controls -->
    <button 
      type="button" 
      class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
      @click="prevSlide"
    >
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
        <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
        </svg>
        <span class="sr-only">Anterior</span>
      </span>
    </button>
    
    <button 
      type="button" 
      class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" 
      @click="nextSlide"
    >
      <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
        <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
        </svg>
        <span class="sr-only">Siguiente</span>
      </span>
    </button>
  </div>
</template>
<script setup>
    import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
    import { computed } from 'vue'

    const props = defineProps({
        show: Boolean,       // Si se muestra o no
        message: String,     // El mensaje a mostrar
        type: String         // 'error', 'success', 'warning'
    })

    const notificationClasses = computed(() => ({
        'bg-red-100 border-l-4 border-red-500 text-red-700': props.type === 'error',
        'bg-green-100 border-l-4 border-green-500 text-green-700': props.type === 'success',
        'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700': props.type === 'warning'
    }))

    const iconClasses = computed(() => ({
        'text-red-600': props.type === 'error',
        'text-green-600': props.type === 'success',
        'text-yellow-600': props.type === 'warning'
    }))
</script>
  
  
<template>
    <transition name="slide-fade">
      <div 
        v-if="show"
        class="fixed bottom-4 right-4 w-96 h-24 p-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out flex items-center"
        :class="notificationClasses"
      >
        <ExclamationCircleIcon 
          class="h-6 w-6 mr-2" 
          :class="iconClasses"
        />
        <span class="font-semibold">{{ message }}</span>
      </div>
    </transition>
</template>
<style scoped>
    .slide-fade-enter-active {
    transition: all 0.3s ease-out;
    }

    .slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }

    .slide-fade-enter-from,
    .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
    }
</style>
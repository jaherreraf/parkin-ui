<script setup>
  import { ref, onMounted } from 'vue'
  import { ClockIcon } from '@heroicons/vue/24/outline'
  
  const day = ref(null)
  const month = ref(null)
  const year = ref(null)
  
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  
  function getCurrentDate() {
    const currentDate = new Date();
    day.value = String(currentDate.getDate()).padStart(2, '0')
    month.value = months[currentDate.getMonth()]
    year.value = currentDate.getFullYear()
  }
  
  onMounted(() => {
    getCurrentDate()
  })
</script>
<template>
  <div class="p-6">
    <div class="text-lg flex items-center justify-center gap-2">
      <ClockIcon class="h-5 w-5" ></ClockIcon>
      <span class="font-semibold">{{ year }},</span>
      <span class="font-semibold">{{ month }}</span>
      <span class="font-semibold">{{ day }}</span>
    </div>
  </div>
</template>  
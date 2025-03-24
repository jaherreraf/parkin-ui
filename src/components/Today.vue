<template>
    <div class="p-6">
      <div class="text-lg flex items-center justify-center gap-2">
        <span class="font-semibold">{{ year }},</span>
        <span class="font-semibold">{{ month }}</span>
        <span class="font-semibold">{{ day }}</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Reactive variables to store the date
  const day = ref(null);
  const month = ref(null);
  const year = ref(null);
  
  // Array with month names in Spanish
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  // Function to get the current date
  function getCurrentDate() {
    const currentDate = new Date();
    day.value = String(currentDate.getDate()).padStart(2, '0'); // Day with two digits
    month.value = months[currentDate.getMonth()]; // Month name in Spanish
    year.value = currentDate.getFullYear(); // Year
  }
  
  // Call the function when the component is mounted
  onMounted(() => {
    getCurrentDate();
  });
  </script>
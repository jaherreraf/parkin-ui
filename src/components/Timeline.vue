<template>
    <div class="flex flex-col items-center justify-center  bg-transparent p-4 text-2xl text-white font-bold">
      <!-- Contenedor del Stepper -->
      <div class="w-full max-w-3xl min-h-96 h-full bg-lime-400 rounded-lg  p-6">
        <!-- Timeline (Stepper) -->
        <ol class="relative border-l-2 border-white">
          <!-- Paso 1 -->
          <li class="mb-10 ml-18">
            <span
              class="absolute flex items-center justify-center w-12 h-12 rounded-full -left-6 cursor-pointer"
              :class="{
                'bg-blue-500 text-white': currentStep >= 1,
                'bg-white text-gray-500': currentStep < 1,
              }"
              @click="nextStep(1)"
            >
              1
            </span>
            <h3 class="font-black">Paso 1: Información Básica</h3>
            <p class="text-xl text-gray-500">Aprovecha de toda la experiencia completa que proporciona la app. Registrate ahora y crea tu cuenta de parking</p>
          </li>
          <!-- Paso 2 -->
          <li class="mb-10 ml-18">
            <span
              class="absolute flex items-center justify-center w-12 h-12 rounded-full -left-6 cursor-pointer"
              :class="{
                'bg-blue-500 text-white': currentStep >= 2,
                'bg-white text-gray-500': currentStep < 2,
              }"
             @click="nextStep(2)" 
            >
              2
            </span>
            <h3 class="font-black">Paso 2: Detalles</h3>
            <p class="text-xl text-gray-500">Proporciona más detalles sobre ti.</p>
          </li>
          <!-- Paso 3 -->
          <li class="mb-10 ml-18">
            <span
              class="absolute flex items-center justify-center w-12 h-12 rounded-full -left-6 bottom-0 cursor-pointer"
              :class="{
                'bg-blue-500 text-white': currentStep >= 3,
                'bg-white text-gray-500': currentStep < 3,
              }"
              @click="nextStep(3)"
            >
              3
            </span>
            <h3 class="font-black">Paso 3: Confirmación</h3>
            <p class="text-xl text-gray-500 font-bold">Revisa y confirma tu información.</p>
          </li>
        </ol>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Paso actual
  const currentStep = ref(1);
  
  // Navegación entre pasos
  function nextStep(index) {
    currentStep.value = index
  }
  </script>
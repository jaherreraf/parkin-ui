<script setup>
import { RouterLink } from 'vue-router'
import { ref , onMounted } from 'vue';
import logoDark  from '@/assets/parking-dark.svg'
import logoLight from '@/assets/parking-light.svg'
import xIcon from '@/assets/x.svg'
import facebook from '@/assets/facebook.svg'
import instagram from '@/assets/instagram.svg'
import Timeline from '@/components/Timeline.vue'
const links = ref(
  [
    {title:"Iniciar Sección" , href:"/login"} ,
    {title:"Registrarse" , href:"/register"} ,
    {title:"App" , href:"/app"} ,
  ]
)

</script>
<template>
  <main class="w-screen h-dvh bg-blue-50">
    <header class="w-screen hidden md:flex items-center justify-start h-56 px-12 py-6 gap-36 text-blue-900 font-bold text-xl">
      <img :src="logoDark" class="w-56 h-56 text-blue-900">
      <ul class="flex items-center justify-center gap-2">
        <li v-for="link ,key in links" :key="key" class="w-36 h-12 flex justify-center items-center">
          <router-link :to="link.href">
            {{ link.title }}
          </router-link>
        </li>
      </ul>
    </header>
    <div id="hero" class="grid grid-cols-2 items-start justify-center gap-2">
      <section class="flex w-full h-full justify-center items-center"> 
        <div class="grid grid-flow-row justify-center items-center h-56 gap-6">
          <h1 class="md:text-6xl font-bold text-center">Parking, el nuevo sistema de estacionamiento</h1>
          <p class="md:text-xl text-gray-600 text-center">
            Usa nuestro app para poder facilitar y administrar tu tiempo de manera mas eficiente
          </p>
          <div class="w-full h-full flex items-center justify-center">
            <button class=" w-56 bg-blue-900 text-white rounded-lg p-4 text-center font-bold cursor-pointer transition-all duration-500 hover:border-2 hover:border-sky-500 hover:bg-transparent hover:text-sky-500">
              Comenzar Ahora
            </button>
          </div>
          <div class="w-full flex items-center justify-center">
            <button class=" w-56 bg-blue-900 text-white rounded-bl-lg rounded-tl-lg  p-4 text-center font-bold cursor-pointer transition-all duration-500 hover:border-2 hover:border-sky-500 hover:bg-transparent hover:text-sky-500">
              Iniciar Sección
            </button>
            <button class=" w-56 bg-blue-900 text-white rounded-br-lg rounded-tr-lg  p-4 text-center font-bold cursor-pointer transition-all duration-500 hover:border-2 hover:border-sky-500 hover:bg-transparent hover:text-sky-500">
              Registrarse
            </button>
          </div>
        </div>
      </section>
      <img src="/public/parking.svg" class="">
    </div>
    <div class=" h-full w-dvw flex items-center justify-center">
      <div class="p-6 rounded-lg  bg-white shadow-mg">
      <!-- Título -->
      <span class="text-center text-5xl font-semibold block mb-4">
        ¿Cómo Funciona?
      </span>
      <!-- Descripción -->
      <p class="text-center text-gray-600 mb-8">
        Somos una empresa desarrollada para evitar largas colas en los pagos de tarifas y digitalizar todo el proceso de un estacionamiento, mejorando así la experiencia del usuario.
      </p>
      <!-- Timeline -->
      <Timeline />
    </div>
    </div>
    <div id="contact" class="h-full w-dvw bg-blue-200">
    </div>
    <footer class="bg-blue-400">
      <div class="flex items-center justify-center gap-2 h-full">
        <img :src="facebook" alt="facebook" class="w-12 h-12">
        <img :src="instagram" alt="instagram" class="w-12 h-12">
        <img :src="xIcon" alt="X" class="w-12 h-12">
      
      </div>

    </footer>
    
  </main>
</template>

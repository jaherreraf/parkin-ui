<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

import logo from "@/assets/parking-light.svg"
import car from "@/assets/car.svg"
import wallet from "@/assets/wallet.svg"
import map from "@/assets/map.svg"
import user from "@/assets/user.svg"
import arrow from '@/assets/right-from.svg'
import Today from '@/components/Today.vue';

import VehicleManagement from '@/components/VehicleManagement.vue';
import Movements from '@/components/Movements.vue';

const activator = ref([{title:"Movimientos" , img: wallet},{title:"Operaciones" , img:car},{title:"Paso a paso" , img:map}])
const indexActivator = ref(0)
const username = ref("USERNAME")
const plates = ref(['AEJ62R', 'XYZ123', 'ABC456'])
function handleActivator(index){
  indexActivator.value = index
}
</script>

<template>
  <div class="min-h-screen w-screen flex flex-col md:flex-row bg-gray-50"> 
    <!-- Sidebar Mobile (Bottom) -->
    <aside class="fixed bottom-0 left-0 right-0 md:hidden w-full bg-gray-800 border-t border-gray-700 z-10">
      <ul class="flex items-center justify-around py-3 px-4">
        <li 
          v-for="link, index in activator" :key="index" @click="handleActivator(index)"
            :title="link.title"
          :class="['p-3 w-14 h-14 text-center  rounded-xl cursor-pointer transition-all duration-300 hover:bg-blue-600 hover:shadow-lg', 
            indexActivator == index? 'bg-blue-600 shadow-lg': 'bg-gray-700'
          ]" 
        >
          <img :src="link.img" :alt="link.title" class="w-full h-full filter invert">
        </li>
      </ul>
    </aside>
    <!-- Sidebar Desktop -->
    <aside class="hidden md:flex md:flex-col w-56 bg-gray-800 items-center justify-between py-8 border-r border-gray-700">
      <img :src="logo" class="w-40 h-auto">
      <ul class="w-full flex flex-col items-center justify-center gap-6 px-4">
        <li 
          v-for="link, index in activator" :key="index"
          :title="link.title" 
          @click="handleActivator(index)"
          :class="['p-4 w-16 h-16 text-center  rounded-xl cursor-pointer transition-all duration-300 hover:bg-blue-600 hover:shadow-lg',
          indexActivator == index? 'bg-blue-600 shadow-lg':'bg-gray-700']" 
          >
          <img :src="link.img" :alt="link.title" class="w-full h-full filter invert">
        </li>
      </ul>
      <button class="text-center p-3 rounded-xl cursor-pointer hover:bg-gray-700 transition-colors duration-300">
        <router-link to="/">
          <img :src="arrow" class="w-8 h-8 rotate-180 filter invert opacity-70 hover:opacity-100">
        </router-link>
      </button>
    </aside>
    <!--Main Content Mobile-->
    <div class="md:hidden w-screen h-dvh mb-4 flex flex-col">
      <!--User mobile-->
      <section class="flex items-center justify-between  w-screen p-4">
        <img :src="user" class="w-18 h-18">
        <div class="flex flex-col items-center justify-center">
          Hello, {{username}}
          <Today></Today>
        </div>
        <button class="text-center p-3 rounded-xl cursor-pointer  border hover:bg-gray-700 transition-colors duration-300">
          <router-link to="/">
            <img :src="arrow" class="w-12 h-12 rotate-180">
          </router-link>
        </button>
      </section>
     <!-- Vehicle plate mobile -->
    <div class="w-full bg-slate-50 py-4">
      <!-- Título con padding para separación -->
      <div class="px-4 pb-2">
        <span class="font-bold text-lg text-slate-800 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Mis Vehículos
        </span>
      </div>
      <!-- Contenedor de placas con scroll -->
      <div class="relative w-full h-40 overflow-x-auto scrollbar-hide px-4">
        <div class="flex gap-4 w-max pb-4">
          <div 
            v-for="(plate, index) in plates" 
            :key="index"
            class="grid place-content-center p-3 bg-gradient-to-br from-green-400 to-green-500 shadow-md w-40 h-20 rounded-lg flex-shrink-0"
          >
            <span class="text-white font-bold text-lg tracking-wider">{{ plate }}</span>
          </div>
        </div>
      </div>
    </div>
      <!-- Wallet Mobile -->
      <div class="w-full flex items-center justify-center px-4">
        <div class="relative bg-gradient-to-br from-purple-600 to-indigo-700 w-full max-w-md h-64 shadow-2xl rounded-2xl text-white overflow-hidden">
          <!-- Efecto de brillo -->
          <div class="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
          
          <!-- Logo y título -->
          <div class="absolute top-5 left-5 flex items-center gap-3">
            <img :src="wallet" alt="Wallet" class="h-10 w-10 filter invert">
            <span class="font-bold text-xl tracking-wide">Billetera Digital</span>
          </div>
          
          <!-- Texto central destacado -->
          <div class="absolute inset-0 flex items-center justify-center px-8 text-center">
            <p class="text-lg font-medium bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
              Gestiona tus pagos de forma rápida y segura
            </p>
          </div>      
          <!-- Saldo -->
          <div class="absolute bottom-5 left-5 right-5 flex justify-between items-end">
            <div>
              <p class="text-sm opacity-80">Saldo disponible</p>
              <p class="text-3xl font-bold">Bs <span class="animate-pulse">----</span></p>
            </div>
          </div>
          <!-- Patrón decorativo -->
          <div class="absolute bottom-0 right-0 opacity-20">
            <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="80" cy="80" r="80" fill="white"/>
            </svg>
          </div>
        </div>
      </div>
      <!--Main content Mobile-->
      <div class="font-m-plus-2 h-full my-6 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
        <h3 class="text-lg font-medium text-gray-700 p-6 pb-4 border-b border-gray-200">Actividad Reciente</h3>
        <div class="flex-1 p-6 pt-4">
          <transition name="fade-slide" mode="out-in">
            <div 
              v-if="indexActivator==null"
              key="main"
              class="bg-gray-50 rounded-lg border border-gray-200 w-full h-full flex items-center justify-center"
            >                 
              <span class="text-gray-500 font-medium text-xl text-center max-w-md px-4">
                Área de visualización principal
              </span>
            </div>
            <div 
              v-else-if="indexActivator==0"
              key="movements"
              class="bg-gray-50 rounded-lg border border-gray-200 w-full h-full flex items-center justify-center"
            >                 
              <Movements/>
            </div>

            <div 
              v-else-if="indexActivator==1"
              key="operations"
              class="bg-gray-50 rounded-lg border border-gray-200 w-full h-full flex items-center justify-center"
            >           
              <VehicleManagement/>
            </div>

            <div 
              v-else-if="indexActivator==2"
              key="guide"
              class="bg-gray-50 rounded-lg border border-gray-200 w-full h-full flex items-center justify-center"
            >                 
              <span class="text-gray-500 font-medium text-xl text-center max-w-md px-4">
                Guía paso a paso
              </span>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <!-- Main Content Desktop -->
    <div class="hidden md:flex flex-1  flex-col overflow-auto pb-0">
      <div class="flex h-full w-full items-center justify-center p-6 bg-gray-100">
        <div class="grid h-full w-full  grid-cols-4grid-rows-4  gap-4 p-0">
          <!-- User Profile Card Desktop -->
          <div class="font-m-plus-2 col-span-3 row-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-x-6
          grid grid-cols-2 place-content-center relative">
            <div class="flex justify-center items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-4">
              <img :src="user" class="w-16 h-16 rounded-full border-2 border-blue-500 p-1">
              <div class="flex flex-col">
                <span class="text-xl font-semibold text-gray-800">{{ username }}</span>
                <span class="text-gray-500">usuario@ejemplo.com</span>
              </div>
            </div>
            <div class="flex justify-center items-center gap-2 bg-gray-50 rounded-lg border border-gray-200 p-4">
              <span>Vehículos</span>
            </div>
            <Today class="ml-auto absolute top-2 right-2"></Today>
          </div>
          <!-- Wallet Card -->
          <div class="relative font-m-plus-2 col-span-1 row-span-1 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center p-4">
            <span class="absolute top-4 left-4 text-4xl">WALLET</span>
            <p>Revisa tu saldo Aquí.</p>
            <span class="absolute bottom-4 right-4 text-4xl">SALDO <strong>BS 1000</strong></span>
          </div>
          <!-- Main Content Area -->
          <div class="font-m-plus-2 col-span-4 row-span-3 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
            <h3 class="text-lg font-medium text-gray-700 p-6 pb-4 border-b border-gray-200">Actividad Reciente</h3>
            <div class="flex-1 p-6 pt-4">
             <!--- Manejador de diferentes actividades con animación -->
              <transition name="fade-slide" mode="out-in">
                <div 
                  v-if="indexActivator==null"
                  key="main"
                  class="bg-gray-50 rounded-lg border border-gray-200 w-full h-full flex items-center justify-center"
                >                 
                  <span class="text-gray-500 font-medium text-xl text-center max-w-md px-4">
                    Área de visualización principal
                  </span>
                </div>
                <div 
                  v-else-if="indexActivator==0"
                  key="movements"
                  class="bg-gray-50 rounded-lg border border-gray-200 w-full h-full flex items-center justify-center"
                >                 
                  <Movements/>
                </div>

                <div 
                  v-else-if="indexActivator==1"
                  key="operations"
                  class="bg-gray-50 rounded-lg border border-gray-200 w-full h-full flex items-center justify-center"
                >          
                  <VehicleManagement/>
                </div>

                <div 
                  v-else-if="indexActivator==2"
                  key="guide"
                  class="bg-gray-50 rounded-lg border border-gray-200 w-full h-full flex items-center justify-center"
                >                 
                  <span class="text-gray-500 font-medium text-xl text-center max-w-md px-4">
                    Guía paso a paso
                  </span>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  /* Efectos adicionales */
  .hover-scale {
    transition: transform 0.2s ease;
  }
  .hover-scale:hover {
    transform: scale(1.02);
  }

  .filter.invert {
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);
  }

  /* Asegurar que el contenido no quede detrás del sidebar móvil */
  @media (max-width: 767px) {
    .flex-1 {
      padding-bottom: 5rem; /* Ajusta según la altura de tu sidebar móvil */
    }
  }
</style>
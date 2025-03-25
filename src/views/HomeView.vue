<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue';
import logoDark from '@/assets/parking-dark.svg'
import logoLight from '@/assets/parking-light.svg'
import xIcon from '@/assets/x.svg'
import facebook from '@/assets/facebook.svg'
import instagram from '@/assets/instagram.svg'
import Timeline from '@/components/Timeline.vue'

const links = ref([
  {title:"Inicio", href:"#hero"},
  {title:"Proposito", href:"#purpose"},
  {title:"Contacto", href:"#contact"},
])

const isMenuOpen = ref(false)
</script>

<template>
  <main class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <!-- Header/Navbar -->
    <header class="sticky top-0 z-50 bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
        <!-- Logo -->
        <router-link to="#hero" class="flex items-center">
          <img :src="logoDark" class="h-12 md:h-36 w-auto">
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-8">
          <router-link 
            v-for="(link, index) in links" 
            :key="index"
            :to="link.href"
            class="text-blue-900 font-medium hover:text-blue-600 transition-colors duration-300"
            active-class="text-blue-600 font-semibold"
          >
            {{ link.title }}
          </router-link>
        </nav>

        <!-- Mobile Menu Button -->
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden text-blue-900 focus:outline-none"
        >
          <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <div 
          v-show="isMenuOpen"
          class="md:hidden bg-white shadow-lg pb-4 px-4"
        >
          <router-link
            v-for="(link, index) in links"
            :key="index"
            :to="link.href"
            @click="isMenuOpen = false"
            class="block py-3 text-blue-900 font-medium border-b border-blue-100 hover:text-blue-600"
            active-class="text-blue-600 font-semibold"
          >
            {{ link.title }}
          </router-link>
        </div>
      </transition>
    </header>

    <!-- Hero Section -->
    <section id="hero" class="container mx-auto px-4 py-12 h-full md:py-24 grid md:grid-cols-2 gap-12 items-center">
      <div class="text-center md:text-left space-y-6">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight">
          Parking, el nuevo sistema de estacionamiento
        </h1>
        
        <p class="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
          Usa nuestra app para facilitar y administrar tu tiempo de manera más eficiente
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <router-link 
            to="/app" 
            class="px-8 py-3 max-w-56 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md cursor-pointer"
          >
            Comenzar Ahora
          </router-link>
          
          <div class="flex ">
            <router-link 
              to="/login" 
              class="px-6 py-3 bg-blue-600 text-white rounded-l-lg font-semibold hover:bg-blue-700 transition-colors duration-300 cursor-pointer"
            >
              Iniciar Sesión
            </router-link>
            <router-link 
              to="/register" 
              class="px-6 py-3 bg-blue-800 text-white rounded-r-lg font-semibold hover:bg-blue-900 transition-colors duration-300 cursor-pointer"
            >
              Registrarse
            </router-link>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <img 
          src="/public/parking.svg" 
          alt="Ilustración de estacionamiento" 
          class="max-w-full h-auto md:h-full md:max-w-md lg:max-w-lg"
        >
      </div>
    </section>

    <!-- Purpose Section -->
    <section id="purpose" class="py-16 md:py-24 bg-white">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            ¿Cómo Funciona?
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Somos una empresa desarrollada para evitar largas colas en los pagos de tarifas y digitalizar todo el proceso de un estacionamiento, mejorando así la experiencia del usuario.
          </p>
        </div>
        
        <Timeline />
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-16 md:py-24 bg-blue-100">
      <div class="container mx-auto px-4 max-w-4xl text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
          Contáctanos
        </h2>
        
        <div class="bg-white rounded-xl shadow-md p-8 md:p-12 max-w-2xl mx-auto">
          <form class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-left text-gray-700 mb-2">Nombre</label>
                <input 
                  type="text" 
                  id="name" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
              <div>
                <label for="email" class="block text-left text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
              </div>
            </div>
            
            <div>
              <label for="message" class="block text-left text-gray-700 mb-2">Mensaje</label>
              <textarea 
                id="message" 
                rows="4"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              class="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-blue-900 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-6 md:mb-0">
            <img :src="logoLight" class="h-36 w-auto mb-4">
            <p class="text-blue-200">Simplificando tu experiencia de estacionamiento</p>
          </div>
          
          <div class="flex space-x-6">
            <a href="#" class="hover:text-blue-300 transition-colors duration-300">
              <img :src="facebook" alt="Facebook" class="h-12 w-12">
            </a>
            <a href="#" class="hover:text-blue-300 transition-colors duration-300">
              <img :src="instagram" alt="Instagram"  class="h-12 w-12">
            </a>
            <a href="#" class="hover:text-blue-300 transition-colors duration-300">
              <img :src="xIcon" alt="Twitter"  class="h-12 w-12">
            </a>
          </div>
        </div>
        
        <div class="border-t border-blue-800 mt-8 pt-8 text-center text-blue-300 text-sm">
          <p>© 2023 Parking App. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </main>
</template>

<style>
/* Transiciones suaves para los enlaces */

/* Animación para el timeline */
.timeline-item {
  transition: all 0.3s ease;
}
</style>
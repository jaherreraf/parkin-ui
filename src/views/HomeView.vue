<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue';

import logoDark from '@/assets/parking-dark.svg'
import logoLight from '@/assets/parking-light.svg'
import parking from '@/assets/parking.svg'
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
  <transition name="hero-slide">
    <main class="min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-gray-100 flex flex-col">
    <header class="w-full h-auto flex items-center justify-between px-4 md:px-12 py-4 backdrop-blur-sm">
      <img :src="logoLight" alt="Parking" class="h-32 md:h-40 w-auto">
      <ol class="hidden md:flex items-center justify-center gap-6">
        <li v-for="link, index in links" :key="index" class="hover:text-indigo-300 transition-colors">
          <a :href="link.href" class="px-3 py-2 rounded-lg hover:bg-indigo-900/30">{{ link.title }}</a>
        </li>
      </ol>
      <router-link 
        to="/app" 
        class="relative px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/20"
      >
        Comenzar
      </router-link>
    </header>

    <section id="hero" class="flex-grow flex flex-col md:flex-row items-center justify-center md:justify-around px-6 md:px-12 gap-8 md:gap-16 py-12">
      <div class="flex flex-col items-center md:items-start gap-6 max-w-2xl">
        <div>
          <span class="inline-block border border-indigo-400 text-indigo-300 rounded-lg text-center py-2 px-6 text-sm font-medium">
            Bienvenidos &wedbar;
          </span>
        </div>
        
        <h1 class="font-bold text-4xl md:text-5xl text-center md:text-left leading-tight">
          Sistema de Estacionamiento <br>
          <strong class="text-indigo-300">Parking</strong>
        </h1>
        
        <p class="text-lg text-gray-300 text-center md:text-left">
          Facilita y administra tu tiempo de manera más eficiente
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <router-link 
            to="/register" 
            class="rounded-lg px-6 py-3 border-2 border-indigo-400 text-indigo-100 hover:bg-indigo-900/40 transition-colors text-center font-medium shadow-md"
          >
            Registrarse
          </router-link>
          <router-link 
            to="/login" 
            class="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-6 py-3 shadow-lg font-medium text-center transition-colors"
          >
            Iniciar Sesión
          </router-link>         
        </div>
      </div>
      
      <div class="relative w-full max-w-xl">
        <img :src="parking" class="w-full h-auto rounded-xl shadow-2xl border border-gray-700/50">
        <div class="absolute inset-0 rounded-xl shadow-[inset_0_0_60px_20px_rgba(79,70,229,0.3)] pointer-events-none"></div>
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
  </transition>
</template>

<style>
/* Transiciones suaves para los enlaces */

/* Animación para el timeline */
.timeline-item {
  transition: all 0.3s ease;
}
</style>
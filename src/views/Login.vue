<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import arrow from '@/assets/right-from.svg'
const identification = ref(null);
const password = ref(null);
</script>

<template>
  <div class="w-screen h-dvh bg-violet-100 grid place-content-start md:place-content-center">
    <!-- Contenedor principal con dos columnas -->
    <div id="container" class="bg-violet-500 md:w-[700px] h-dvh md:h-[500px] grid md:grid-cols-2 md:rounded-2xl overflow-hidden">
      <!-- Columna 1: Formulario de inicio de sesión -->
      <div class="bg-white rounded-l-2xl  md:h-full p-12 flex flex-col items-center justify-center gap-8 row-start-2 md:row-start-1">
        <h1 class="font-black text-4xl text-violet-900">Iniciar Sesión</h1>
        <div class="w-full max-w-sm space-y-6">
          <!-- Campo de identificación -->
          <div class="relative">
            <input
              class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-violet-900 rounded-md px-3 py-2 pt-4 transition duration-300 ease focus:outline-none focus:border-violet-950 hover:border-slate-300 shadow-sm focus:shadow"
              name="id"
              id="id"
              v-model="identification"
            />
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-violet-900 text-lg transition-all transform origin-left"
              for="id"
            >
              Usuario o identificación
            </label>
          </div>
          <!-- Campo de contraseña -->
          <div class="relative">
            <input
              class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-violet-900 rounded-md px-3 py-2 pt-4 transition duration-300 ease focus:outline-none focus:border-violet-950 hover:border-slate-300 shadow-sm focus:shadow"
              type="password"
              name="password"
              id="password"
              v-model="password"
            />
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-violet-900 text-lg transition-all transform origin-left"
              for="password"
            >
              Contraseña
            </label>
          </div>
        </div>
        <!-- Botón de inicio de sesión -->
        <button class="bg-violet-950 hover:bg-violet-900 focus:bg-violet-900 focus:text-white hover:text-white transition-all duration-300 text-center font-black text-violet-50 py-3 px-6 rounded-xl cursor-pointer">
          Iniciar Sesión
        </button>
      </div>

      <!-- Columna 2: Mensaje de bienvenida -->
      <div class="text-center p-12 flex flex-col items-center justify-center gap-4 text-white row-start-1">
        <h2 class="text-4xl font-bold">Welcome to Login</h2>
        <p class="text-lg">Ingrese sus datos para disfrutar de nuestra app.</p>
        <span class="text-sm">¿Todavía no tienes cuenta? <a href="/register" class="text-violet-200 hover:underline">Haz clic aquí y regístrate.</a></span>
        <small class="text-xs">Puedes continuar usando la app sin iniciar sesión. No contarás con todos los servicios.</small>
        <button class="mt-4 bg-white text-violet-900 py-2 px-6 rounded-lg hover:bg-violet-50 transition-colors cursor-pointer">
          Ir a la app
        </button>
      </div>
    </div>
    <button class="fixed top-2 left-2 text-center p-4 bg-violet-50 rounded-xl cursor-pointer">
        <router-link to="/">
            <img :src="arrow" class="w-12 h-12 rotate-180">
        </router-link>
    </button>
  </div>
</template>
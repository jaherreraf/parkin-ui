<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import arrow from '@/assets/right-from.svg'
const user = ref({username:'',email:'', phone:'',indentification:'',password:''})
</script>

<template>
  <div class="w-screen h-dvh bg-amber-100 grid place-content-start md:place-content-center">
    <!-- Contenedor principal con dos columnas -->
    <div id="container" class="bg-amber-500 md:w-[700px] h-dvh md:h-[600px] grid md:grid-cols-2 md:rounded-2xl overflow-hidden">
      <!-- Columna 1: Formulario de inicio de sesión -->
      <div class="bg-white rounded-l-2xl  md:h-full p-12 flex flex-col items-center justify-center gap-8 row-start-2 md:row-start-1">
        <h1 class="font-black text-4xl text-amber-900">Registrarse</h1>
        <div class="w-full max-w-sm space-y-6">
          <!-- Campo de identificación -->
          <div class="relative">
            <input
              class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-amber-900 rounded-md px-3 py-2 pt-4 transition duration-300 ease focus:outline-none focus:border-amber-950 hover:border-slate-300 shadow-sm focus:shadow"
              name="username"
              id="username"
              v-model="user.username"
            />
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-amber-900 text-lg transition-all transform origin-left"
              for="username"
            >
              Nombre de usuario
            </label>
          </div>
          <div class="relative">
            <input
              class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-amber-900 rounded-md px-3 py-2 pt-4 transition duration-300 ease focus:outline-none focus:border-amber-950 hover:border-slate-300 shadow-sm focus:shadow"
              name="email"
              id="email"
              v-model="user.email"
            />
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-amber-900 text-lg transition-all transform origin-left"
              for="email"
            >
              Correo Electrónico
            </label>
          </div>
          <div class="relative">
            <input
              class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-amber-900 rounded-md px-3 py-2 pt-4 transition duration-300 ease focus:outline-none focus:border-amber-950 hover:border-slate-300 shadow-sm focus:shadow"
              name="phone"
              id="phone"
              v-model="user.phone"
            />
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-amber-900 text-lg transition-all transform origin-left"
              for="phone"
            >
              Número de telefono
            </label>
          </div>
          <div class="relative">
            <input
              class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-amber-900 rounded-md px-3 py-2 pt-4 transition duration-300 ease focus:outline-none focus:border-amber-950 hover:border-slate-300 shadow-sm focus:shadow"
              name="identification"
              id="identification"
              v-model="user.identification"
            />
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-amber-900 text-lg transition-all transform origin-left"
              for="identification"
            >
              identificación
            </label>
          </div>
          <!-- Campo de contraseña -->
          <div class="relative">
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-amber-900 text-lg transition-all transform origin-left"
              for="password"
            >
              Contraseña
            </label>
            <input
              class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-amber-900 rounded-md px-3 py-2 pt-4 transition duration-300 ease focus:outline-none focus:border-amber-950 hover:border-slate-300 shadow-sm focus:shadow"
              type="password"
              name="password"
              id="password"
              v-model="user.password"
            />
          </div>
        </div>
        <!-- Botón de inicio de sesión -->
        <button class="bg-amber-950 hover:bg-amber-900 focus:bg-amber-900 focus:text-white hover:text-white transition-all duration-300 text-center font-black text-amber-50 py-3 px-6 rounded-xl cursor-pointer">
          Registrarse
        </button>
      </div>

      <!-- Columna 2: Mensaje de bienvenida -->
      <div class="text-center p-12 flex flex-col items-center justify-center gap-4 text-white row-start-1">
        <h2 class="text-4xl font-bold">Welcome to Register</h2>
        <p class="text-lg">Crea tu cuenta ya mismo y poder disfrutar de la maxima experiencia que te ofrece esta app</p>
        <span class="text-sm">¿Ya tienes una cuenta? <a href="/login" class="text-violet-200 hover:underline">Haz clic aquí y inicia sección.</a></span>
        <small class="text-xs">Puedes continuar usando la app sin tener una cuenta. No contarás con todos los servicios.</small>
        <button class="mt-4 bg-white text-amber-900 py-2 px-6 rounded-lg hover:bg-amber-50 transition-colors cursor-pointer">
          Ir a la app
        </button>
      </div>
    </div>
    <button class="fixed top-2 left-2 text-center p-4 bg-amber-50 rounded-xl cursor-pointer">
        <router-link to="/">
            <img :src="arrow" class="w-12 h-12 rotate-180">
        </router-link>
    </button>
  </div>
</template>
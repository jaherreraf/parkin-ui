<script setup>
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router';
  
  import { dataBase } from '@/stores/database'
  import axios from 'axios';

  import { ArrowLeftEndOnRectangleIcon } from '@heroicons/vue/24/outline'
  import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'

  const stores = dataBase()
  const users = ref(stores.users)
  
  const notification = ref({
    message: '',
    type: 'error', // 'error', 'success', 'warning'
    show: false
  })
  const errorTimeout = ref(null)
  const identification = ref(null);
  const password = ref(null);
  function showNotification(message, type = 'error') {
    if (errorTimeout.value) {
      clearTimeout(errorTimeout.value)
    }
    
    notification.value = {
      message,
      type,
      show: true
    }
    
    errorTimeout.value = setTimeout(() => {
      notification.value.show = false
    }, 5000)
  }
  async function getAvatar(identity_number){
    console.log("get_avatar")
    const response = await axios.get(`http://127.0.0.1:8000/users/${identity_number}/photo`)
    const base64 = response.date;
    localStorage.setItem('avatar', base64);
  }
  async function submit(){
    let exists = false
    let data_user = {}
    if(!identification.value || !password.value){
      showNotification("Campos obligatorios", 'error')
      return
    }
    Array.from(users.value).forEach(user =>{
      console.log(user.identity_number)
      if( user.identity_number == parseInt(identification.value) ){
        exists = true
        data_user  = user
      }
    })
    if(!exists){
      showNotification("Ningun usuario tiene esa identificación", 'warning')
      return
    }
    try{
        await axios.post('http://127.0.0.1:8000/login', {
          identity_number: identification.value,
          password: password.value
        }, {
        headers: {
          'Content-Type': 'application/json',
        },
        });
        localStorage.setItem('identity_number', JSON.stringify(identification.value))
        getAvatar(identification.value)
        window.location.href = "/app"
        showNotification("Bienvenido a nuestra app", 'success')
    }catch(error){
      if (error.status ==500){
        showNotification("Contraseña inválida", 'error')
      }else{
        showNotification("Error al iniciar sección", 'error')
      }
    }
  }

</script>

<template>
  <div class="w-screen h-dvh bg-indigo-100 grid place-content-start md:place-content-center">
    <!-- Contenedor principal con dos columnas -->
    <div id="container" class="bg-indigo-500 md:w-[700px] h-dvh md:h-[600px] grid md:grid-cols-2 md:rounded-2xl overflow-hidden">
      <!-- Columna 1: Formulario de inicio de sesión -->
      <div class="bg-white rounded-l-2xl  md:h-full p-12 flex flex-col items-center justify-center gap-8 row-start-2 md:row-start-1">
        <h1 class="font-black text-4xl text-indigo-900">Iniciar Sesión</h1>
        <div class="w-full max-w-sm space-y-6">
          <!-- Campo de identificación -->
          <div class="relative">
            <input
              class="w-full h-18 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-indigo-900 rounded-md px-3 py-2 pt-6 transition duration-300 ease focus:outline-none focus:border-indigo-950 hover:border-slate-300 shadow-sm focus:shadow"
              name="id"
              id="id"
              v-model="identification"
            />
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-indigo-900 text-md transition-all transform origin-left"
              for="id"
            >
              Cédula
            </label>
          </div>
          <!-- Campo de contraseña -->
          <div class="relative">
            <input
              class="w-full h-18 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-indigo-900 rounded-md px-3 py-2 pt-6 transition duration-300 ease focus:outline-none focus:border-indigo-950 hover:border-slate-300 shadow-sm focus:shadow"
              type="password"
              name="password"
              id="password"
              v-model="password"
            />
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-indigo-900 text-md transition-all transform origin-left"
              for="password"
            >
              Contraseña
            </label>
          </div>
        </div>
        <!-- Botón de inicio de sesión -->
        <button class="bg-indigo-950 hover:bg-indigo-900 focus:bg-indigo-900 focus:text-white hover:text-white transition-all duration-300 text-center font-black text-indigo-50 py-3 px-6 rounded-xl cursor-pointer"
        @click="submit">
          Iniciar Sesión
        </button>
      </div>

      <!-- Columna 2: Mensaje de bienvenida -->
      <div class="text-center p-12 flex flex-col items-center justify-center gap-4 text-white row-start-1 text-md">
        <h2 class="text-4xl font-bold">Bienvenido a inicio de sección</h2>
        <p>Ingrese sus datos para disfrutar de nuestra app.</p>
        <span>¿Todavía no tienes cuenta? <a href="/register" class="text-indigo-200 hover:underline">Haz clic aquí y regístrate.</a></span>
        <small>Puedes continuar usando la app sin iniciar sesión. No contarás con todos los servicios.</small>
        <button class="mt-4 bg-white text-indigo-900 py-2 px-6 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer">
          Ir a la app
        </button>
      </div>
    </div>
    <button class="fixed top-2 left-2 text-center p-4 bg-indigo-50 rounded-xl cursor-pointer">
        <router-link to="/">
            <ArrowLeftEndOnRectangleIcon  class="w-8 h-8 md:w-12 md:h-12 " />
        </router-link>
    </button>
    <!-- Notificación dinámica -->
    <transition name="slide-fade">
      <div 
        v-if="notification.show"
        class="fixed bottom-4 right-4 w-96 h-24 p-4 rounded-lg shadow-lg transition-all duration-500 ease-in-out flex items-center"
        :class="{
          'bg-red-100 border-l-4 border-red-500 text-red-700': notification.type === 'error',
          'bg-green-100 border-l-4 border-green-500 text-green-700': notification.type === 'success',
          'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700': notification.type === 'warning'
        }"
      >
      <ExclamationCircleIcon class="h-6 w-6 mr-2"  :class="{'text-red-600': notification.type === 'error','text-green-600': notification.type === 'success','text-yellow-600': notification.type === 'warning'}"/>
        <span class="font-semibold">{{ notification.message }}</span>
      </div>
    </transition>
  </div>
</template>
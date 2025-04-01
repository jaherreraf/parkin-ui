<script setup>
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'
  
  import { dataBase } from '@/stores/database'
  import {Validators} from "@/stores/validate"
  import axios from 'axios'
  
  import { ArrowLeftEndOnRectangleIcon } from '@heroicons/vue/24/outline'
  
  import { useNotification } from '@/stores/notification'
  import Notification from '@/components/Notification.vue'
  const { notification, showNotification } = useNotification()
  
  
  
  const stores = dataBase()
  const users = ref(stores.users)
  const user = ref({username:'',email:'', phone_number:'',identity_number:'',password:''})
  // Estado para errores
  const errors = ref({
    username: '',
    email: '',
    phone: '',
    identification: '',
    password: '',
    general: ''
  })

  const errorTimeout = ref(null)
  function validateForm() {
    let isValid = true
    
    // Validar cada campo
    errors.value.username = Validators.validateUsername(user.value.username)
    errors.value.email = Validators.validateEmail(user.value.email)
    errors.value.phone = Validators.validatePhone(user.value.phone_number)
    errors.value.identification = Validators.validateIdentification(user.value.identity_number)
    errors.value.password = Validators.validatePassword(user.value.password)
    Array.from(users.value).forEach(element => {
      console.log(element.phone_number , element.identity_number)
      if(element.username == user.value.username){
        errors.value.username = "Este nombre de usuario ya existe"
        return
      }
      if(element.email == user.value.email){
        errors.value.email = "Correo Electrónico ya registradó"
        return
      }
      if(element.phone_number == user.value.phone_number){
        errors.value.phone = "Telefono ya registradó"
        return
      }
      if(element.identity_number == user.value.identity_number){
        errors.value.identification = "Cédula de identidad ya registradó"
        return
      }
    })
    // Verificar si hay algún error
    if (Object.values(errors.value).some(error => error !== '')) {
      isValid = false
      showNotification('Por favor corrige los errores en el formulario')
    }
    
    return isValid
  }
  async function submit(){    
    errors.value = {username: '',email: '',phone: '',identification: '',password: '',general: ''}
    if (!validateForm()) return
    try{
      await axios.post('http://127.0.0.1:8000/users/', {
        ...user.value,
        user_type: 'user',
        phone_number: user.value.phone_number || null  // Enviar null si está vacío
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem('identity_number', JSON.stringify(user.value.identity_number));
      showNotification('Usuario registrado con éxito', 'success')
      setTimeout(() => {
        window.location.href = "/app";
      }, 1000)
        // Limpiar formulario después de registro exitoso
      user.value = {username:'',email:'', phone_number:'',identity_number:'',password:''}
    }catch (error) {
      if (error.response?.data?.error?.includes('UNIQUE constraint')) {
        showNotification('El usuario, cédula o email ya están registrados', 'error')
      } else if (error.response?.data?.error) {
        showNotification(error.response.data.error, 'error')
      } else {
        showNotification('Error de comunicación con la base de datos', 'error')
      }
    }
  }
</script>

<template>
  <div class="w-screen h-dvh bg-violet-100 grid place-content-start md:place-content-center">
    <!-- Contenedor principal con dos columnas -->
    <div id="container" class="bg-indigo-500 md:w-[700px] h-dvh md:h-[650px] grid md:grid-cols-2 md:rounded-2xl overflow-hidden">
      <!-- Columna 1: Formulario de Registro -->
      <div class="bg-white rounded-l-2xl  md:h-full px-12 py-8 flex flex-col items-center justify-center gap-8 row-start-2 md:row-start-1">
        <h1 class="font-black text-4xl text-indigo-900">Registrarse</h1>
        <div class="w-full max-w-sm space-y-6">
          <!-- Campo de identificación -->
          <div class="relative">
            <input
              class="w-full h-18 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-indigo-900 rounded-md px-3 py-2 pt-6 transition duration-300 ease focus:outline-none focus:border-indigo-950 hover:border-slate-300 shadow-sm focus:shadow"
              name="username"
              id="username"
              v-model="user.username"
            />
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-indigo-900 text-md transition-all transform origin-left"
              for="username"
            >
              Nombre de usuario
            </label>
            <transition name="fade">
              <p v-if="errors.username" class="text-red-500 text-xs mt-1">
                {{ errors.username }}
              </p>
            </transition>
          </div>
          <div class="relative">
            <input
              class="w-full h-18 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-indigo-900 rounded-md px-3 py-2 pt-6 transition duration-300 ease focus:outline-none focus:border-indigo-950 hover:border-slate-300 shadow-sm focus:shadow"
              name="email"
              id="email"
              v-model="user.email"
            />
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-indigo-900 text-md transition-all transform origin-left"
              for="email"
            >
              Correo Electrónico
            </label>
            <transition name="fade">
              <p v-if="errors.email" class="text-red-500 text-xs mt-1">
                {{ errors.email }}
              </p>
            </transition>
          </div>
          <div class="relative">
            <input
              class="w-full h-18 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-indigo-900 rounded-md px-3 py-2 pt-6 transition duration-300 ease focus:outline-none focus:border-indigo-950 hover:border-slate-300 shadow-sm focus:shadow"
              name="phone"
              id="phone"
              v-model="user.phone_number"
            />
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-indigo-900 text-md transition-all transform origin-left"
              for="phone"
            >
              Número de telefono
            </label>
            <transition name="fade">
              <p v-if="errors.phone" class="text-red-500 text-xs mt-1">
                {{ errors.phone }}
              </p>
            </transition>
          </div>
          <div class="relative">
            <input
              class="w-full h-18 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-indigo-900 rounded-md px-3 py-2 pt-6 transition duration-300 ease focus:outline-none focus:border-indigo-950 hover:border-slate-300 shadow-sm focus:shadow"
              name="identity_number"
              id="identity_number"
              v-model="user.identity_number"
            />
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-indigo-900 text-md transition-all transform origin-left"
              for="identity_number"
            >
              identificación
            </label>
            <transition name="fade">
              <p v-if="errors.identification" class="text-red-500 text-xs mt-1">
                {{ errors.identification }}
              </p>
            </transition>
          </div>
          <!-- Campo de contraseña -->
          <div class="relative">
            <input
              class="w-full h-18 bg-transparent placeholder:text-slate-400 text-indigo-700 text-sm border-2 border-indigo-900 rounded-md px-3 py-2 pt-6 transition duration-300 ease focus:outline-none focus:border-indigo-950 hover:border-slate-300 shadow-sm focus:shadow"
              type="password"
              name="password"
              id="password"
              v-model="user.password"
            />
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-indigo-900 text-md transition-all transform origin-left"
              for="password"
            >
              Contraseña
            </label>
            <transition name="fade">
              <p v-if="errors.password" class="text-red-500 text-xs mt-1">
                {{ errors.password }}
              </p>
            </transition>
          </div>
        </div>
        <!-- Botón de Registrarse -->
        <button class="bg-indigo-950 hover:bg-indigo-900 focus:bg-indigo-900 focus:text-white hover:text-white transition-all duration-300 text-center font-black text-indigo-50 py-3 px-6 rounded-xl cursor-pointer"
        @click="submit"
        >
          Registrarse
        </button>
      </div>
      <!-- Columna 2: Mensaje de bienvenida -->
      <div class="text-center p-12 flex flex-col items-center justify-center gap-4 text-white row-start-1 text-md">
        <h2 class="text-4xl font-bold text-center">Bienvenido a sección de registro</h2>
        <p>Crea tu cuenta ya mismo y poder disfrutar de la maxima experiencia que te ofrece esta app</p>
        <span>¿Ya tienes una cuenta? <a href="/login" class="text-indigo-200 hover:underline">Haz clic aquí y inicia sección.</a></span>
        <small>Puedes continuar usando la app sin tener una cuenta. No contarás con todos los servicios.</small>
        <button class="mt-4 bg-white text-indigo-900 py-2 px-6 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer">
          <router-link to="/app">
            Ir a la app
          </router-link>
        </button>
      </div>
    </div>
    <button class="fixed top-2 left-2 text-center p-4 bg-indigo-50 rounded-xl cursor-pointer">
        <router-link to="/">
            <ArrowLeftEndOnRectangleIcon  class="w-8 h-8 md:w-12 md:h-12 " />
        </router-link>
    </button>
    <!-- Notificación dinámica -->
    <Notification 
      :show="notification.show"
      :message="notification.message"
      :type="notification.type"
    />
  </div>
</template>
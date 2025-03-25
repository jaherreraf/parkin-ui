<script setup>
  import { ref } from 'vue'
  import { RouterLink } from 'vue-router'

  import arrow from '@/assets/right-from.svg'

  import { dataBase } from '@/stores/database'
  import axios from 'axios'
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
  const notification = ref({
    message: '',
    type: 'error', // 'error', 'success', 'warning'
    show: false
  })

  const showError = ref(false)
  const errorTimeout = ref(null)
  const validateUsername = (username) => {
    if (!username) return 'El nombre de usuario es requerido'
    if (username.length > 20) return 'Máximo 20 caracteres'
    if (/\s/.test(username)) return 'No puede contener espacios'
    if (!/^[a-zA-Z0-9]+$/.test(username)) return 'Solo letras y números'

    return ''
  }

  const validateEmail = (email) => {
    if (!email) return 'El email es requerido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email inválido'
    return ''
  }

  const validatePhone = (phone) => {
    if (!phone) return 'El teléfono es requerido'
    if (!/^\d+$/.test(phone)) return 'Solo números'
    if (phone.length < 10) return 'Mínimo 10 dígitos'
    return ''
  }

  const validateIdentification = (id) => {
    if (!id) return 'La identificación es requerida'
    if (!/^\d+$/.test(id)) return 'Solo números'
    return ''
  }

  const validatePassword = (password) => {
    if (!password) return 'La contraseña es requerida'
    if (password.length < 8) return 'Mínimo 8 caracteres'
    return ''
  }
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
  function validateForm() {
    let isValid = true
    
    // Validar cada campo
    errors.value.username = validateUsername(user.value.username)
    errors.value.email = validateEmail(user.value.email)
    errors.value.phone = validatePhone(user.value.phone_number)
    errors.value.identification = validateIdentification(user.value.identity_number)
    errors.value.password = validatePassword(user.value.password)
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
        const response = await axios.post('http://127.0.0.1:8000/users', {
        ...user.value,
        user_type: 'user',
        phone_number: user.value.phone_number || null  // Enviar null si está vacío
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem('user', JSON.stringify(user.value));
      window.location.href = "/app";
      showNotification('Usuario registrado con éxito', 'success')
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
            <transition name="fade">
              <p v-if="errors.username" class="text-red-500 text-xs mt-1">
                {{ errors.username }}
              </p>
            </transition>
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
            <transition name="fade">
              <p v-if="errors.email" class="text-red-500 text-xs mt-1">
                {{ errors.email }}
              </p>
            </transition>
          </div>
          <div class="relative">
            <input
              class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-amber-900 rounded-md px-3 py-2 pt-4 transition duration-300 ease focus:outline-none focus:border-amber-950 hover:border-slate-300 shadow-sm focus:shadow"
              name="phone"
              id="phone"
              v-model="user.phone_number"
            />
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-amber-900 text-lg transition-all transform origin-left"
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
              class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-amber-900 rounded-md px-3 py-2 pt-4 transition duration-300 ease focus:outline-none focus:border-amber-950 hover:border-slate-300 shadow-sm focus:shadow"
              name="identification"
              id="identification"
              v-model="user.identity_number"
            />
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-amber-900 text-lg transition-all transform origin-left"
              for="identification"
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
              class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-amber-900 rounded-md px-3 py-2 pt-4 transition duration-300 ease focus:outline-none focus:border-amber-950 hover:border-slate-300 shadow-sm focus:shadow"
              type="password"
              name="password"
              id="password"
              v-model="user.password"
            />
            <label
              class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-amber-900 text-lg transition-all transform origin-left"
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
        <!-- Botón de inicio de sesión -->
        <button class="bg-amber-950 hover:bg-amber-900 focus:bg-amber-900 focus:text-white hover:text-white transition-all duration-300 text-center font-black text-amber-50 py-3 px-6 rounded-xl cursor-pointer"
        @click="submit"
        >
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
          <router-link to="/app">
            Ir a la app
          </router-link>
        </button>
      </div>
    </div>
    <button class="fixed top-2 left-2 text-center p-4 bg-amber-50 rounded-xl cursor-pointer">
        <router-link to="/">
            <img :src="arrow" class="w-12 h-12 rotate-180">
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
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6 mr-2" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          :class="{
            'text-red-600': notification.type === 'error',
            'text-green-600': notification.type === 'success',
            'text-yellow-600': notification.type === 'warning'
          }"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            :d="notification.type === 'success' ? 'M5 13l4 4L19 7' : 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'" 
          />
        </svg>
        <span class="font-semibold">{{ notification.message }}</span>
      </div>
    </transition>
  </div>
</template>
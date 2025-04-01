<script setup>
  import { RouterLink } from 'vue-router';
  import { ref , onMounted } from 'vue';

  import { dataBase } from '@/stores/database'
  import axios  from "axios"
  

  import logo from "@/assets/parking-light.svg"
  import userImg from '@/assets/user.svg'

  import { AdjustmentsHorizontalIcon } from '@heroicons/vue/24/outline'
  import { PhoneIcon } from '@heroicons/vue/24/outline'
  import { InboxIcon } from '@heroicons/vue/24/outline'
  import { IdentificationIcon } from '@heroicons/vue/24/outline'
  import { TruckIcon } from '@heroicons/vue/24/outline'
  import { BanknotesIcon } from '@heroicons/vue/24/outline'
  import { MapPinIcon } from '@heroicons/vue/24/outline'
  import { ArrowLeftEndOnRectangleIcon } from '@heroicons/vue/24/outline'
  import { DocumentTextIcon } from '@heroicons/vue/24/outline'
  
  
  import Today from '@/components/Today.vue';
  import VehicleManagement from '@/components/VehicleManagement.vue';
  import Movements from '@/components/Movements.vue';
  import Map from '@/components/Map.vue';
  import Administrative from '@/components/Administrative.vue';

  const stores = dataBase()
  const users = ref(stores.users)
  const plates = ref([])
  
  const activator = ref([
  { title: "Movimientos", icon: "BanknotesIcon" },
  { title: "Operaciones", icon: "TruckIcon" },
  { title: "Paso a paso", icon: "MapPinIcon" },
  { title: "Administrativo", icon: "DocumentTextIcon" },

  ])
  const iconComponents = {
    BanknotesIcon,
    TruckIcon,
    MapPinIcon,
    DocumentTextIcon

  }
  const indexActivator = ref(2)
  const user = ref(null)
  const imageBase64 = ref( localStorage.getItem('avatar') || userImg )
  function handleActivator(index){
    indexActivator.value = indexActivator.value === index ? null : index
  }
  function logout(){
    localStorage.removeItem('avatar')
    localStorage.removeItem('identity_number')
    window.location.reload()
  }
  const handleFileChange = async (event) => {
    console.log("handleFileChange")
    const file = event.target.files[0]
    if (!file) return
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('base64')
        // Guardar en data y localStorage
        const base64 = e.target.result;
        localStorage.setItem('avatar', base64);
      };
      reader.readAsDataURL(file);
    }
    const formData = new FormData();
    formData.append('photo', file);  // Envía el archivo directamente
    try {
      await axios.post(
        `http://127.0.0.1:8000/users/${user.value.identity_number}/photo`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',  // Cambia el Content-Type
          },
        }
      );
      location.reload()
    } catch (error) {
      console.error("Error:", error);
    }
  }
  onMounted(function(){
    const identity_number = JSON.parse(localStorage.getItem('identity_number'))
    Array.from(users.value).forEach((row)=>{
      if(row.identity_number == parseInt(identity_number))
        user.value = row
    }) 
    Array.from(stores.vehicles).forEach((row)=>{
      if(row.user_id == identity_number)
        plates.value.push(row)
    })
  })
</script>

<template>
  <div class="min-h-screen w-screen flex flex-col md:flex-row bg-gray-50 text-lg">
    <!-- Sidebar -->
    <aside class="fixed bottom-0 left-0 right-0 z-10 flex md:flex-col w-full md:min-h-screen md:h-full md:w-56 bg-indigo-950 items-center justify-between py-4 md:py-8 border-t md:border-r border-indigo-700">
      <img :src="logo" class="hidden md:block w-40 h-auto">
      <ul class="w-full flex md:flex-col items-center justify-center gap-4 md:gap-6 px-4">
        <li 
          v-for="(link, index) in activator" 
          :key="index"
          @click="handleActivator(index)"
          :class="[
            'p-3 md:p-4 w-14 h-14 md:w-16 md:h-16 text-center rounded-xl cursor-pointer transition-all duration-300 grid place-content-center',
            indexActivator === index ? 'bg-indigo-400 shadow-lg' : 'bg-indigo-700 hover:bg-indigo-4400'
          ]" 
          >
          <component :is="iconComponents[link.icon]" class="h-12 w-12 text-white font-extrabold" />
        </li>
      </ul>
      <button class="hidden md:flex text-center p-3 rounded-xl cursor-pointer hover:bg-indigo-700 transition-colors duration-300">
        <router-link to="/">
          <ArrowLeftEndOnRectangleIcon  class="w-8 h-8  filter invert opacity-70 hover:opacity-100"/>
        </router-link>
      </button>
    </aside>
    <div class="hidden md:flex w-full md:min-h-screen md:h-full md:w-56">
      <!--Sidebar back-->
    </div>

    <!--Main Content-->
    <main class="w-full flex-1 md:overflow-auto pt-0 pb-20 md:pb-0">
      <div class="h-full w-full p-0 md:p-6 bg-slate-100">
        <div class="grid h-full w-full grid-cols-1 md:grid-cols-4 items-start justify-center grid-rows-[auto_auto_1fr] md:grid-rows-[auto_1fr] gap-4 p-0">
          <!--User-->
          <!-- User Section - Versión corregida -->
        <section id="data-user" class="font-m-plus-2 w-full col-span-1 md:col-span-3 row-span-1 flex flex-col items-start justify-center bg-white rounded-none md:rounded-xl shadow-sm border-0 md:border border-gray-200 p-4 md:p-6 ">
          <Today class=" md:bg-white rounded-xl z-10 w-screen md:w-auto"/>
          <!-- Usuario logueado -->
          <div v-if="user!=null" id="user" class="w-full h-full flex flex-col md:flex-row items-center justify-between gap-4">
            <!-- Primera columna (info usuario) -->
            <div class="w-full md:w-1/2 h-full min-h-[130px] md:bg-slate-100 rounded-xl md:p-4 flex items-center gap-4 relative">
              <div id="submit-avatar-user" class="absolute left-4 top-4  md:static text-center flex items-center justify-center">
                <div  class="w-16 h-16 rounded-full border-2 border-indigo-500 p-0  relative">
                  <img :src="imageBase64"  class="h-full w-full rounded-full   absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"/>
                  <input type="file" @change="handleFileChange" accept="image/*" name="user-avatar" id="user-avatar" class="w-full h-full z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer opacity-0">
                </div>
              </div>
              <div class="space-y-2 ml-20 md:ml-0 w-full">
                <h2 class="text-lg font-bold w-full text-end md:text-center">Bienvenido, <span class="text-indigo-600">{{ user.username }}</span></h2>
                <div class="grid grid-cols-2 lg:grid-cols-3 gap-2  ml-4 md:ml-0 mt-4">
                  <span class="flex items-center gap-2 rounded-xl p-2 bg-indigo-100 text-indigo-700 text-sm ">
                    <PhoneIcon class="h-5 w-5"/> {{ user.phone_number }}
                  </span>
                  <span class="flex items-center gap-2 rounded-xl p-2 bg-indigo-100 text-indigo-700 text-sm ">
                    <InboxIcon class="h-5 w-5"/> {{ user.email }}
                  </span>
                  <span class="flex items-center gap-2 rounded-xl p-2 bg-indigo-100 text-indigo-700 text-sm ">
                    <IdentificationIcon class="h-5 w-5"/> {{ user.identity_number }}
                  </span>
                </div>
                <div class="flex items-center justify-center w-full">
                  <button @click="logout" class="px-4 py-2 w-full max-w-96 text-center bg-indigo-600 rounded-lg text-white font-semibold hover:bg-indigo-500 transition-all">
                    Cerrar Sección
                  </button>
                </div>
              </div>
            </div>
            
            <!-- Segunda columna (vehículos) -->
            <div class="w-full md:w-1/2 h-full min-h-[130px] bg-slate-100 rounded-xl p-4 flex flex-col">
              <div class="flex justify-start items-center mb-4">
                <h3 class="font-bold flex items-center gap-2">
                  <TruckIcon class="h-6 w-6"/> Mis vehículos
                </h3>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <span v-for="plate,index in plates" :key="index" 
                      class="bg-white rounded-lg p-2 text-center font-mono font-bold">
                  {{ plate.car_plate }}
                </span>
              </div>
            </div>
          </div>
          
          <!-- Modo incógnito -->
          <div v-else id="user-incognito" class="w-full flex flex-col md:flex-row items-center justify-between gap-6 p-4 md:bg-slate-100 rounded-xl">
            <div class="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
              <img :src="userImg" class="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-indigo-500 p-1">
              <p class="text-gray-700">
                Estás en modo incógnito. <span class="block md:inline">Disfruta de funciones básicas o</span>
                <span class="text-indigo-600 font-medium">regístrate para acceder a todo el contenido</span>.
              </p>
            </div>
            
            <div class="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <router-link to="register" 
                  class="px-4 py-2 w-full min-w-56 text-center bg-indigo-600 rounded-lg text-white font-semibold hover:bg-indigo-500 transition-all">
                  Registrarse
              </router-link>
              <router-link to="/login" 
                  class="px-4 py-2 w-full min-w-56 text-center border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-all">
                  Iniciar sesión
              </router-link>
            </div>
          </div>
        </section>
          <!-- Wallet -->
          <div id="wallet" class="md:col-start-4 md:row-start-1 col-span-1 row-span-1 flex items-center justify-center h-full p-4 md:p-0">
            <div class="relative bg-gradient-to-br from-purple-600 to-indigo-700 w-full h-full min-h-[200px] md:min-h-full shadow-2xl rounded-2xl text-white overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
              
              <div class="absolute top-5 left-5 flex items-center gap-3">
                <BanknotesIcon title="Billetera Digital" class="h-8 w-8 md:h-10 md:w-10"/>
                <span class="font-bold text-lg md:text-xl tracking-wide">Billetera Digital</span>
              </div>
              
              <div class="absolute inset-0 flex items-center justify-center px-4 md:px-8 text-center">
                <p class="text-base md:text-lg font-medium bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 md:px-6 md:py-3">
                  Gestiona tus pagos de forma rápida y segura
                </p>
              </div>
              
              <div class="absolute bottom-5 left-5 right-5 flex justify-between items-end">
                <div>
                  <p class="text-xs md:text-sm opacity-80">Saldo disponible</p>
                  <p class="text-2xl md:text-3xl font-bold">Bs <span class="animate-pulse" v-if="user!=null">{{ user.balance }}</span><span class="animate-pulse" v-else>----</span></p>
                </div>
              </div>
              
              <div class="absolute bottom-0 right-0 opacity-20">
                <svg width="120" height="120" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="80" cy="80" r="80" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
          <!--Activities-->
          <div id="activities" class="md:col-span-4 row-span-1 md:row-span-1 h-full w-full bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col">
            <div class="flex items-center justify-start gap-4 border-b border-gray-200 w-full p-4">
              <AdjustmentsHorizontalIcon class="h-6 w-6 text-indigo-500" />
              <span class="font-semibold text-slate-500 text-lg">Actividades</span>
            </div>
            <div class="flex-1 w-full p-2 h-full">
              <transition name="fade" mode="out-in">
                <div 
                  v-if="indexActivator===null"
                  key="main"
                  class="h-full w-full bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center"
                >                 
                  <span class="text-gray-500 font-medium text-lg text-center max-w-md px-4">
                    Selecciona una opción para comenzar
                  </span>
                </div>
                <Movements v-else-if="indexActivator===0" key="movements" class="h-full" />
                <VehicleManagement v-else-if="indexActivator===1" key="operations" class="h-full" />
                <Map v-else-if="indexActivator===2" key="guide" class="h-full" />
                <Administrative v-else-if="indexActivator===3"  key="administrative" class="h-full" />
              </transition>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Asegurar scroll suave */
html {
  scroll-behavior: smooth;
}

/* Mejorar scroll en activities */
#activities > div:last-child {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 #f3f4f6;
}

#activities > div:last-child::-webkit-scrollbar {
  width: 6px;
}

#activities > div:last-child::-webkit-scrollbar-track {
  background: #f3f4f6;
}

#activities > div:last-child::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
  border-radius: 3px;
}

/* Ajustes para mobile */
@media (max-width: 767px) {
  #data-user, #wallet {
    height: auto;
    min-height: 180px;
  }
  
  #activities {
    min-height: 300px;
  }
}
</style>
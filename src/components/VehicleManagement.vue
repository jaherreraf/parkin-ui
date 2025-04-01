<script setup>
  import { ref } from 'vue'

  import axios from 'axios'

  import { dataBase } from '@/stores/database'

  import { PlusIcon } from '@heroicons/vue/24/outline'
  import { UsersIcon } from '@heroicons/vue/24/outline'
  import { TrashIcon } from '@heroicons/vue/24/outline'

  const stores = dataBase()
  const vehicles = ref(stores.vehicles)
  const newVehicle = ref('')
  const myVehiclePlate = ref('')
  const thirdPartyPlate = ref('')
  const amount  = ref('')
  const users = ref(stores.users)
  const identity_number = ref(JSON.parse(localStorage.getItem('identity_number')) || null)
  function validatePlate( plate ){
    if( !plate ) return "El campo es obligatorio"
    if( plate.length < 6 || plate.length > 7 ) return "6 o 7 Dígitos"
    if( !/^[a-zA-Z0-9]+$/.test(plate) ) return "Formato incorrecto"
    return ""
  }
  async function handleNewVehicle(){
    if(!identity_number.value){
      console.log("user null")
      return
    }
    let exists = false
    Array.from(vehicles.value).forEach(vehicle =>{
      if(vehicle.car_plate == newVehicle.value.toUpperCase())
        exists = true
    })
    if(exists){
      console.log('ya existe la placa')
      return
    }
    if(validatePlate(newVehicle.value) == ""){
      try{
        await axios.post('http://127.0.0.1:8000/vehicles', {
          user_id:identity_number.value,
          car_plate: newVehicle.value.toUpperCase(),
          serial: '',
          }, {
            headers: {
            'Content-Type': 'application/json',
          },
      });
      newVehicle.value = ''
      location.reload()
    }catch (error) {
      console.log('hello')
      console.log(error)
    }
    }
    
  }
  async function handleDeleteVehicle(){
    if(validatePlate(myVehiclePlate.value) == ""){
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/vehicles/${myVehiclePlate.value.toUpperCase()}`);
        console.log(response.data.message); // Muestra el mensaje de éxito
        location.reload()
      } catch (error) {
        console.error('Error al eliminar vehículo:', error.response.data.description); // Muestra el mensaje de error
      }
    }
  }
  const validateIdentification = (id) => {
    if (!id) return 'La identificación es requerida'
    if (!/^\d+$/.test(id)) return 'Solo números'
    if(parseInt(id)<1000 || parseInt(id)>1000000000 ) return "Cantidad de dígitos errónea"
    return ''
  }
  function normalizeAndValidate(amount) {
    // Reemplazar coma por punto para estandarizar
    const normalized = amount.replace(',', '.');
    
    // Validar formato
    if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) {
      return { isValid: false, value: null };
    }
    
    return { isValid: true, value: parseFloat(normalized) };
  }
  async function handleThirdPartyPlate(){
    const result =  normalizeAndValidate(amount.value)
    if(!result.isValid || validateIdentification(thirdPartyPlate.value)!="" )
      return
    const user = users.value.filter(user => user.identity_number == identity_number.value)
    
    try{
      await axios.post(`http://127.0.0.1:8000/users/${identity_number.value}/balance`, {
        balance: user.balancce -  amount.value,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      window.location.href = "/app";
    }catch (error) {
      if (error.response?.data?.error?.includes('UNIQUE constraint')) {
        alert('El usuario, cédula o email ya están registrados', 'error')
      } else if (error.response?.data?.error) {
        alert(error.response.data.error, 'error')
      } else {
        alert('Error de comunicación con la base de datos', 'error')
      }
    }
    const thirdUser = users.value.filter(user => user.identity_number == hirdPartyPlate.value)
    try{
      await axios.post(`http://127.0.0.1:8000/users/${thirdPartyPlate.value}/balance`, {
        balance: thirdUser.balancce + amount.value,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      window.location.href = "/app";
    }catch (error) {
      if (error.response?.data?.error?.includes('UNIQUE constraint')) {
        alert('El usuario, cédula o email ya están registrados', 'error')
      } else if (error.response?.data?.error) {
        alert(error.response.data.error, 'error')
      } else {
        alert('Error de comunicación con la base de datos', 'error')
      }
    }
  }
</script>

<template>
  <div class="w-full h-full p-4 max-w-6xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-800 mb-8 text-center md:text-left">Gestión de Vehículos</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- Tarjeta 1: Agregar vehículo -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div class="p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="bg-blue-100 p-2 rounded-full">
              <PlusIcon class="h-6 w-6 text-blue-600"/>
            </div>
            <h3 class="text-xl font-semibold text-gray-800">Agregar Vehículo</h3>
          </div>
          
          <p class="text-gray-600 mb-5">Registra un nuevo vehículo en tu cuenta Parking</p>
          
          <div class="relative">
            <input
              type="text"
              id="new-vehicle"
              v-model="newVehicle"
              class="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder=" "
            >
            <label 
              for="new-vehicle"
              class="absolute left-3 top-3 text-gray-500 transition-all duration-200 pointer-events-none"
              :class="{'transform -translate-y-3 text-xs text-blue-600 bg-white px-1': newVehicle}"
            >
              Placa del vehículo
            </label>
          </div>
          
          <button 
            class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            :disabled="!newVehicle || identity_number==null"
            :class="{'opacity-50 cursor-not-allowed': !newVehicle}"
            @click="handleNewVehicle"
          >
            Registrar Vehículo
          </button>
        </div>
      </div>

      <!-- Tarjeta 2: Mis Matrículas Eliminar -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div class="p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="bg-red-100 p-2 rounded-full">
                <TrashIcon class="h-6 w-6 text-red-600"/>
            </div>
            <h3 class="text-xl font-semibold text-gray-800">Mis Matrículas</h3>
          </div>
          <p class="text-gray-600 mb-5">Desvíncula uno de tus vehiculo de tu cuenta</p>
          <div class="relative">
            <input
              type="text"
              id="my-vehicle"
              v-model="myVehiclePlate"
              class="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder=" "
            >
            <label 
              for="my-vehicle"
              class="absolute left-3 top-3 text-gray-500 transition-all duration-200 pointer-events-none"
              :class="{'transform -translate-y-3 text-xs text-red-600 bg-white px-1': myVehiclePlate}"
            >
              Placa del vehículo
            </label>
          </div>
          
          <button 
            class="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            :disabled="!myVehiclePlate || identity_number==null"
            :class="{'opacity-50 cursor-not-allowed': !myVehiclePlate}"
            @click="handleDeleteVehicle"
          >
            Eliminar Vehículo
          </button>
        </div>
      </div>

      <!-- Tarjeta 3: Vehículos de Terceros -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div class="p-6 space-y-4">
          <div class="flex items-center gap-3 mb-4">
            <div class="bg-purple-100 p-2 rounded-full">
              <UsersIcon class="h-6 w-6 text-purple-600" />
            </div>
            <h3 class="text-xl font-semibold text-gray-800">Vehículos de Terceros</h3>
          </div>
          
          <p class="text-gray-600 mb-5">Paga el estacionamiento de vehiculos. Recarga el saldo de la cuenta de su propietario</p>
          
          <div class="relative">
            <input
              type="text"
              id="third-party"
              v-model="thirdPartyPlate"
              class="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder=""
            >
            <label 
              for="third-party"
              class="absolute left-3 top-3 text-gray-500 transition-all duration-200 pointer-events-none"
              :class="{'transform -translate-y-1 text-xs text-purple-600 bg-white px-1': thirdPartyPlate}"
            >
              Cédula de propietario
            </label>
          </div>
          <div class="relative">
            <input
              type="text"
              id="amomunt"
              v-model="amount"
              class="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder=""
            >
            <label 
              for="third-party"
              class="absolute left-3 top-3 text-gray-500 transition-all duration-200 pointer-events-none"
              :class="{'transform -translate-y-3 text-xs text-purple-600 bg-white px-1': amount}"
            >
              cantidad
            </label>
          </div>
          
          <button 
            class="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            :disabled="!thirdPartyPlate || identity_number==null || !amount"
            :class="{'opacity-50 cursor-not-allowed': !thirdPartyPlate}"
            @click="handleThirdPartyPlate"
          >
            Pagar Estacionamiento
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Animación para labels flotantes */
    input:focus + label,
        input:not(:placeholder-shown) + label {
        transform: translateY(-1.2rem);
        font-size: 0.75rem;
        color: currentColor;
        background-color: white;
        padding: 0 0.25rem;
    }
</style>
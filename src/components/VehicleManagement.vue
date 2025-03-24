<script setup>
import { ref } from 'vue'

const newVehicle = ref('')
const myVehiclePlate = ref('')
const thirdPartyPlate = ref('')
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
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
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
            :disabled="!newVehicle"
            :class="{'opacity-50 cursor-not-allowed': !newVehicle}"
          >
            Registrar Vehículo
          </button>
        </div>
      </div>

      <!-- Tarjeta 2: Mis Matrículas -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div class="p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="bg-green-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800">Mis Matrículas</h3>
          </div>
          
          <p class="text-gray-600 mb-5">Paga la tarifa de estacionamiento para tus vehículos registrados</p>
          
          <div class="relative">
            <input
              type="text"
              id="my-vehicle"
              v-model="myVehiclePlate"
              class="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder=" "
            >
            <label 
              for="my-vehicle"
              class="absolute left-3 top-3 text-gray-500 transition-all duration-200 pointer-events-none"
              :class="{'transform -translate-y-3 text-xs text-green-600 bg-white px-1': myVehiclePlate}"
            >
              Placa del vehículo
            </label>
          </div>
          
          <button 
            class="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            :disabled="!myVehiclePlate"
            :class="{'opacity-50 cursor-not-allowed': !myVehiclePlate}"
          >
            Buscar Vehículo
          </button>
        </div>
      </div>

      <!-- Tarjeta 3: Vehículos de Terceros -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div class="p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="bg-purple-100 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800">Vehículos de Terceros</h3>
          </div>
          
          <p class="text-gray-600 mb-5">Paga el estacionamiento para vehículos no registrados en tu cuenta</p>
          
          <div class="relative">
            <input
              type="text"
              id="third-party"
              v-model="thirdPartyPlate"
              class="w-full h-12 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder=" "
            >
            <label 
              for="third-party"
              class="absolute left-3 top-3 text-gray-500 transition-all duration-200 pointer-events-none"
              :class="{'transform -translate-y-3 text-xs text-purple-600 bg-white px-1': thirdPartyPlate}"
            >
              Placa del vehículo
            </label>
          </div>
          
          <button 
            class="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            :disabled="!thirdPartyPlate"
            :class="{'opacity-50 cursor-not-allowed': !thirdPartyPlate}"
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
<script setup>
import { ref } from 'vue'
const activator = ref(null)
const form = ref({amount:''  , bank:'', reference:''})
function handleActivator(index) {
  activator.value = activator.value === index ? null : index
}
</script>

<template>
  <div class="w-full h-full p-4">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">Métodos de Pago</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Tarjeta de Pago Móvil -->
      <div 
        class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
        :class="{'ring-2 ring-blue-500': activator === 0}"
      >
        <div 
          class="p-5 cursor-pointer flex flex-col items-center md:items-start"
          @click="handleActivator(0)"
        >
          <div class="flex items-center gap-3 mb-3">
            <div class="bg-blue-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800">Pago Móvil</h3>
          </div>
          <span class="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Tipo: Inmediata</span>
        </div>

        <transition name="slide-fade">
          <div 
            v-if="activator === 0"
            class="px-5 pb-5 pt-2 border-t border-gray-100"
          >
            <div class="mb-4">
              <h4 class="text-lg font-medium text-gray-700 mb-3 text-center">Datos Bancarios</h4>
              <dl class="space-y-3">
                <div class="flex items-baseline gap-2">
                  <dt class="text-gray-500 font-medium w-24">Banco:</dt>
                  <dd class="text-gray-800">Banco de Venezuela</dd>
                </div>
                <div class="flex items-baseline gap-2">
                  <dt class="text-gray-500 font-medium w-24">RIF:</dt>
                  <dd class="text-gray-800">J283033251</dd>
                </div>
                <div class="flex items-baseline gap-2">
                  <dt class="text-gray-500 font-medium w-24">Teléfono:</dt>
                  <dd class="text-gray-800">0414-1628880</dd>
                </div>
              </dl>
            </div>

            <div class="bg-blue-50 p-4 rounded-lg mb-4">
              <div class="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium text-blue-800">Tu número de teléfono:</span>
              </div>
              <p class="text-gray-700 mb-2">0414-1628885</p>
              <p class="text-sm text-gray-600">Desde este número se espera el pago móvil</p>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <div class="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium text-yellow-800">IMPORTANTE</span>
              </div>
              <p class="text-sm text-gray-700">
                Las transacciones recibidas de tu teléfono asociado serán aprobadas automáticamente a tu cuenta Parking
              </p>
            </div>
          </div>
        </transition>
      </div>
      <!-- Tarjeta de Transferencia -->
      <div 
        class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
        :class="{'ring-2 ring-green-500': activator === 1}"
      >
        <div 
          class="p-5 cursor-pointer flex flex-col items-center md:items-start"
          @click="handleActivator(1)"
        >
          <div class="flex items-center gap-3 mb-3">
            <div class="bg-green-100 p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-800">Transferencia</h3>
          </div>
          <span class="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">Tipo: Notificando</span>
        </div>
        <transition name="slide-fade">
          <div 
            v-if="activator === 1"
            class="px-5 pb-5 pt-2 border-t border-gray-100"
          >
            <div class="mb-4">
              <h4 class="text-lg font-medium text-gray-700 mb-3 text-center">Datos Bancarios</h4>
              <dl class="space-y-3">
                <div class="flex items-baseline gap-2">
                  <dt class="text-gray-500 font-medium w-24">Banco:</dt>
                  <dd class="text-gray-800">Banco de Venezuela</dd>
                </div>
                <div class="flex items-baseline gap-2">
                  <dt class="text-gray-500 font-medium w-24">RIF:</dt>
                  <dd class="text-gray-800">J283033251</dd>
                </div>
                <div class="flex items-baseline gap-2">
                  <dt class="text-gray-500 font-medium w-24">Titular:</dt>
                  <dd class="text-gray-800">Parking.C.A</dd>
                </div>
                <div class="flex items-baseline gap-2">
                  <dt class="text-gray-500 font-medium w-24">Número de cuenta:</dt>
                  <dd class="text-gray-800">0172-0110-1111-0034-1245</dd>
                </div>
              </dl>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <div class="flex items-center gap-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium text-yellow-800">IMPORTANTE</span>
                </div>
                <p class="text-sm text-gray-700">
                    Una vez realizada la transferencia desde tu cuenta bancaria notifique completando el siguiente fomulario
                </p>
            </div>
            <div class="space-y-3">
                <div class="w-full text-center">

                    <span class="font-bold  text-center">DATOS DE TRANFERENCIA</span>
                </div>
                <div class="relative">
                    <input
                    class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-green-900 rounded-md px-3 py-2 pt-4 transition duration-300 ease focus:outline-none focus:border-green-950 hover:border-slate-300 shadow-sm focus:shadow"
                    name="amount"
                    id="amount"
                    v-model="form.amount"
                    />
                    <label
                    class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-green-900 text-lg transition-all transform origin-left"
                    for="amount"
                    >
                        Monto
                    </label>
                </div>
                <div class="relative">
                    <input
                    class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-green-900 rounded-md px-3 py-2 pt-4 transition duration-300 ease focus:outline-none focus:border-green-950 hover:border-slate-300 shadow-sm focus:shadow"
                    name="bank"
                    id="bank"
                    v-model="form.bank"
                    />
                    <label
                    class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-green-900 text-lg transition-all transform origin-left"
                    for="bank"
                    >
                        Banco
                    </label>
                </div>
                <div class="relative">
                    <input
                    class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-green-900 rounded-md px-3 py-2 pt-4 transition duration-300 ease focus:outline-none focus:border-green-950 hover:border-slate-300 shadow-sm focus:shadow"
                    name="reference"
                    id="reference"
                    v-model="form.reference"
                    />
                    <label
                    class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-green-900 text-lg transition-all transform origin-left"
                    for="reference"
                    >
                        Número de referencia
                    </label>
                </div>
                <div class="w-full text-center">
                    <button class="bg-green-600 text-green-100 font-bold p-4 rounded-lg cursor-pointer">
                        Notificar Transferencia
                    </button>
                </div>

            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
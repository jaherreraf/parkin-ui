<script setup>
  import { ref , onMounted } from 'vue'

  import axios from 'axios'
  import { dataBase } from '@/stores/database'
  
  import { CreditCardIcon } from '@heroicons/vue/24/outline'
  import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
  import { InformationCircleIcon } from '@heroicons/vue/24/outline'

  const stores = dataBase()
  const users = ref(stores.users)
  const user = ref(null)
  const identity_number = ref(JSON.parse(localStorage.getItem('identity_number')) || null)
  const activator = ref(null)
  const payment = ref({amount:'', reference:''})
  const transfer = ref({amount:''  , bank:'', reference:''})
  
  function handleActivator(index) {
    activator.value = activator.value === index ? null : index
  }
  function validateReference(reference){
    if(!/^\d{9,14}$/.test(reference)) return "Número de referencia inválido"
    return ""
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

  async function handleTransfer() {
    let result = normalizeAndValidate(transfer.value.amount);
    if (!result.isValid || !transfer.value.reference) {
        alert("Por favor complete todos los campos correctamente");
        return;
    }
    console.log(transfer.value)
    try {
        const response = await axios.post('http://127.0.0.1:8000/payment', {
            id_user: user.value.identity_number,
            method: "transfer",
            phone_number: user.value.phone_number,
            amount: parseFloat(transfer.value.amount),
            reference: transfer.value.reference
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.data.success) {
            alert("Transferencia registrada exitosamente");
            transfer.value = { amount: '', reference: '' };
        }
    } catch(error) {
        console.error('Error:', error);
        if (error.response) {
            alert(`Error: ${error.response.data.error || 'Error al procesar la transferencia'}`);
        } else {
            alert('Error de conexión con el servidor');
        }
    }
}
  async function  handlePayment(){
    let result = normalizeAndValidate(payment.value.amount)
    if(validateReference(payment.value.reference)!="" || !result.isValid)
      return
    console.log('todo valido')
    try{
      await axios.post('http://127.0.0.1:8000/payment', {
        id_user: user.value.identity_number,
        method: "mobile payment",
        phone_number: user.value.phone_number,
        amount: parseFloat(payment.value.amount),
        reference: payment.value.reference
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }catch(error){
      if (error.response) {
            alert(`Error: ${error.response.data.error || 'Error al procesar la transferencia'}`);
        } else {
            alert('Error de conexión con el servidor');
        }
    }
  }
  onMounted(function(){
    Array.from(users.value).forEach((row)=>{
      if(row.identity_number == parseInt(identity_number))
        user.value = row
    }) 
  })
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
              <CreditCardIcon class="h-6 w-6 text-blue-600"/>
            </div>
            <h3 class="text-xl font-semibold text-gray-800">Pago Móvil</h3>
          </div>
          <span class="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Tipo: Inmediata</span>
        </div>

        <transition name="slide-fade">
          <div 
            v-if="activator === 0 && identity_number!=null" 
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
                <InformationCircleIcon class="h-5 w-5 text-blue-600"/>
                <span class="font-medium text-blue-800">Tu número de teléfono:</span>
              </div>
              <p class="text-gray-700 mb-2">0414-1628885</p>
              <p class="text-sm text-gray-600">Desde este número se espera el pago móvil</p>
            </div>
            <div class="space-y-3">
                <div class="w-full text-center">
                    <span class="font-bold  text-center">DATOS DE PAGO MÓVIL</span>
                </div>
                <div class="grid grid-cols-2 items-center justify-center gap-2 w-full">
                  <div class="relative">
                    <input
                    class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-blue-900 rounded-md px-3 py-2 pt-4 transition duration-300 ease focus:outline-none focus:border-blue-950 hover:border-slate-300 shadow-sm focus:shadow"
                    name="amount-phone"
                    id="amount-phone"
                    v-model="payment.amount"
                    />
                    <label
                    class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-blue-900 text-lg transition-all transform origin-left"
                    for="amount-phone"
                    >
                    Monto
                  </label>
                </div>
              <div class="relative">
                <input
                class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-blue-900 rounded-md px-3 py-2 pt-4 transition duration-300 ease focus:outline-none focus:border-blue-950 hover:border-slate-300 shadow-sm focus:shadow"
                name="reference-phone"
                id="reference-phone"
                v-model="payment.reference"
                />
                <label
                class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-blue-900 text-lg transition-all transform origin-left"
                for="reference-phone"
                >
                Número de referencia
              </label>
            </div>
          </div>
                <div class="w-full text-center">
                    <button class="bg-blue-600 text-blue-100 font-bold p-4 rounded-lg cursor-pointer" @click="handlePayment">
                        Notificar Pago móvil
                    </button>
                </div>

            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mt-2">
              <div class="flex items-center gap-2 mb-2">
                <ExclamationTriangleIcon class="h-5 w-5 text-yellow-600"/>
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
              <CreditCardIcon class="h-6 w-6 text-green-600"/>
            </div>
            <h3 class="text-xl font-semibold text-gray-800">Transferencia</h3>
          </div>
          <span class="text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">Tipo: Notificando</span>
        </div>
        <transition name="slide-fade">
          <div 
            v-if="activator === 1 && identity_number!=null"
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
                  <ExclamationTriangleIcon class="h-5 w-5 text-yellow-600"/>
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
                <div class="grid grid-cols-2 items-center justify-center gap-2 w-full">
                  <div class="relative">
                    <input
                    class="w-full h-20 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border-2 border-green-900 rounded-md px-3 py-2 pt-4 transition duration-300 ease focus:outline-none focus:border-green-950 hover:border-slate-300 shadow-sm focus:shadow"
                    name="amount"
                    id="amount"
                    v-model="transfer.amount"
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
                name="reference"
                id="reference"
                v-model="transfer.reference"
                />
                <label
                class="absolute cursor-text bg-white px-1 left-2.5 top-2.5 text-green-900 text-lg transition-all transform origin-left"
                for="reference"
                >
                Número de referencia
              </label>
            </div>
          </div>
                <div class="w-full text-center">
                    <button class="bg-green-600 text-green-100 font-bold p-4 rounded-lg cursor-pointer" @click="handleTransfer">
                        Notificar Transferencia
                    </button>
                </div>

            </div>
          </div>
        </transition>
      </div>
       <!-- Tarjeta de Efectivo -->
       <div 
        class="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
        :class="{'ring-2 ring-red-500': activator === 2}"
      >
        <div 
          class="p-5 cursor-pointer flex flex-col items-center md:items-start"
          @click="handleActivator(2)"
        >
          <div class="flex items-center gap-3 mb-3">
            <div class="bg-red-100 p-3 rounded-full">
              <CreditCardIcon class="h-6 w-6 text-red-600"/>
            </div>
            <h3 class="text-xl font-semibold text-gray-800">Efectivo</h3>
          </div>
          <span class="text-sm text-red-600 bg-red-50 px-3 py-1 rounded-full">Tipo: Taquilla</span>
        </div>
        <transition name="slide-fade">
          <div 
            v-if="activator === 2"
            class="px-5 pb-5 pt-2 border-t border-red-100"
          >
            <div class="mb-4">
              <h4 class="text-lg font-medium text-gray-700 mb-3 text-center">Efectivo</h4>
              <p>Dirigirse hacia la taquilla para poder hacer pago de tu estacionamiento con efectivo ya sea divisa o en bolivares</p>
            </div>
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg mt-2">
              <div class="flex items-center gap-2 mb-2">
                <ExclamationTriangleIcon class="h-5 w-5 text-yellow-600"/>
                <span class="font-medium text-yellow-800">IMPORTANTE</span>
              </div>
              <p class="text-sm text-gray-700">
                Si no tienes cuenta en parking o no iniciaste sección Este es el único método de pago que te podemos proporcionar
              </p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
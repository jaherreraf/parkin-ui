<script setup>
    import { ref, onMounted } from 'vue'

    import axios from 'axios'

    import { CurrencyDollarIcon } from '@heroicons/vue/24/outline'
    import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
    import { LockClosedIcon } from '@heroicons/vue/24/outline'
    
    import Invoice from '@/components/administrative/Invoice.vue'
    
    import { dataBase } from '@/stores/database'
    const stores = dataBase()
  
    const indexActivator = ref(null)
    const options = ref([
        {title:"Transferencias"},
        {title:"Pago móvil"},
        {title:"Efectivo"},
        {title:"Denuncias"}
    ])
    const dollar = ref(stores.dollar)
    const payments = ref(stores.payments)
    const mobile = ref([])
    const transfer = ref([])
    async function confirm(item){
        console.log(item.id_user , item.amount)
        try{
      await axios.post(`http://127.0.0.1:8000/users/${item.id_user}/balance`, {
        balance: item.amount,
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
    onMounted(()=>{
        Array.from(payments.value).forEach(item=>{
            if(item.method == 'transfer')
                transfer.value.push(item)
            else if(item.method == 'mobile payment' )
                mobile.value.push(item)
        })
    })
</script>
<template>
   <div class="h-auto w-auto bg-gray-50 rounded-lg border border-gray-200 flex flex-col items-center justify-center relative">    
       <span class="font-bold uppercase absolute top-2 left-2">Area Administrativa</span>
        <div class="bg-white  rounded-lg">
            <nav class="py-4 flex items-center justify-center gap-4 border-b border-b-slate-500">
                <span v-for="option,index in options" :key="index" @click="indexActivator = indexActivator!=index? index : null"
                class="px-4 py-2 bg-slate-400 rounded-lg text-white cursor-pointer"
                >{{ option.title }}
                </span>
            </nav>
            <div class="flex-1  bg-white">
                <transition name="fade" mode="out-in">
                    <div v-if="indexActivator==null" class="grid grid-cols-2 grid-rows-2 gap-4 p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-200 max-w-3xl mx-auto">
                        <!-- Tarjeta Dólar (Estilo financiero) -->
                        <div v-if="dollar" class="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-md transition-all hover:shadow-lg">
                            <div class="flex items-center gap-2">
                                <CurrencyDollarIcon class="w-8 h-8 text-blue-100" />
                                <span class="text-lg font-medium">Tasa de cambio</span>
                            </div>
                            <strong class="text-2xl font-bold tracking-wide">
                                {{ dollar.price }} Bs
                            </strong>
                            <span class="text-xs text-blue-100 mt-1">Actualizado: {{ new Date().toLocaleDateString() }}</span>
                        </div>

                        <!-- Tarjeta de Alertas (Destacado) -->
                        <div class="col-start-2 row-start-1 row-span-2 flex flex-col p-4 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-md overflow-hidden">
                            <div class="flex items-center gap-2 mb-3">
                                <ExclamationTriangleIcon class="h-8 w-8 text-red-300"/>
                                <h3 class="text-xl font-semibold">Aviso Importante</h3>
                            </div>
                            <p class="flex-1 text-red-50 leading-relaxed">
                                Mantente alerta y navega con precaución entre las opciones administrativas. 
                                Recuerda que los cambios realizados aquí afectan directamente a la operación del negocio.
                            </p>
                            <div class="mt-4 pt-2 border-t border-red-100">
                                <span class="text-xs text-red-100 flex items-center">
                                    <LockClosedIcon class="h-4 w-4 mr-1"/>
                                    Solo personal autorizado
                                </span>
                            </div>
                        </div>

                        <!-- Tarjeta de Permisos (Amarillo corporativo) -->
                        <div class="row-start-2 flex items-center justify-center p-4 rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 text-white shadow-md">
                            <div class="text-center">
                                <LockClosedIcon class="h-10 w-10 mx-auto mb-2 text-amber-100"/>
                                <strong class="text-lg font-semibold tracking-tight">Acceso Restringido</strong>
                                <p class="text-xs text-amber-100 mt-1">Esta área es exclusiva para el personal administrativo autorizado</p>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="indexActivator==0" class="p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-200 max-w-3xl mx-auto flex flex-col items-center justify-between gap-2">
                        <div class="w-full bg-white rounded-lg border border-slate-200 shadow-sm p-3 flex flex-col sm:flex-row items-center gap-3" v-for="item, index in transfer" :key="index">
                            <!-- Información de la transferencia -->
                            <div class="flex-1 min-w-0 p-2">
                                <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 mt-1">
                                    <span>Ref: <span class="font-mono">{{ item.reference }}</span></span>
                                    <span>Monto: <span class="font-medium text-indigo-600">Bs. {{item.amount}}</span></span>
                                </div>
                                <!-- Confirmación normal -->
                                <button class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md transition-colors whitespace-nowrap" @click="confirm(item)">
                                    Confirmar
                                </button>
                            </div>
                            <!-- Acciones -->
                            <div class="flex flex-col xs:flex-row gap-2">
                                
                                <small class="text-slate-500 font-bold">Confirmar con otro monto</small>
                                <!-- Confirmación con monto alternativo -->
                                <div class="flex flex-col items-center justify-center bg-slate-100 rounded-xl p-1">
                                
                                    <div class="flex items-center gap-1" title="Monto incorrecto">
                                        <input 
                                        type="text" 
                                        placeholder="Monto"
                                        class="w-24 px-2 py-1.5 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                            :id="'amount'+ index "
                                        >
                                        <button class="px-2 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors whitespace-nowrap">
                                            Aplicar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else-if="indexActivator==1" class="p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-200 max-w-3xl mx-auto">
                        <div class="w-full bg-white rounded-lg border border-slate-200 shadow-sm p-3 flex flex-col sm:flex-row items-center gap-3" v-for="item,index in mobile" :key="index">
                            <!-- Información de la transferencia -->
                            <div class="flex-1 min-w-0 p-2">
                                <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600 mt-1">
                                    <span>Telefóno: <span class="font-mono">{{ item.phone_number }}</span></span>
                                    <span>Ref: <span class="font-mono">{{ item.reference }}</span></span>
                                    <span>Monto: <span class="font-medium text-indigo-600">Bs. {{ item.amount }}</span></span>
                                </div>
                                <!-- Confirmación normal -->
                                <button class="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-md transition-colors whitespace-nowrap"
                                @click="confirm(item)">
                                    Confirmar
                                </button>
                            </div>
                            <!-- Acciones -->
                            <div class="flex flex-col xs:flex-row gap-2">
                                <!-- Confirmación con monto alternativo -->
                                <div class="flex flex-col items-center justify-center bg-slate-100 rounded-xl p-1">
                                    <small class="text-slate-500 font-bold">Confirmar con otro monto</small>
                                    <div class="flex items-center gap-1" title="Monto incorrecto">
                                        <input 
                                        type="text" 
                                        placeholder="Monto"
                                        class="w-24 px-2 py-1.5 text-sm border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                        :id="'amount' + index"
                                        >
                                        <button class="px-2 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors whitespace-nowrap"
                                        @click="otherAmount(item,amount)"
                                        >
                                            Aplicar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Invoice v-else-if="indexActivator==2" />
                    <div v-else-if="indexActivator==3" class="p-6 bg-gray-50 rounded-xl shadow-lg border border-gray-200 max-w-3xl mx-auto">
                        Denuncias
                    </div>
                </transition>        
            </div>
        </div>

        <!--
         
        -- TRANSFERENCIA RECIBIDAS
            MONTO BANCO NUMERO DE REFERENCIA
        -- PAGOS MOVIL RECIBIDO
            NUMERO DE TELEFONO DEL USUARIO QUE HIZO EL PAGO Y EL MONTO
        -- DENUNCIAS
            UN USUARIO PUEDE DENUNCIAR ALGO SUCEDIDO EN DICHO ESTACIONAMIENTO SE LE PERMITIRA INGRESAR UNA DESCRIPCION DE LO SUCEDIDO HECHO Y ESO 
        -- TARIFAS
        -- GENERAR FACTURA

         --
        -->

    </div>
</template>
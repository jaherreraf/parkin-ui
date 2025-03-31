<script setup>
    import { ref, computed, onMounted } from 'vue'

    import * as XLSX from 'xlsx'
    import fileDownload from 'js-file-download'

    import { DocumentChartBarIcon } from '@heroicons/vue/24/outline'
    
    // Datos reactivos
    const user = ref({
    identity_number: '',
    fee: '',
    amount: 0
    })

    const invoiceCounter = ref(1000)
    const invoiceNumber = ref('')

    // Inicializar número de factura
    onMounted(() => {
    invoiceNumber.value = `P-${invoiceCounter.value++}`
    })

    // Fecha actual formateada
    const currentDateTime = computed(() => {
    const now = new Date()
    return now.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
    })

    // Calcular monto (sin recursión)
    const calculateAmount = () => {
    if (!user.value.fee) {
        user.value.amount = 0
        return
    }

    // Tarifas fijas sin depender de horas
    switch(user.value.fee) {
        case '1': // $1 por media hora (asumimos 0.5h como mínimo)
        user.value.amount = 1
        break
        case '2': // $2 por hora (asumimos 1h como mínimo)
        user.value.amount = 2
        break
        case '3': // $5 tarifa plana
        user.value.amount = 5
        break
        default:
        user.value.amount = 0
    }
    }

    // Generar factura
    const generateInvoice = () => {
        if (!user.value.identity_number || !user.value.fee) {
            alert('Por favor complete todos los campos')
            return
        }

        const workbook = XLSX.utils.book_new()
        const worksheet = XLSX.utils.aoa_to_sheet([
            ['ESTACIONAMIENTO "The Parking"'],
            ['Universidad Santa María, Caracas'],
            [''],
            ['RECIBO N°:', invoiceNumber.value],
            ['Fecha:', currentDateTime.value],
            [''],
            ['Cédula/RUC:', user.value.identity_number],
            ['Tipo de Tarifa:', getRateDescription(user.value.fee)],
            [''],
            ['MONTO TOTAL:', `$${user.value.amount.toFixed(2)}`],
            [''],
            ['Gracias por su preferencia']
        ])

        worksheet['!cols'] = [{ width: 15 }, { width: 20 }]
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Recibo')

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        fileDownload(excelBlob, `Recibo_Estacionamiento_${user.value.identity_number}.xlsx`)
    }

    const getRateDescription = (feeType) => {
        const rates = {
            '1': '$1.00 por media hora',
            '2': '$2.00 por hora',
            '3': '$5.00 tarifa plana'
        }
        return rates[feeType] || 'No especificada'
    }
</script>
<template>
<div class="grid place-content-center w-full">
    <div class="bg-white rounded-lg shadow-md border border-gray-200 p-4 w-full ">
    <!-- Encabezado compacto -->
    <div class="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
        <h1 class="text-lg font-bold text-indigo-800 uppercase">Recibo</h1>
        <div class="text-right">
        <p class="text-xs text-gray-500">N° {{ invoiceNumber }}</p>
        <p class="text-xs font-medium">{{ currentDateTime }}</p>
        </div>
    </div>

    <!-- Formulario compacto -->
    <div class="space-y-3">
        <!-- Input cédula más compacto -->
        <div class="relative">
        <input
            class="w-full h-9 text-sm border border-gray-300 rounded-md px-3 py-1.5 transition duration-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            v-model="user.identity_number"
            placeholder=" "
            id="identity_number"
            name="identity_number"
        />
        <label class="absolute left-2 -top-2 bg-white px-1 text-xs text-gray-500 pointer-events-none" for="identity_number">
            Cédula/RUC
        </label>
        </div>

        <!-- Selector de tarifa compacto -->
        <div class="relative">
        <select 
            v-model="user.fee"
            class="w-full h-9 text-sm border border-gray-300 rounded-md px-2.5 py-1.5 appearance-none transition duration-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            @change="calculateAmount"
            id="fee" name="fee"
        >
            <option value="" disabled selected hidden>Seleccione tarifa</option>
            <option value="1">$1/0.5h</option>
            <option value="2">$2/h</option>
            <option value="3">$5/3h+</option>
        </select>
        <label class="absolute left-2 -top-2 bg-white px-1 text-xs text-gray-500 pointer-events-none" for="fee">
            Tarifa
        </label>
        </div>

        <!-- Mostrar monto -->
        <div class="bg-gray-50 rounded-md p-2">
        <div class="flex justify-between items-center">
            <span class="text-sm font-medium text-gray-700">Total a pagar:</span>
            <span class="text-base font-bold text-indigo-700">${{ user.amount.toFixed(2) }}</span>
        </div>
        </div>

        <!-- Botón compacto -->
        <button 
        @click="generateInvoice"
        class="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition duration-200 flex items-center justify-center mt-2"
        >
        <DocumentChartBarIcon class="h-4 w-4 mr-1" />
        Generar Recibo
        </button>
    </div>

    <!-- Pie de página más pequeño -->
    <div class="mt-3 pt-2 border-t border-gray-200 text-center">
        <p class="text-[0.7rem] text-gray-600 font-medium">ESTACIONAMIENTO "The Parking"</p>
        <p class="text-[0.65rem] text-gray-500">Universidad Santa María</p>
    </div>
    </div>
</div>
</template>

<style>
</style>
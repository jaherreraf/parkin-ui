<template>
  <div class="py-12 md:py-16 bg-white">
    <div class="container mx-auto px-4 max-w-5xl">
      <!-- Timeline (Stepper) -->
      <ol class="relative border-l border-gray-200 dark:border-gray-700">
        <!-- Paso 1 - Registro/Inicio -->
        <li class="mb-10 ml-6">
          <div class="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 border-2 border-white shadow-md"></div>
          <div class="p-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center mb-2">
              <span class="bg-blue-600 text-white text-sm font-semibold px-2.5 py-0.5 rounded-full mr-3">1</span>
              <h3 class="text-xl font-bold text-gray-900">Registro o Uso Básico</h3>
            </div>
            <p class="text-gray-600 mb-4">
              <span class="font-semibold text-blue-600">Opción 1:</span> Regístrate para disfrutar de la experiencia completa<br>
              <span class="font-semibold text-blue-600">Opción 2:</span> Continúa sin cuenta (funcionalidades limitadas)
            </p>
            <div class="flex space-x-3">
              <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Cuenta</span>
              <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Acceso</span>
            </div>
          </div>
        </li>

        <!-- Paso 2 - Gestión de Vehículos -->
        <li class="mb-10 ml-6">
          <div class="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 border-2 border-white shadow-md"></div>
          <div class="p-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center mb-2">
              <span class="bg-blue-600 text-white text-sm font-semibold px-2.5 py-0.5 rounded-full mr-3">2</span>
              <h3 class="text-xl font-bold text-gray-900">Registra tus Vehículos</h3>
            </div>
            <p class="text-gray-600 mb-4">
              Añade los vehículos que usas frecuentemente para agilizar tus pagos:<br>
              - Placa<br>
              - Color<br>
              - Foto (opcional)
            </p>
            <div class="flex space-x-3">
              <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Vehículos</span>
              <span class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Registro</span>
            </div>
          </div>
        </li>

        <!-- Paso 3 - Pagos de Estacionamiento -->
        <li class="mb-10 ml-6">
          <div class="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 border-2 border-white shadow-md"></div>
          <div class="p-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center mb-2">
              <span class="bg-blue-600 text-white text-sm font-semibold px-2.5 py-0.5 rounded-full mr-3">3</span>
              <h3 class="text-xl font-bold text-gray-900">Pago de Estacionamiento</h3>
            </div>
            <p class="text-gray-600 mb-4">
              <span class="font-semibold text-blue-600">Para tus vehículos:</span> Pago rápido con un clic<br>
              <span class="font-semibold text-blue-600">Para vehículos de terceros:</span> Ingresa la placa manualmente<br>
              - Selecciona tiempo de estacionamiento<br>
              - Visualiza el monto a pagar
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Pagos</span>
              <span class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Terceros</span>
              <span class="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">Tarifas</span>
            </div>
          </div>
        </li>

        <!-- Paso 4 - Billetera Digital -->
        <li class="mb-10 ml-6">
          <div class="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 border-2 border-white shadow-md"></div>
          <div class="p-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center mb-2">
              <span class="bg-blue-600 text-white text-sm font-semibold px-2.5 py-0.5 rounded-full mr-3">4</span>
              <h3 class="text-xl font-bold text-gray-900">Billetera Digital</h3>
            </div>
            <p class="text-gray-600 mb-4">
              Recarga tu saldo y paga fácilmente:<br>
              - <span class="font-semibold">Pago Móvil:</span> Vincula tu número telefónico<br>
              - <span class="font-semibold">Transferencia Bancaria:</span> Usa tu cuenta preferida<br>
              <!--
              - Historial completo de transacciones<br>
              - Notificaciones instantáneas-->
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="bg-emerald-100 text-emerald-800 text-xs font-medium px-2.5 py-0.5 rounded">Pago Móvil</span>
              <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Transferencia</span>
              <span class="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">Saldo</span>
            </div>
          </div>
        </li>

        <!-- Paso 5 - Beneficios Adicionales -->
        <li class="ml-6">
          <div class="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 border-2 border-white shadow-md"></div>
          <div class="p-4 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center mb-2">
              <span class="bg-blue-600 text-white text-sm font-semibold px-2.5 py-0.5 rounded-full mr-3">5</span>
              <h3 class="text-xl font-bold text-gray-900">Beneficios Exclusivos (Muy pronto)</h3>
            </div>
            <p class="text-gray-600 mb-4">
              Como usuario registrado disfrutas de:<br>
              - Descuentos por fidelidad<br>
              - Historial de tus estacionamientos<br>
              - Reserva de espacios (próximamente)<br>
              - Notificaciones personalizadas
            </p>
            <div class="flex flex-wrap gap-2">
              <span class="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">Beneficios</span>
              <span class="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded">Exclusivos</span>
            </div>
          </div>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const currentStep = ref(1);

function nextStep(index) {
  currentStep.value = index;
}
</script>

<style scoped>
/* Animación suave para los items del timeline */
li {
  transition: all 0.3s ease;
}

/* Efecto hover más pronunciado */
.bg-blue-50:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
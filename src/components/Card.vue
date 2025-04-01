<script setup>
    import { UserIcon } from '@heroicons/vue/24/outline'
</script>
<template>
    <div class="w-64 rounded-xl bg-white p-6 shadow-[inset_0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center">
        <div class="relative mb-4">
            <div class="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center shadow-inner">
                <UserIcon class="w-10 h-10 text-indigo-600" />
            </div>
        </div>
        <h3 class="text-lg font-semibold text-gray-800 mb-1">José Herrera</h3>
        <span class="text-sm text-gray-500 mb-3">V-28303325</span>
        <p class="text-gray-600 text-sm italic before:content-['“'] after:content-['”']">
            Quitar un cargo a las personas de su día a día
        </p>
    </div>
</template>
<script setup>
  import { ref } from 'vue'
  import floorA from '@/assets/floorA.jpg'
  import floorB from '@/assets/floorB.jpg'
  import floorC from '@/assets/floorC.jpg'


  import { ArrowUpIcon } from '@heroicons/vue/24/outline'
  import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
  import { ArrowRightIcon } from '@heroicons/vue/24/outline'
  import { ArrowDownIcon } from '@heroicons/vue/24/outline'

  const floors = ref([
    { title: 'Planta Baja', src: floorA },
    { title: 'Piso 1', src: floorB },
    { title: 'Piso 2', src: floorC }
  ])
</script>

<template>
  <div class=" w-full overflow-hidden h-full min-h-96">
    <img :src="floorA" alt="">
  <div id="parking" class="w-full h-96 bg-red-300 grid grid-cols-16 grid-rows-8 border-2 border-slate-500">
    <div class="row-span-8 row-start-1 col-start-1 col-span-2 bg-green-100 grid grid-cols-2 grid-rows-8">
      <div class="row-start-2 row-span-6 bg-lime-200 border-r-2 border-r-slate-500 grid place-content-center">
        <ArrowDownIcon class="w-6 h-6 font-bold"/>
      </div>
      <div class="row-start-2 row-span-6 bg-lime-200 border-r-2 border-r-slate-500 grid place-content-center text-center">
        <div class="flex flex-col items-center justify-center gap-2">
          <span>Subida</span>
          <ArrowUpIcon class="w-6 h-6 font-bold"/>
        </div>

      </div>
      <div class="row-start-8 col-start-2  border-b-4 border-b-red-500 relative text-center">
        <!--box entrance-->
        Entrada
          <div class="w-4 h-4 border-2 border-slate-500 bg-slate-950 absolute -bottom-4 -right-2"><!--access control--></div>
      </div>
    </div>
    <div class="row-span-8 row-start-1 col-start-15 col-span-2 bg-green-100 grid grid-cols-2 grid-rows-8">
      <div class="row-start-2 row-span-6 bg-red-200 border-r-2 border-r-slate-500 grid place-content-center">
        <div class="flex flex-col items-center justify-center gap-2">
          <span>Bajada</span>
          <ArrowDownIcon class="w-6 h-6 font-bold"/>
        </div>
      </div>
      <div class="row-start-2 row-span-6 bg-lime-200 border-r-2 border-r-slate-500 grid place-content-center text-center">
        <ArrowUpIcon class="w-6 h-6 font-bold"/>
      </div>
      <div class="row-start-8 col-start-1  border-b-4 border-b-red-500 relative text-center">
        <!--box exit-->
        Salida
          <div class="w-4 h-4 border-2 border-slate-500 bg-slate-950 absolute -bottom-4 -left-2"><!--access control--></div>
      </div>
    </div>
    <div class="col-span-12 bg-amber-100 col-start-3">
      Ascensor
    </div>
    <div>walk</div>
  </div>
  </div>
</template>
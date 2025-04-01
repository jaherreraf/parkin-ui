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
  const parking_space = ref([
    {style:'border-b-2 border-b-slate-400 text-center col-span-1 row-span-1 col-start-3 row-start-7', state:false} ,
    {style:'border-b-2 border-b-slate-400 text-center col-span-1 row-span-1 col-start-3 row-start-6',  state:false},
    {style:'border-b-2 border-b-slate-400 text-center col-span-1 row-span-1 col-start-3 row-start-5' , state:false},
    {style:'border-b-2 border-b-slate-400 text-center col-span-1 row-span-1 col-start-3 row-start-4' , state:false},
    {style:'border-b-2 border-b-slate-400 text-center col-span-1 row-span-1 col-start-3 row-start-3' , state:false},

    {style:'border-r-2 border-r-slate-400 text-center col-span-1 row-span-1 col-start-4 row-start-2' , state:false},
    {style:'border-r-2 border-r-slate-400 text-center col-span-1 row-span-1 col-start-5 row-start-2' , state:false},
    {style:'border-r-2 border-r-slate-400 text-center col-span-1 row-span-1 col-start-6 row-start-2' , state:false},
    {style:' text-center col-span-1 row-span-1 col-start-7 row-start-2' , state:false},

    {style:'border-r-2 border-r-slate-400 text-center col-span-1 row-span-1 col-start-10 row-start-2' , state:false},
    {style:'border-r-2 border-r-slate-400 text-center col-span-1 row-span-1 col-start-11 row-start-2' , state:false},
    {style:'border-r-2 border-r-slate-400 text-center col-span-1 row-span-1 col-start-12 row-start-2' , state:false},
    {style:' text-center col-span-1 row-span-1 col-start-13 row-start-2' , state:false},

    {style:'border-b-2 border-b-slate-400 text-center col-span-1 row-span-1 col-start-14 row-start-3' , state:false},
    {style:'border-b-2 border-b-slate-400 text-center col-span-1 row-span-1 col-start-14 row-start-4' , state:false},
    {style:'border-b-2 border-b-slate-400 text-center col-span-1 row-span-1 col-start-14 row-start-5' , state:false},
    {style:'border-b-2 border-b-slate-400 text-center col-span-1 row-span-1 col-start-14 row-start-6' , state:false},
    {style:'border-b-2 border-b-slate-400 text-center col-span-1 row-span-1 col-start-14 row-start-7' , state:false},


    {style:'border-b-2 border-b-slate-400 text-center col-span-1 row-span-1 col-start-5 row-start-6' , state:false},
    {style:'border-b-2 border-b-slate-400 text-center col-span-1 row-span-1 col-start-5 row-start-5' , state:false},

    {style:'border-r-2 border-r-slate-400 text-center col-span-1 row-span-1 col-start-6 row-start-4' , state:false},
    {style:'border-r-2 border-r-slate-400 text-center col-span-1 row-span-1 col-start-7 row-start-4' , state:false},
    {style:'border-r-2 border-r-slate-400 text-center col-span-1 row-span-1 col-start-8 row-start-4' , state:false},
    {style:'border-r-2 border-r-slate-400 text-center col-span-1 row-span-1 col-start-9 row-start-4' , state:false},
    {style:'border-r-2 border-r-slate-400 text-center col-span-1 row-span-1 col-start-10 row-start-4' , state:false},
    {style:' text-center col-span-1 row-span-1 col-start-11 row-start-4' , state:false},

    {style:'border-b-2 border-b-slate-400 text-center col-span-1 row-span-1 col-start-12 row-start-5' , state:false},
    {style:'border-b-2 border-b-slate-400 text-center col-span-1 row-span-1 col-start-12 row-start-6' , state:false},

    {style:'border-l-2 border-l-slate-400 text-center col-span-1 row-span-1 col-start-11 row-start-7' , state:false},
    {style:'border-l-2 border-l-slate-400 text-center col-span-1 row-span-1 col-start-10 row-start-7' , state:false},
    {style:'border-l-2 border-l-slate-400 text-center col-span-1 row-span-1 col-start-9 row-start-7' , state:false},
    {style:'border-l-2 border-l-slate-400 text-center col-span-1 row-span-1 col-start-8 row-start-7' , state:false},
    {style:'border-l-2 border-l-slate-400 text-center col-span-1 row-span-1 col-start-7 row-start-7' , state:false},
    {style:'text-center col-span-1 row-span-1 col-start-6 row-start-7' , state:false},
    ])
    const box = ref([
      'col-span-1 row-span-1 bg-slate-500 col-start-3 row-start-2',
      'col-span-1 row-span-1 bg-slate-500 col-start-14 row-start-2',
      'col-span-1 row-span-1 bg-slate-500 col-start-5 row-start-4',
      'col-span-1 row-span-1 bg-slate-500 col-start-5 row-start-7',
      'col-span-1 row-span-1 bg-slate-500 col-start-12 row-start-4',
      'col-span-1 row-span-1 bg-slate-500 col-start-12 row-start-7',
    ])
</script>

<template>
  <div class=" w-full overflow-hidden h-full min-h-96">
    <img :src="floorA" alt="">
  <div id="parking" class="w-full h-96  grid grid-cols-16 grid-rows-8 border-2 border-slate-500">
    <div :class="['' , space.style]" v-for="space,index in parking_space" :key="index">
      A{{ index+1 }}
    </div>
    <div :class="['col-span-1 row-span-1 bg-slate-500', item ]" v-for="item,index in box" :key="'box-' + index ">
      <!--box walk-->
    </div>
    <div class="row-span-8 row-start-1 col-start-1 col-span-2 grid grid-cols-2 grid-rows-8 ">
      <div class="row-start-2 row-span-6 border-r-2 border-r-slate-500 grid place-content-center">
        <ArrowDownIcon class="w-6 h-6 font-bold"/>
      </div>
      <div class="row-start-2 row-span-6 border-r-2 border-r-slate-500 grid place-content-center text-center">
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
    <div class="row-span-8 row-start-1 col-start-15 col-span-2 grid grid-cols-2 grid-rows-8">
      <div class="row-start-2 row-span-6 border-l-2 border-r-2 border-l-slate-500 border-r-slate-500 grid place-content-center">
        <div class="flex flex-col items-center justify-center gap-2">
          <span>Bajada</span>
          <ArrowDownIcon class="w-6 h-6 font-bold"/>
        </div>
      </div>
      <div class="row-start-2 row-span-6 border-r-2 border-r-slate-500 grid place-content-center text-center">
        <ArrowUpIcon class="w-6 h-6 font-bold"/>
      </div>
      <div class="row-start-8 col-start-1  border-b-4 border-b-red-500 relative text-center">
        <!--box exit-->
        Salida
          <div class="w-4 h-4 border-2 border-slate-500 bg-slate-950 absolute -bottom-4 -left-2"><!--access control--></div>
      </div>
    </div>
    <div class="col-span-12 col-start-3 grid place-content-center border-l-2 border-l-slate-500  border-b-2 border-b-slate-500 border-r-2 border-r-slate-500">
      <div class="flex items-center justify-center gap-2">
        <span>Ascensor</span>
        <span>Taquilla</span>
      </div>
    </div>
    <div class="col-span-2 row-span-1 border-r-2 border-r-slate-400 border-l-2 border-l-slate-400  text-center">
      <!-- path to the front of the parking lot -->
    </div>
    <div class="col-span-10 row-span-1 grid place-content-center bg-white">
      <ArrowRightIcon class="w-6 h-6 font-bold"/>
      <!-- hallway right-->
    </div>
    <div class="row-start-4 col-start-4 row-span-4 col-span-1 bg-white grid place-content-center">
      <ArrowUpIcon class="w-6 h-6 font-bold"/>
      <!--hallway up-->
    </div>
    <div class="row-start-4 col-start-13 row-span-4 col-span-1 bg-white grid place-content-center">
      <ArrowDownIcon class="w-6 h-6 font-bold"/>
      <!--hallway down-->
    </div>
    <div class="col-span-12 bg-white col-start-3 row-start-8 grid place-content-center">
      <ArrowRightIcon class="w-6 h-6 font-bold"/>
      <!--hallway right-->
    </div>
    <div class="col-span-6 row-span-2 bg-slate-500 font-bold text-white grid place-content-center">
      <!--center column-->
      Planta A
    </div>
  </div>
  </div>
</template>
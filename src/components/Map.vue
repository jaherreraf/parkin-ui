<script setup>
  import { ref } from 'vue'
  import floorA from '@/assets/floorA.jpg'
  import floorB from '@/assets/floorB.jpg'
  import floorC from '@/assets/floorC.jpg'


  import { ArrowUpIcon } from '@heroicons/vue/24/outline'
  import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
  import { ArrowRightIcon } from '@heroicons/vue/24/outline'
  import { ArrowDownIcon } from '@heroicons/vue/24/outline'

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
  const indexActivator = ref(0)
  const floors = ref([
    { title: 'Planta Baja', letter: "A" },
    { title: 'Piso 1', letter:"B"},
    { title: 'Piso 2', letter:"C" }
  ])
</script>

<template>
  <div class=" w-full overflow-hidden h-full min-h-96">
    <div id="parking" class="w-full h-[500px] overflow-y-scroll overflow-x-scroll grid grid-cols-16 grid-rows-8 border-2 border-slate-500">
      <div :class="['' , space.style]" v-for="space,index in parking_space" :key="index">
      {{floors[indexActivator].letter}}{{ index+1 }}
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
            <span v-if="indexActivator!=2">Subida</span>
            <ArrowUpIcon class="w-6 h-6 font-bold"/>
          </div>

        </div>
        <div :class="['row-start-8 col-start-2  text-center' , indexActivator==0?'relative border-b-red-500 border-b-4':'']">
          <!--box entrance-->
          <span v-if="indexActivator==0">Entrada</span>
            <div class="w-4 h-4 border-2 border-slate-500 bg-slate-950 absolute -bottom-4 -right-2" v-if="indexActivator==0"><!--access control--></div>
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
        <div :class="['row-start-8 col-start-1  relative text-center', indexActivator==0 && 'border-b-red-500 border-b-4']">
          <!--box exit-->
          <span  v-if="indexActivator==0">
              Salida
          </span>
            <div class="w-4 h-4 border-2 border-slate-500 bg-slate-950 absolute -bottom-4 -left-2" v-if="indexActivator==0"><!--access control--></div>
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
        {{ floors[indexActivator].title }}
      </div>
    </div>
    <div  class="flex items-center justify-center gap-2 m-2">
      <button v-for="item,index in floors" :key="'floor-' + index" @click="indexActivator = index " class="flex items-center gap-2 rounded-lg p-4 cursor-pointer bg-indigo-100 text-indigo-700 text-md max-w-56 md:mx-w-96">{{item.title}}</button>
    </div>
  </div>
</template>
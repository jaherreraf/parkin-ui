<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { dataBase } from './stores/database';
const stores = dataBase()
onMounted(function(){
  stores.fecthUsers()
  stores.fecthVehicles()
  })
</script>

<template>
  <div class="w-screen h-dvh p-0 m-0">
    <RouterView />
  </div>
  
</template>

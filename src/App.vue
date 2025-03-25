<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { dataBase } from './stores/database';
const stores = dataBase()
onMounted(()=>stores.fecthUsers())
</script>

<template>
  <div class="w-screen h-dvh p-0 m-0">
    <RouterView />
  </div>
  
</template>

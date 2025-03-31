<script setup>
  import { onMounted } from 'vue'
  import { RouterView } from 'vue-router'
  import { dataBase } from './stores/database'
  const stores = dataBase()
  onMounted(function(){
    stores.fetchUsers()
    stores.fetchVehicles()
    /*stores.fetchFees()
    stores.fetchPayment()
    stores.fetchRecord()
    stores.fetchNotification()
    */
    stores.fetchDollar()
  })
</script>

<template>
  <div class="w-screen h-dvh p-0 m-0">
    <RouterView />
  </div>
  
</template>

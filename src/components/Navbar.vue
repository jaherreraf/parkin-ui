<script setup>
import { ref } from 'vue'
const select = ref(0)
function selectLink(index){
    select.value = index
}
</script>
<template>
     <div class="md:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-around gap-4 p-1 w-36 h-12 bg-black rounded-lg box-border">
        
    </div>
</template>
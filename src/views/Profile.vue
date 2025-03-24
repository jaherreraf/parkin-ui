<script setup>
    import user  from '@/assets/user.svg'
    import configuration  from '@/assets/configuration.svg'
    import home  from '@/assets/home.svg'
    import Today from '@/components/Today.vue'
</script>
<template>
    <div class="relative flex flex-col items-center  justify-start gap-2 h-dvh">
        <header class="w-screen bg-amber-100 p-4 flex items-center  justify-between">
            <i><</i>
            <span>Profile</span>
            <img :src="configuration" class="w-12 h-12">
        </header>
        <div class="w-screen flex items-center justify-start gap-6">
            <img :src="user" class="rounded-full w-12 h-12">
            <div class="flex flex-col items-center justify-center gap-1">
                <strong>José Herrera</strong>
                <span>Caracas, Venezuela</span>
            </div>

        </div>
        <Today/>
        
        <aside class="flex items-center justify-between gap-2">
            <div class="bg-lime-400 w-36 h-36 rounded-xl  grid place-content-center"><span class="text-center">AEJ62R</span><!--box--></div>
            <div class="bg-lime-400 w-36 h-36 rounded-xl  grid place-content-center"><span class="text-center">AEJ62R</span><!--box--></div>
            <div class="bg-lime-400 w-36 h-36 rounded-xl  grid place-content-center"><span class="text-center">AEJ62R</span><!--box--></div>
        </aside>
        <ol>
            <li></li>
        </ol>
        <nav class="absolute  bottom-4 left-1/2 transform -translate-x-1/2 bg-black min-w-96 h-28 rounded-full flex items-center justify-center gap-4">
            <button class="w-24 h-24 rounded-full bg-white p-2 grid place-content-center">
                <img :src="home" alt="inicio" title="inicio" class="w-12 h-12">
            </button>
            <button class="w-24 h-24 rounded-full bg-white p-2 grid place-content-center">
                <img :src="home" alt="inicio" title="inicio" class="w-12 h-12">
            </button>
            <button class="w-24 h-24 rounded-full bg-white p-2 grid place-content-center">
                <img :src="home" alt="inicio" title="inicio" class="w-12 h-12">
            </button>
        </nav>
    </div>
    
</template>
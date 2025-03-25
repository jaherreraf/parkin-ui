import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
export const dataBase = defineStore('dataBase', () => {
  const users = ref([])
  const vehicles = ref([])
  async function fecthUsers(){
    const response = await axios.get("http://127.0.0.1:8000/users")
    users.value = response.data
  }
  async function fecthVehicles(){
    const response = await axios.get("http://127.0.0.1:8000/vehicles")
    vehicles.value = response.data
    
  }
  return {users , vehicles , fecthUsers , fecthVehicles}
})

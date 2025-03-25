import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
export const dataBase = defineStore('dataBase', () => {
  const users = ref([])
  async function fecthUsers(){
    const response = await axios.get("http://127.0.0.1:8000/users")
    users.value = response.data
    console.log(users.value)

  }
  return {users , fecthUsers}
})

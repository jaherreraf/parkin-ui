import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
export const dataBase = defineStore('dataBase', () => {
  const users = ref([])
  const vehicles = ref([])
  const fees = ref([])
  const payments = ref([])
  const record = ref([])
  const notification = ref([])
  const dollar = ref(null)
  async function fetchUsers(){
    const response = await axios.get("http://127.0.0.1:8000/users")
    users.value = response.data
  }
  async function fetchVehicles(){
    const response = await axios.get("http://127.0.0.1:8000/vehicles")
    vehicles.value = response.data 
  }
  async function fetchPayments(){
    const response = await axios.get("http://127.0.0.1:8000/payments")
    payments.value = response.data 
  }
  /*
  async function fetchFees(){
    const response = await axios.get("http://127.0.0.1:8000/fees")
    fees.value = response.data 
  }
  
  async function fetchRecord(){
    const response = await axios.get("http://127.0.0.1:8000/record")
    record.value = response.data 
  }
  async function fetchNotification(){
    const response = await axios.get("http://127.0.0.1:8000/notification")
    notification.value = response.data 
  }
    fetchFees  , fetchRecord , fetchNotification
     fees , record , notification 
    */
  async function fetchDollar(){
    const response = await axios.get("https://pydolarve.org/api/v1/dollar?page=bcv&monitor=usd")
    dollar.value = response.data
  }
  return {users , vehicles,  dollar , payments , fetchPayments, fetchUsers , fetchVehicles,  fetchDollar}
})

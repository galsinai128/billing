const axios = require('axios');
const BASE_URL = 'http://localhost:8080/api'

export function getTransactions(){
    return axios.get(`${BASE_URL}/transaction`)
}

export function deleteTransactions(itemId){
    return axios.delete(`${BASE_URL}/transaction/${itemId}`)
}

export function editTransactions(editedItem){
    return axios.put(`${BASE_URL}/transaction/${editedItem._id}`,editedItem)
}

export function addTransactions(newItem){
    return axios.post(`${BASE_URL}/transaction`,newItem)
}

export function getCustomers(){
    return axios.get(`${BASE_URL}/customer`)
}

export function deleteCustomers(itemId){
    return axios.delete(`${BASE_URL}/customer/${itemId}`)
}

export function editCustomers(editedItem){
    return axios.put(`${BASE_URL}/customer/${editedItem._id}`,editedItem)
}

export function addCustomers(newItem){
    return axios.post(`${BASE_URL}/api/customer`,newItem)
}

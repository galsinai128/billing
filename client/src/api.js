const axios = require('axios');

export function getTransactions(){
    return axios.get('http://localhost:8080/api/customers')
}

export function deleteTransactions(itemId){
    return axios.delete(`http://localhost:8080/api/customers/${itemId}`)
}

export function editTransactions(editedItem){
    return axios.put(`http://localhost:8080/api/customers/${editedItem._id}`,editedItem)
}

export function addTransactions(newItem){
    return axios.post(`http://localhost:8080/api/customers`,newItem)
}
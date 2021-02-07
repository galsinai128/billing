import React, { useState, useEffect } from 'react';
import {getCustomers, deleteCustomers, editCustomers, addCustomers} from '../../api'
import {idGen} from '../../utils'
import EntityList from '../EntityList/EntityList'

function CustomersList() {
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getCustomers().then(res => {
      setIsLoading(false);
      if (isMounted) setCustomers(res.data.data);
    })
    .catch(err => {
      setIsLoading(false);
      console.log('error getting customers',err);
      setConnectionError(err.message);
    })
    return () => { isMounted = false };
  },[]);

  function closeDetails(){
    setCurrentCustomer(null);
    setIsNewItem(false);
  }

  function deleteCustomer(event,customer){
    event.stopPropagation();
    //delete from server
    deleteCustomers(customer._id);

    //delete in client
    let customersCopy = [...customers];
    let index = customersCopy.findIndex(item => item._id === customer._id);
    customersCopy.splice(index,1);
    setCustomers(customersCopy);
  }

  function editCustomer(editetCustomer){
    //edit server
    editCustomers(editetCustomer);

    //edit client
    let customersNew = customers.map(customer => customer._id === editetCustomer._id ? editetCustomer : customer)
    setCustomers(customersNew);
    closeDetails();
  }

  function addCustomer(editetCustomer){
    editetCustomer.customer_id = idGen();
    //add server
    addCustomers(editetCustomer);

    //add client
    let customersCopy = [...customers];
    customersCopy.push(editetCustomer);
    setCustomers(customersCopy);
    closeDetails();
  }

  let emptyCustomer = {
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    country: "",
    city: "",
    street: "",
    phone: "",
    cerdit_card_type: "",
    cerdit_card_number: ""
  }

  return (
    <EntityList
      entityName={'Customer'}
      entityList={customers}
      deleteEntityService={deleteCustomer}
      editEntityService={editCustomer}
      addEntityService={addCustomer}
      connectionError={connectionError}
      isLoading={isLoading}
      currentEntity={currentCustomer}
      setCurrentEntity={setCurrentCustomer}
      isNewItem={isNewItem}
      setIsNewItem={setIsNewItem}
      emptyEntity={emptyCustomer}
  />
  );
}

export default CustomersList;

import React, { useState, useEffect } from 'react';
import './CustomersList.css';
import {getCustomers, deleteCustomers, editCustomers, addCustomers} from '../../api'
import {idGen} from '../../utils'
import ClipLoader from "react-spinners/ClipLoader";

import ListGroup from 'react-bootstrap/ListGroup';

import DetailsModal from '../CustomersDetailsModal/CustomersDetailsModal'

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

  function viewDetails(customer){
    setCurrentCustomer(customer);
  }

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

  return (
    <div className="entitysList">
      {currentCustomer ? (
        <DetailsModal 
          customer={currentCustomer}      
          closeDetails={closeDetails}
          editCustomer={(editetCustomer)=>editCustomer(editetCustomer)}
          isNewItem={isNewItem}
          addCustomer={(editetCustomer)=>addCustomer(editetCustomer)}
        ></DetailsModal>) : null}
      <ListGroup>
        <ListGroup.Item className={'EntitysItem entity-title'}>Customers List</ListGroup.Item>
        {connectionError ? null : (<ListGroup.Item 
          onClick={()=>{viewDetails({
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
          });  setIsNewItem(true)}}
          className={'EntitysItem add-btn pointer'}
        >Add Customer</ListGroup.Item>)}
        {isLoading ? (<div className={'spinner'}><ClipLoader></ClipLoader></div>) : null}
        {!isLoading && !customers.length ? (<ListGroup.Item className={'EntitysItem'}>No Items To Display</ListGroup.Item>) : null}
        {customers.map(customer => {return (
            <ListGroup.Item
                key={customer.customer_id}
                active={currentCustomer && currentCustomer.customer_id === customer.customer_id}
                className={'EntitysItem pointer'}
                onClick={()=>viewDetails(customer)}
            >
              <div>{`${customer.first_name} ${customer.last_name}`}</div>
              <div className={'btns-container'}>
                <div onClick={(event)=>deleteCustomer(event,customer)}>✗</div>
              </div>

            </ListGroup.Item>)})}
      </ListGroup>
      {connectionError ? <h4 className={'error'}>{connectionError}</h4> : null}
    </div>
  );
}

export default CustomersList;

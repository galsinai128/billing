import React, { useState, useEffect } from 'react';
import './TransactionsList.css';
import {getTransactions, deleteTransactions, editTransactions, addTransactions} from '../../api'
import {idGen} from '../../utils'
import ClipLoader from "react-spinners/ClipLoader";

import ListGroup from 'react-bootstrap/ListGroup';

import DetailsModal from '../TransactionsDetailsModal/TransactionsDetailsModal'

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [currentTransaction, setCurrentTransactions] = useState(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [connectionError, setConnectionError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getTransactions().then(res => {
      setIsLoading(false);
      if (isMounted) setTransactions(res.data.data);
    })
    .catch(err => {
      setIsLoading(false);
      console.log(err);
      setConnectionError(err.message);
    })
    return () => { isMounted = false };
  },[]);

  function viewDetails(transaction){
    setCurrentTransactions(transaction);
  }

  function closeDetails(){
    setCurrentTransactions(null);
    setIsNewItem(false);
  }

  function deleteTransaction(event,transaction){
    event.stopPropagation();
    //delete from server
    deleteTransactions(transaction._id);

    //delete in client
    let transactionsCopy = [...transactions];
    let index = transactionsCopy.findIndex(item => item._id === transaction._id);
    transactionsCopy.splice(index,1);
    setTransactions(transactionsCopy);
  }

  function editTransaction(editetTransaction){
    //edit server
    editTransactions(editetTransaction);

    //edit client
    let transactionsNew = transactions.map(transaction => transaction._id === editetTransaction._id ? editetTransaction : transaction)
    setTransactions(transactionsNew);
    closeDetails();
  }

  function addTransaction(editetTransaction){
    editetTransaction.customer_id = idGen();
    //add server
    addTransactions(editetTransaction);

    //add client
    let transactionsCopy = [...transactions];
    transactionsCopy.push(editetTransaction);
    setTransactions(transactionsCopy);
    closeDetails();
  }

  return (
    <div className="entitysList">
      {currentTransaction ? (
        <DetailsModal 
          transaction={currentTransaction}      
          closeDetails={closeDetails}
          editTransaction={(editetTransaction)=>editTransaction(editetTransaction)}
          isNewItem={isNewItem}
          addTransaction={(editetTransaction)=>addTransaction(editetTransaction)}
        ></DetailsModal>) : null}
      <ListGroup>
        <ListGroup.Item className={'EntitysItem entity-title'}>Transactions List</ListGroup.Item>
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
            total_price: "",
            currency: "",
            cerdit_card_type: "",
            cerdit_card_number: ""
          });  setIsNewItem(true)}}
          className={'EntitysItem add-btn pointer'}
        >Add Transaction</ListGroup.Item>)}
        {isLoading ? (<div className={'spinner'}><ClipLoader></ClipLoader></div>) : null}
        {!isLoading && !transactions.length ? (<ListGroup.Item className={'EntitysItem'}>No Items To Display</ListGroup.Item>) : null}
        {transactions.map(transaction => {return (
            <ListGroup.Item
                key={transaction.customer_id}
                active={currentTransaction && currentTransaction.customer_id === transaction.customer_id}
                className={'EntitysItem  pointer'}
                onClick={()=>viewDetails(transaction)}
            >
              <div>{`${transaction.first_name} ${transaction.last_name} - ${transaction.total_price} ${transaction.currency}`}</div>
              <div className={'btns-container'}>
                <div onClick={(event)=>deleteTransaction(event,transaction)}>✗</div>
              </div>

            </ListGroup.Item>)})}
      </ListGroup>
      {connectionError ? <h4 className={'error'}>{connectionError}</h4> : null}
    </div>
  );
}

export default TransactionsList;

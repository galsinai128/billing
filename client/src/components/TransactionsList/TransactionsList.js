import React, { useState, useEffect } from 'react';
import './TransactionsList.css';
import {getTransactions, deleteTransactions, editTransactions, addTransactions} from '../../api'

import ListGroup from 'react-bootstrap/ListGroup';

import DetailsModal from '../DetailsModal/DetailsModal'

function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [currentTransaction, setCurrentTransactions] = useState(null);
  const [isNewItem, setIsNewItem] = useState(false);

  useEffect(() => {
    getTransactions().then(res => {
      setTransactions(res.data.data);
    })
    .catch(err => {
      console.log('error getting transactions',err)
    })
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

  function idGen(){
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }
    let id = '';
    id = id + getRandomInt(0,10) + getRandomInt(0,10) + getRandomInt(0,10) + '-' + getRandomInt(0,10) + getRandomInt(0,10) + '-' + getRandomInt(0,10) + getRandomInt(0,10) + getRandomInt(0,10) + getRandomInt(0,10) 
    return id;
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
        <ListGroup.Item 
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
          className={'EntitysItem add-btn'}
        >Add Transaction</ListGroup.Item>
        {transactions.map(transaction => {return (
            <ListGroup.Item
                key={transaction.customer_id}
                active={currentTransaction && currentTransaction.customer_id === transaction.customer_id}
                className={'EntitysItem'}
                onClick={()=>viewDetails(transaction)}
            >
              <div>{`${transaction.first_name} ${transaction.last_name} - ${transaction.total_price} ${transaction.currency}`}</div>
              <div className={'btns-container'}>
                <div onClick={(event)=>deleteTransaction(event,transaction)}>✗</div>
              </div>

            </ListGroup.Item>)})}
      </ListGroup>
    </div>
  );
}

export default TransactionsList;

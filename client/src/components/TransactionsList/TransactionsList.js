import React, { useState, useEffect } from 'react';
import {getTransactions, deleteTransactions, editTransactions, addTransactions} from '../../api'
import {idGen} from '../../utils'
import EntityList from '../EntityList/EntityList'

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

  let emptyTransaction = {
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
  }

  return (
    <EntityList
      entityName={'Transaction'}
      entityList={transactions}
      deleteEntityService={deleteTransaction}
      editEntityService={editTransaction}
      addEntityService={addTransaction}
      connectionError={connectionError}
      isLoading={isLoading}
      currentEntity={currentTransaction}
      setCurrentEntity={setCurrentTransactions}
      isNewItem={isNewItem}
      setIsNewItem={setIsNewItem}
      emptyEntity={emptyTransaction}
    />
  );
}

export default TransactionsList;

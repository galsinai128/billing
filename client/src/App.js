import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import EntitysList from './components/EntitysList/EntitysList';
import TransactionsList from './components/TransactionsList/TransactionsList';
import CustomersList from './components/CustomersList/CustomersList';

function App() {

  const [activeEntity, setActiveEntityState] = useState('transactions');

  function setActiveEntity(entity){
    setActiveEntityState(entity);
  }

  return (
    <div className="App">
      <h1>Billing App</h1>
      <div className={'content-container'}>
        <div className={'menu-container'}>
          <EntitysList 
            activeEntity={activeEntity}
            setActiveEntity = {setActiveEntity}
          />
        </div>
        <div className={'data-container'}>
            {activeEntity === 'transactions' ? <TransactionsList/> : null}
            {activeEntity === 'customers' ? <CustomersList/> : null}
        </div>
      </div>

    </div>
  );
}

export default App;

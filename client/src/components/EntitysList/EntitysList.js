//import './EntitysList.css';

import ListGroup from 'react-bootstrap/ListGroup';

function EntitysList({activeEntity, setActiveEntity}) {
  return (
    <div className="entitysList">
      <ListGroup>
        <ListGroup.Item 
            active={activeEntity === 'transactions' ? true : false}
            onClick={()=>{setActiveEntity('transactions')}}
        >Transactions</ListGroup.Item>
        <ListGroup.Item 
            active={activeEntity === 'customers' ? true : false}
            onClick={()=>{setActiveEntity('customers')}}
        >Customers</ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default EntitysList;

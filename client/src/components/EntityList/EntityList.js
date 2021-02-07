import React from 'react';
import './EntityList.css';
import ClipLoader from "react-spinners/ClipLoader";
import ListGroup from 'react-bootstrap/ListGroup';
import DetailsModal from '../EntityModal/EntityModal'

function EntityList({
    entityName,
    entityList,
    deleteEntityService,
    editEntityService,
    addEntityService, 
    connectionError, 
    isLoading, 
    currentEntity, 
    setCurrentEntity,
    isNewItem,
    setIsNewItem,
    emptyEntity
}) {


  function viewDetails(entity){
    setCurrentEntity(entity);
  }

  function closeDetails(){
    setCurrentEntity(null);
    setIsNewItem(false);
  }

  function deleteEntity(event,transaction){
    deleteEntityService(event,transaction);
  }

  function editEntity(editetEntity){
    editEntityService(editetEntity);
  }

  function addEntity(editetEntity){
    addEntityService(editetEntity);
  }
  

  return (
    <div className="entitysList">
      {currentEntity ? (
        <DetailsModal 
          entityName={entityName}
          entity={currentEntity}      
          closeDetails={closeDetails}
          editEntity={(editetEntity)=>editEntity(editetEntity)}
          isNewItem={isNewItem}
          addEntity={(editetEntity)=>addEntity(editetEntity)}
        ></DetailsModal>) : null}
      <ListGroup>
        <ListGroup.Item className={'EntitysItem entity-title'}>{`${entityName}s List`}</ListGroup.Item>
        {connectionError ? null : (<ListGroup.Item 
          onClick={()=>{viewDetails(emptyEntity);  setIsNewItem(true)}}
          className={'EntitysItem add-btn pointer'}
        >{`Add ${entityName}`}</ListGroup.Item>)}
        {isLoading ? (<div className={'spinner'}><ClipLoader></ClipLoader></div>) : null}
        {!isLoading && !entityList.length ? (<ListGroup.Item className={'EntitysItem'}>No Items To Display</ListGroup.Item>) : null}
        {entityList.map(entity => {return (
            <ListGroup.Item
                key={entity.customer_id}
                active={currentEntity && currentEntity.customer_id === entity.customer_id}
                className={'EntitysItem  pointer'}
                onClick={()=>viewDetails(entity)}
            >
              <div>
                <span>{`${entity.first_name} ${entity.last_name}`}</span>
                {entityName === 'Transaction' ? (<span>{` - ${entity.total_price} ${entity.currency}`}</span>) : null}
              </div>

              <div className={'btns-container'}>
                <div onClick={(event)=>deleteEntity(event,entity)}>✗</div>
              </div>

            </ListGroup.Item>)})}
      </ListGroup>
      {connectionError ? <h4 className={'error'}>{connectionError}</h4> : null}
    </div>
  );
}

export default EntityList;

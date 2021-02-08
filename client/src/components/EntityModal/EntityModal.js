import './EntityModal.css';
import React, { useState } from 'react';
import {inputValidation} from '../../utils'
import SimpleMap from '../SimpleMap/SimpleMap'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function EntityModal({entityName,entity,closeDetails, editEntity, isNewItem, addEntity}) {
    const [editedEntity, setEditEntity] = useState(entity);
    const [invalidFields, setInvalidFields] = useState({});

    function handleChange(ev,key){
        let editedEntityCopy = JSON.parse(JSON.stringify(editedEntity));
        editedEntityCopy[key] = ev.target.value;
        setEditEntity(editedEntityCopy);
    }

    function saveChanges(){
        let fieldsCheck = inputValidation(editedEntity);
        if (!Object.keys(fieldsCheck).length){
            setInvalidFields({});
            isNewItem ? addEntity(editedEntity) : editEntity(editedEntity);
        }
        else {
            setInvalidFields(fieldsCheck);
        }
    }

  return (
    <div className="detailsModalContainer">
      <Modal.Dialog scrollable>
        <Modal.Header closeButton onClick={closeDetails}>
            <Modal.Title>{`${entityName} details`}</Modal.Title>
        </Modal.Header>

        <Modal.Body className={'modal-details-body'}>
            <form className={'form-body'}>

                <label  className={'form-label'}>
                First Name:
                    <input className={invalidFields['first_name'] ? 'error-input' : null} type="text" value={editedEntity.first_name} onChange={(ev)=>handleChange(ev,'first_name')}/>
                </label>
                
                <label  className={'form-label'}>
                Last Name:
                    <input className={invalidFields['last_name'] ? 'error-input' : null}  type="text" value={editedEntity.last_name} onChange={(ev)=>handleChange(ev,'last_name')}/>
                </label>
                
                <label  className={'form-label'}>
                E-mail:
                    <input className={invalidFields['email'] ? 'error-input' : null} type="text" value={editedEntity.email} onChange={(ev)=>handleChange(ev,'email')}/>
                </label>
                
                <label className={'form-label'}>
                Gender:
                    <select  value={editedEntity.gender} onChange={(ev)=>handleChange(ev,'gender')}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label>
                
                <label className={'form-label'}>
                Country:
                    <input className={invalidFields['country'] ? 'error-input' : null} type="text" value={editedEntity.country} onChange={(ev)=>handleChange(ev,'country')}/>
                </label>
                
                <label className={'form-label'}>
                City:
                    <input className={invalidFields['city'] ? 'error-input' : null} type="text" value={editedEntity.city} onChange={(ev)=>handleChange(ev,'city')}/>
                </label>
                
                <label className={'form-label'}>
                Street:
                    <input type="text" value={editedEntity.street} onChange={(ev)=>handleChange(ev,'street')}/>
                </label>
                
                <label className={'form-label'}>
                Phone:
                    <input className={invalidFields['phone'] ? 'error-input' : null} type="text" value={editedEntity.phone} onChange={(ev)=>handleChange(ev,'phone')}/>
                </label>
                
                <label className={'form-label'}>
                Total Price:
                    <input  className={invalidFields['total_price'] ? 'error-input' : null} type="text" value={editedEntity.total_price} onChange={(ev)=>handleChange(ev,'total_price')}/>
                </label>
                
                {entityName === 'Transaction' ? (<label className={'form-label'}>
                Currency:
                    <input className={invalidFields['currency'] ? 'error-input' : null} type="text" value={editedEntity.currency} onChange={(ev)=>handleChange(ev,'currency')}/>
                </label>) : null } 

                {entityName === 'Transaction' ? (<label className={'form-label'}>
                Credit Card Type:
                    <input className={invalidFields['cerdit_card_type'] ? 'error-input' : null} type="text" value={editedEntity.cerdit_card_type} onChange={(ev)=>handleChange(ev,'cerdit_card_type')}/>
                </label>) : null}

                <label className={'form-label'}>
                Credit Card Number:
                    <input className={invalidFields['cerdit_card_number'] ? 'error-input' : null} type="text" value={editedEntity.cerdit_card_number} onChange={(ev)=>handleChange(ev,'cerdit_card_number')}/>
                </label>
            </form>
            {isNewItem ? null : <SimpleMap address={`${editedEntity.street} ${editedEntity.city} ${editedEntity.country}`}/>}
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={closeDetails}>Close</Button>
            <Button variant="primary" onClick={saveChanges}>Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default EntityModal;

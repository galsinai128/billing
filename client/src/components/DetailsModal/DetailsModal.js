import './DetailsModal.css';
import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DetailsModal({transaction,closeDetails, editTransaction, isNewItem, addTransaction}) {
    const [editedTransaction, setEditTransaction] = useState(transaction);

    function handleChange(ev,key){
        let editedTransactionCopy = JSON.parse(JSON.stringify(editedTransaction));
        editedTransactionCopy[key] = ev.target.value;
        setEditTransaction(editedTransactionCopy);
    }

    function saveChanges(){
        if (inputValidation()){
            isNewItem ? addTransaction(editedTransaction) : editTransaction(editedTransaction);
        }
    }

    function inputValidation(){
        let valid = true;
        for (const [key, value] of Object.entries(editedTransaction)) {
            if (!value || !key) valid = false;
          }
        return valid;
    }
  return (
    <div className="detailsModalContainer">
      <Modal.Dialog scrollable>
        <Modal.Header closeButton onClick={closeDetails}>
            <Modal.Title>Transaction details</Modal.Title>
        </Modal.Header>

        <Modal.Body className={'modal-details-body'}>
            <form className={'form-body'}>

                <label  className={'form-label'}>
                first_name:
                    <input type="text" value={editedTransaction.first_name} onChange={(ev)=>handleChange(ev,'first_name')}/>
                </label>
                
                <label  className={'form-label'}>
                last_name:
                    <input type="text" value={editedTransaction.last_name} onChange={(ev)=>handleChange(ev,'last_name')}/>
                </label>
                
                <label  className={'form-label'}>
                email:
                    <input type="text" value={editedTransaction.email} onChange={(ev)=>handleChange(ev,'email')}/>
                </label>
                
                <label className={'form-label'}>
                gender:
                    <input type="text" value={editedTransaction.gender} onChange={(ev)=>handleChange(ev,'gender')}/>
                </label>
                
                <label className={'form-label'}>
                country:
                    <input type="text" value={editedTransaction.country} onChange={(ev)=>handleChange(ev,'country')}/>
                </label>
                
                <label className={'form-label'}>
                city:
                    <input type="text" value={editedTransaction.city} onChange={(ev)=>handleChange(ev,'city')}/>
                </label>
                
                <label className={'form-label'}>
                street:
                    <input type="text" value={editedTransaction.street} onChange={(ev)=>handleChange(ev,'street')}/>
                </label>
                
                <label className={'form-label'}>
                phone:
                    <input type="text" value={editedTransaction.phone} onChange={(ev)=>handleChange(ev,'phone')}/>
                </label>
                
                <label className={'form-label'}>
                total_price:
                    <input type="text" value={editedTransaction.total_price} onChange={(ev)=>handleChange(ev,'total_price')}/>
                </label>
                
                <label className={'form-label'}>
                currency:
                    <input type="text" value={editedTransaction.currency} onChange={(ev)=>handleChange(ev,'currency')}/>
                </label>    

                <label className={'form-label'}>
                cerdit_card_type:
                    <input type="text" value={editedTransaction.cerdit_card_type} onChange={(ev)=>handleChange(ev,'cerdit_card_type')}/>
                </label>

                <label className={'form-label'}>
                cerdit_card_number:
                    <input type="text" value={editedTransaction.cerdit_card_number} onChange={(ev)=>handleChange(ev,'cerdit_card_number')}/>
                </label>
            </form>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={closeDetails}>Close</Button>
            <Button variant="primary" onClick={saveChanges}>Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default DetailsModal;

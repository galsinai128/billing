import './CustomersDetailsModal.css';
import React, { useState } from 'react';
import {inputValidation} from '../../utils'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function DetailsModal({customer,closeDetails, editCustomer, isNewItem, addCustomer}) {
    const [editedCustomer, setEditedCustomer] = useState(customer);

    function handleChange(ev,key){
        let editedCustomerCopy = JSON.parse(JSON.stringify(editedCustomer));
        editedCustomerCopy[key] = ev.target.value;
        setEditedCustomer(editedCustomerCopy);
    }

    function saveChanges(){
        if (inputValidation(editedCustomer)){
            isNewItem ? addCustomer(editedCustomer) : editCustomer(editedCustomer);
        }
    }

  return (
    <div className="detailsModalContainer">
      <Modal.Dialog scrollable>
        <Modal.Header closeButton onClick={closeDetails}>
            <Modal.Title>Customer details</Modal.Title>
        </Modal.Header>

        <Modal.Body className={'modal-details-body'}>
            <form className={'form-body'}>

                <label  className={'form-label'}>
                first_name:
                    <input type="text" value={editedCustomer.first_name} onChange={(ev)=>handleChange(ev,'first_name')}/>
                </label>
                
                <label  className={'form-label'}>
                last_name:
                    <input type="text" value={editedCustomer.last_name} onChange={(ev)=>handleChange(ev,'last_name')}/>
                </label>
                
                <label  className={'form-label'}>
                email:
                    <input type="text" value={editedCustomer.email} onChange={(ev)=>handleChange(ev,'email')}/>
                </label>
                
                <label className={'form-label'}>
                gender:
                    <input type="text" value={editedCustomer.gender} onChange={(ev)=>handleChange(ev,'gender')}/>
                </label>
                
                <label className={'form-label'}>
                country:
                    <input type="text" value={editedCustomer.country} onChange={(ev)=>handleChange(ev,'country')}/>
                </label>
                
                <label className={'form-label'}>
                city:
                    <input type="text" value={editedCustomer.city} onChange={(ev)=>handleChange(ev,'city')}/>
                </label>
                
                <label className={'form-label'}>
                street:
                    <input type="text" value={editedCustomer.street} onChange={(ev)=>handleChange(ev,'street')}/>
                </label>
                
                <label className={'form-label'}>
                phone:
                    <input type="text" value={editedCustomer.phone} onChange={(ev)=>handleChange(ev,'phone')}/>
                </label>


                <label className={'form-label'}>
                cerdit_card_type:
                    <input type="text" value={editedCustomer.cerdit_card_type} onChange={(ev)=>handleChange(ev,'cerdit_card_type')}/>
                </label>

                <label className={'form-label'}>
                cerdit_card_number:
                    <input type="text" value={editedCustomer.cerdit_card_number} onChange={(ev)=>handleChange(ev,'cerdit_card_number')}/>
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

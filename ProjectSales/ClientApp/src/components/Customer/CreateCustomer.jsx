import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

function CreateCustomer(props) {
   const { open, openCreateModal, fetchCustomer, fetchCustomerAgain, customersPerPage } = props;
   const [name, setName] = useState('');
   const [address, setAddress] = useState('');

   const createCustomer = () => {
      axios
         .post('Customers/PostCustomer', {
            name: name,
            address: address,
         })
         .then((res) => {
            openCreateModal(false);
            setName('');
            setAddress('');
            fetchCustomer();
         })
         .catch((err) => {
            alert(err);
         });
   };

   return (
      <div className='modal'>
         <Modal open={open}>
            <Modal.Header>Create Customer</Modal.Header>
            <Modal.Content>
               <Modal.Description>
                  <Form>
                     <Form.Field>
                        <label>Customer Name</label>
                        <input onChange={(e) => setName(e.target.value)} />
                     </Form.Field>
                     <Form.Field>
                        <label>Address</label>
                        <input placeholder='' onChange={(e) => setAddress(e.target.value)} />
                     </Form.Field>
                  </Form>
               </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
               <Button color='green' type='submit' onClick={() => createCustomer(false)}>
                  Add
               </Button>
               <Button color='black' onClick={() => openCreateModal(false)}>
                  Cancel
               </Button>
            </Modal.Actions>
         </Modal>
      </div>
   );
}

export default CreateCustomer;

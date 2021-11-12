import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

function CreateStore(props) {
   const { open, openCreateStoreModal, fetchStore } = props;
   const [name, setName] = useState('');
   const [address, setAddress] = useState('');

   const createStore = () => {
      axios
         .post('Stores/PostStore', {
            name: name,
            address: address,
         })
         .then((res) => {
            openCreateStoreModal(false);
            setName('');
            setAddress('');
            fetchStore();
         })
         .catch((err) => {
            alert(err);
         });
   };

   return (
      <div className='modal'>
         <Modal open={open}>
            <Modal.Header>Create Store</Modal.Header>
            <Modal.Content>
               <Modal.Description>
                  <Form>
                     <Form.Field>
                        <label>Store Name</label>
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
               <Button color='green' onClick={() => createStore(false)}>
                  Add
               </Button>
               <Button color='black' onClick={() => openCreateStoreModal(false)}>
                  Cancel
               </Button>
            </Modal.Actions>
         </Modal>
      </div>
   );
}

export default CreateStore;

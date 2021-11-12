import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'semantic-ui-react';

function CreateProduct(props) {
   const { open, openCreateProductModal, fetchProduct } = props;
   const [name, setName] = useState('');
   const [price, setPrice] = useState('');

   const createProduct = () => {
      axios
         .post('Products/PostProduct', {
            name: name,
            price: price,
         })
         .then((res) => {
            openCreateProductModal(false);
            setName('');
            setPrice('');
            fetchProduct();
         })
         .catch((err) => {
            alert(err);
         });
   };

   return (
      <div className='modal'>
         <Modal open={open}>
            <Modal.Header>Create Product</Modal.Header>
            <Modal.Content>
               <Modal.Description>
                  <Form>
                     <Form.Field>
                        <label>Product Name</label>
                        <input onChange={(e) => setName(e.target.value)} />
                     </Form.Field>
                     <Form.Field>
                        <label>Price</label>
                        <input placeholder='' onChange={(e) => setPrice(e.target.value)} />
                     </Form.Field>
                  </Form>
               </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
               <Button color='green' onClick={() => createProduct(false)}>
                  Add
               </Button>
               <Button color='black' onClick={() => openCreateProductModal(false)}>
                  Cancel
               </Button>
            </Modal.Actions>
         </Modal>
      </div>
   );
}

export default CreateProduct;

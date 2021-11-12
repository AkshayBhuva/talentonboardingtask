import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal, Select } from 'semantic-ui-react';

function CreateSale(props) {
   const { open, openCreateSalesModal, fetchSales } = props;

   const setSalesCustomer = props.customers.map((s) => ({
      key: s.Id,
      text: s.Name,
      value: s.Id,
   }));

   const setSalesProduct = props.products.map((s) => ({
      key: s.Id,
      text: s.Name,
      value: s.Id,
   }));

   const setSalesStore = props.stores.map((s) => ({
      key: s.Id,
      text: s.Name,
      value: s.Id,
   }));

   const [sales, setSales] = useState({
      productId: '',
      customerId: '',
      storeId: '',
      dateSold: '',
   });

   const handleCustomerSelect = (event, data) => {
      sales.customerId = data.value;
   };

   const handleProductSelect = (event, data) => {
      sales.productId = data.value;
   };

   const handleStoreSelect = (event, data) => {
      sales.storeId = data.value;
   };

   const handleSalesChange = (field, value) => {
      setSales({
         ...sales,
         [field]: value,
      });
   };

   const createSales = () => {
      axios
         .post('Sales/PostSales', {
            dateSold: sales.dateSold,
            customerId: sales.customerId,
            productId: sales.productId,
            storeId: sales.storeId,
         })
         .then((res) => {
            openCreateSalesModal(false);

            fetchSales();
         })
         .catch((err) => {
            alert(err);
         });
   };

   return (
      <div>
         <Modal open={open}>
            <Modal.Header>Create Sale</Modal.Header>
            <Modal.Content>
               <Modal.Description>
                  <Form>
                     <Form.Field>
                        <label>Date</label>
                        <input type='date' onChange={(e) => handleSalesChange('dateSold', e.target.value)} />
                     </Form.Field>
                     <Form.Field control={Select} label='Customer' options={setSalesCustomer} onChange={handleCustomerSelect} />
                     <Form.Field control={Select} label='Product' options={setSalesProduct} onChange={handleProductSelect}></Form.Field>
                     <Form.Field control={Select} label='Store' options={setSalesStore} onChange={handleStoreSelect}></Form.Field>
                  </Form>
               </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
               <Button color='green' onClick={() => createSales(false)}>
                  Add
               </Button>
               <Button color='black' onClick={() => openCreateSalesModal(false)}>
                  Cancel
               </Button>
            </Modal.Actions>
         </Modal>
      </div>
   );
}

export default CreateSale;

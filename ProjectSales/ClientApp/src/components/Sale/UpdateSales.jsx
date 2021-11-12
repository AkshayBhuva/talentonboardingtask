import axios from 'axios';
import React, { Component } from 'react';
import { Button, Form, Modal, Select } from 'semantic-ui-react';

export default class UpdateSales extends Component {
   constructor(props) {
      super(props);
      this.state = {
         changeDateSold: this.props.salesDate,
         changeCustomerId: this.props.salesCustomer,
         changeProductId: this.props.salesProduct,
         changeStoreId: this.props.salesStore,
         defaultDate: '',
      };
   }

   updateSale = () => {
      axios
         .put(`Sales/PutSales/${this.props.salesId}`, {
            id: this.props.salesId,
            datesold: this.changeDateSold,
            customerid: this.changeCustomerId,
            productid: this.changeProductId,
            storeid: this.changeStoreId,
         })
         .then((res) => {
            this.props.reloadSales();
            this.props.openEditSalesModal(false);
         })
         .catch((err) => {
            alert(err);
         });
   };

   handleDateSoldChange = (value) => {
      this.changeDateSold = value;
   };
   handleCustomerChange = (event, data) => {
      this.changeCustomerId = data.value;
   };
   handleProductChange = (event, data) => {
      this.changeProductId = data.value;
   };
   handleStoreChange = (event, data) => {
      this.changeStoreId = data.value;
   };

   render() {
      this.changeDateSold = this.props.salesDate;
      this.defaultDate = this.props.salesDate;
      this.changeCustomerId = this.props.salesCustomer;
      this.changeProductId = this.props.salesProduct;
      this.changeStoreId = this.props.salesStore;

      return (
         <div className='modal'>
            <Modal open={this.props.open}>
               <Modal.Header>Update Sale</Modal.Header>
               <Modal.Content>
                  <Modal.Description>
                     <Form>
                        <Form.Field>
                           <label>Date</label>
                           <input type='date' defaultValue={this.defaultDate} onChange={(e) => this.handleDateSoldChange(e.target.value)} />
                        </Form.Field>
                        <Form.Field
                           name='customerId'
                           label='Cusotmer'
                           control={Select}
                           defaultValue={this.props.salesCustomer}
                           onChange={this.handleCustomerChange}
                           options={this.props.customers.map((s) => ({
                              key: s.Id,
                              text: s.Name,
                              value: s.Id,
                           }))}
                        />

                        <Form.Field
                           name='productId'
                           label='Product'
                           control={Select}
                           defaultValue={this.props.salesProduct}
                           onChange={this.handleProductChange}
                           options={this.props.products.map((s) => ({
                              key: s.Id,
                              text: s.Name,
                              value: s.Id,
                           }))}
                        />
                        <Form.Field
                           name='storeId'
                           label='Store'
                           control={Select}
                           defaultValue={this.props.salesStore}
                           onChange={this.handleStoreChange}
                           options={this.props.stores.map((s) => ({
                              key: s.Id,
                              text: s.Name,
                              value: s.Id,
                           }))}
                        />
                     </Form>
                  </Modal.Description>
               </Modal.Content>
               <Modal.Actions>
                  <Button color='green' onClick={this.updateSale}>
                     Update
                  </Button>
                  <Button color='black' onClick={() => this.props.openEditSalesModal(false)}>
                     Cancel
                  </Button>
               </Modal.Actions>
            </Modal>
         </div>
      );
   }
}

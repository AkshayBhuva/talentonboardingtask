import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'semantic-ui-react';

export default class UpdateCustomer extends Component {
   constructor(props) {
      super(props);
   }

   updateCustomer = () => {
      axios
         .put(`Customers/PutCustomer/${this.props.customerId}`, {
            name: this.props.customerName,
            address: this.props.customerAddress,
            id: this.props.customerId,
         })
         .then((res) => {
            this.props.fetchCustomerAgain(this.props.customersPerPage, false, false, false, false);
            this.props.openEditModal(false);
         })
         .catch((err) => {
            alert(err);
         });
   };

   render() {
      return (
         <div className='modal'>
            <Modal open={this.props.open}>
               <Modal.Header>Edit Customer</Modal.Header>
               <Modal.Content>
                  <Modal.Description>
                     <Form>
                        <Form.Field>
                           <label>Customer Name</label>
                           <input placeholder='' value={this.props.customerName} onChange={(e) => this.props.updateCustomerName(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                           <label>Address</label>
                           <input
                              placeholder=''
                              value={this.props.customerAddress}
                              onChange={(e) => this.props.updateCustomerAddress(e.target.value)}
                           />
                        </Form.Field>
                     </Form>
                  </Modal.Description>
               </Modal.Content>
               <Modal.Actions>
                  <Button color='green' onClick={this.updateCustomer}>
                     Update
                  </Button>
                  <Button color='black' onClick={() => this.props.openEditModal(false)}>
                     Cancel
                  </Button>
               </Modal.Actions>
            </Modal>
         </div>
      );
   }
}

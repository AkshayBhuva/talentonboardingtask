import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';

export default class CustomerDeleteModal extends Component {
   constructor(props) {
      super(props);
   }

   deleteCustomer = (id) => {
      axios
         .delete(`Customers/DeleteCustomer/${id}`)
         .then((res) => {
            this.props.reloadCustomers();
            this.props.openDeleteModal(false);
            this.props.fetchCustomerAgain(this.props.customersPerPage, false, false, false, false);
         })
         .catch((err) => {
            console.log(err);
         });
   };
   render() {
      return (
         <div className='modal'>
            <Modal open={this.props.open}>
               <Modal.Header>Delete Customer</Modal.Header>
               <Modal.Content>
                  <p>Are you sure?</p>
               </Modal.Content>
               <Modal.Actions>
                  <Button color='green' onClick={() => this.deleteCustomer(this.props.customerId)}>
                     Yes
                  </Button>
                  <Button color='black' onClick={() => this.props.openDeleteModal(false)}>
                     Cancel
                  </Button>
               </Modal.Actions>
            </Modal>
         </div>
      );
   }
}

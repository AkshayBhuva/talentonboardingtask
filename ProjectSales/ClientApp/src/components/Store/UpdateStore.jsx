import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Modal } from 'semantic-ui-react';

export default class UpdateStore extends Component {
   constructor(props) {
      super(props);
   }

   updateStore = () => {
      axios
         .put(`Stores/PutStore/${this.props.storeId}`, {
            name: this.props.storeName,
            address: this.props.storeAddress,
            id: this.props.storeId,
         })
         .then((res) => {
            this.props.fetchStoreAgain(this.props.storesPerPage, false, false, false, false);
            this.props.openEditStoreModal(false);
         })
         .catch((err) => {
            alert(err);
         });
   };

   render() {
      return (
         <div className='modal'>
            <Modal open={this.props.open}>
               <Modal.Header>Edit Store</Modal.Header>
               <Modal.Content>
                  <Modal.Description>
                     <Form>
                        <Form.Field>
                           <label>Store Name</label>
                           <input placeholder='' value={this.props.storeName} onChange={(e) => this.props.updateStoreName(e.target.value)} />
                        </Form.Field>
                        <Form.Field>
                           <label>Address</label>
                           <input placeholder='' value={this.props.storeAddress} onChange={(e) => this.props.updateStoreAddress(e.target.value)} />
                        </Form.Field>
                     </Form>
                  </Modal.Description>
               </Modal.Content>
               <Modal.Actions>
                  <Button color='green' onClick={this.updateStore}>
                     Update
                  </Button>
                  <Button color='black' onClick={() => this.props.openEditStoreModal(false)}>
                     Cancel
                  </Button>
               </Modal.Actions>
            </Modal>
         </div>
      );
   }
}

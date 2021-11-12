import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';

export default class StoreDeleteModal extends Component {
   constructor(props) {
      super(props);
   }

   deleteStore = (id) => {
      axios
         .delete(`Stores/DeleteStore/${id}`)
         .then((res) => {
            this.props.reloadStores();
            this.props.openDeleteStoreModal(false);
            this.props.fetchStoreAgain(this.props.storesPerPage, false, false, false, false);
         })
         .catch((err) => {
            console.log(err);
         });
   };
   render() {
      return (
         <div className='modal'>
            <Modal open={this.props.open}>
               <Modal.Header>Delete Store</Modal.Header>
               <Modal.Content>
                  <p>Are you sure?</p>
               </Modal.Content>
               <Modal.Actions>
                  <Button color='green' onClick={() => this.deleteStore(this.props.storeId)}>
                     Yes
                  </Button>
                  <Button color='black' onClick={() => this.props.openDeleteStoreModal(false)}>
                     Cancel
                  </Button>
               </Modal.Actions>
            </Modal>
         </div>
      );
   }
}

import React, { Component } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import axios from 'axios';

export default class ProductDeleteModal extends Component {
   constructor(props) {
      super(props);
   }

   deleteProduct = (id) => {
      axios
         .delete(`Products/DeleteProduct/${id}`)
         .then((res) => {
            this.props.reloadProducts();
            this.props.openDeleteProductModal(false);
            this.props.fetchProductAgain(this.props.productsPerPage, false, false, false, false);
         })
         .catch((err) => {
            console.log(err);
         });
   };
   render() {
      return (
         <div className='modal'>
            <Modal open={this.props.open}>
               <Modal.Header>Delete Product</Modal.Header>
               <Modal.Content>
                  <p>Are you sure?</p>
               </Modal.Content>
               <Modal.Actions>
                  <Button color='green' onClick={() => this.deleteProduct(this.props.productId)}>
                     Yes
                  </Button>
                  <Button color='black' onClick={() => this.props.openDeleteProductModal(false)}>
                     Cancel
                  </Button>
               </Modal.Actions>
            </Modal>
         </div>
      );
   }
}

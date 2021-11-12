import React, { Component, Fragment } from 'react';
import { Button, Icon, Table, Label } from 'semantic-ui-react';
import ProductDeleteModal from './ProductDeleteModal';
import UpdateProduct from './UpdateProduct';

export default class ProductTable extends Component {
   constructor(props) {
      super(props);
      this.state = {
         openDeleteProductModal: false,
         openEditProductModal: false,
         selectedProduct: undefined,
         selectedProductName: undefined,
         selectedProductPrice: undefined,
         productssPerPage: undefined,
      };
   }

   updateProductName = (productName) => {
      this.setState({ selectedProductName: productName });
   };

   updateProductPrice = (productPrice) => {
      this.setState({ selectedProductPrice: productPrice });
   };

   openEditProductModal = (productId, productName, productPrice) => {
      this.setState({
         openEditProductModal: productId ? true : false,
         selectedProduct: productId,
         selectedProductName: productName,
         selectedProductPrice: productPrice,
      });
   };

   openDeleteProductModal = (productId) => {
      this.setState({
         openDeleteProductModal: productId ? true : false,
         selectedProduct: productId,
      });
   };

   prevPageIcon() {
      if (this.props.pageNumber > 1) {
         return (
            <Fragment>
               <Label
                  className='cursor'
                  color='blue'
                  onClick={() => this.props.fetchProductAgain(this.props.productsPerPage, false, false, false, true)}
               >
                  <Icon fitted name='arrow left' />
               </Label>
            </Fragment>
         );
      } else return ' ';
   }

   pageNumberIcon() {
      return <Label color='blue'>{this.props.pageNumber}</Label>;
   }

   nextPageIcon() {
      if (this.props.totalProducts > this.props.productsPerPage * this.props.pageNumber) {
         return (
            <Fragment>
               <Label
                  className='cursor'
                  color='blue'
                  onClick={() => this.props.fetchProductAgain(this.props.productsPerPage, false, false, true, false)}
               >
                  <Icon fitted name='arrow right' />
               </Label>
            </Fragment>
         );
      } else return ' ';
   }

   nameIsSortIcon() {
      if (this.props.nameIsSortAsc === true) {
         return (
            <Fragment>
               <Icon fitted name='sort ascending' />
            </Fragment>
         );
      } else if (this.props.nameIsSortDesc === true) {
         return (
            <Fragment>
               <Icon fitted name='sort descending' />
            </Fragment>
         );
      } else return <Icon fitted name='sort' />;
   }

   priceIsSortIcon() {
      if (this.props.priceIsSortAsc === true) {
         return (
            <Fragment>
               <Icon fitted name='sort ascending' />
            </Fragment>
         );
      } else if (this.props.priceIsSortDesc === true) {
         return (
            <Fragment>
               <Icon fitted name='sort descending' />
            </Fragment>
         );
      } else return <Icon fitted name='sort' />;
   }

   render() {
      return (
         <div>
            <Table celled>
               <Table.Header>
                  <Table.Row>
                     <Table.HeaderCell onClick={() => this.props.fetchProductAgain(this.props.productsPerPage, true, false, false, false)}>
                        <div className='cursor'>Name {this.nameIsSortIcon()}</div>
                     </Table.HeaderCell>
                     <Table.HeaderCell onClick={() => this.props.fetchProductAgain(this.props.productsPerPage, false, true, false, false)}>
                        <div className='cursor'>Price {this.priceIsSortIcon()}</div>
                     </Table.HeaderCell>
                     <Table.HeaderCell>Action</Table.HeaderCell>
                     <Table.HeaderCell>Action</Table.HeaderCell>
                  </Table.Row>
               </Table.Header>

               <Table.Body>
                  {this.props.products.map((p) => {
                     return (
                        <Table.Row key={p.Id}>
                           <Table.Cell>{p.Name}</Table.Cell>
                           <Table.Cell>$ {p.Price}</Table.Cell>
                           <Table.Cell>
                              <Button
                                 color='yellow'
                                 onClick={() => {
                                    this.openEditProductModal(p.Id, p.Name, p.Price);
                                 }}
                              >
                                 <Icon fitted name='edit' />
                                 &ensp;Edit
                              </Button>
                           </Table.Cell>
                           <Table.Cell>
                              <Button color='red' onClick={() => this.openDeleteProductModal(p.Id)}>
                                 <Icon fitted name='trash' />
                                 &ensp;Delete
                              </Button>
                           </Table.Cell>
                        </Table.Row>
                     );
                  })}
               </Table.Body>
            </Table>

            <div>
               <table border='0' width='100%'>
                  <thead>
                     <tr>
                        <th align='left'>
                           &nbsp;
                           <select
                              name='TotalRecordsPerPage'
                              id='TotalRecordsPerPage'
                              defaultValue='10'
                              onChange={(e) => this.props.fetchProductAgain(e.target.value, false, false, false, false)}
                           >
                              <option value='5' name='5'>
                                 &nbsp;5&nbsp;
                              </option>
                              <option value='10' name='10'>
                                 &nbsp;10&nbsp;
                              </option>
                              <option value='20' name='20'>
                                 &nbsp;20&nbsp;
                              </option>
                           </select>
                        </th>
                        <th align='left'>
                           {this.prevPageIcon()}
                           {this.pageNumberIcon()}
                           {this.nextPageIcon()}
                           &nbsp;
                        </th>
                     </tr>
                  </thead>
               </table>
            </div>

            <ProductDeleteModal
               open={this.state.openDeleteProductModal}
               productId={this.state.selectedProduct}
               openDeleteProductModal={this.openDeleteProductModal}
               reloadProducts={this.props.refresh}
               productsPerPage={this.props.productsPerPage}
               fetchProductAgain={this.props.fetchProductAgain}
            />
            <UpdateProduct
               open={this.state.openEditProductModal}
               productId={this.state.selectedProduct}
               productName={this.state.selectedProductName}
               productPrice={this.state.selectedProductPrice}
               updateProductName={this.updateProductName}
               updateProductPrice={this.updateProductPrice}
               openEditProductModal={this.openEditProductModal}
               reloadProducts={this.props.refresh}
               productsPerPage={this.props.productsPerPage}
               fetchProductAgain={this.props.fetchProductAgain}
            />
         </div>
      );
   }
}

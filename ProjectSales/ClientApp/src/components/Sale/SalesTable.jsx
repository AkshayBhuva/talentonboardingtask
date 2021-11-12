import React, { Component, Fragment } from 'react';
import { Button, Icon, Label, Table } from 'semantic-ui-react';
import UpdateSales from './UpdateSales';
import SalesDeleteModal from './SalesDeleteModal';
import DateObject from 'react-date-object';

export default class SalesTable extends Component {
   constructor(props) {
      super(props);
      this.state = {
         openDeleteSalesModal: false,
         openEditSalesModal: false,
         selectedSalesId: undefined,
         selectedSalesDate: undefined,
         selectedCustomer: undefined,
         selectedProduct: undefined,
         selectedStore: undefined,
         salesPerPage: undefined,
      };
   }

   openEditSalesModal = (saleId, saleDate, saleCustomer, saleProduct, saleStore) => {
      this.setState({
         openEditSalesModal: saleId ? true : false,
         selectedSalesId: saleId,
         selectedSalesDate: saleDate,
         selectedCustomer: saleCustomer,
         selectedProduct: saleProduct,
         selectedStore: saleStore,
      });
   };

   openDeleteSalesModal = (salesId) => {
      this.setState({
         openDeleteSalesModal: salesId ? true : false,
         selectedSalesId: salesId,
      });
   };

   prevPageIcon() {
      if (this.props.pageNumber > 1) {
         return (
            <Fragment>
               <Label
                  className='cursor'
                  color='blue'
                  onClick={() => this.props.fetchSalesAgain(this.props.salesPerPage, false, false, false, false, false, true)}
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
      if (this.props.totalSales > this.props.salesPerPage * this.props.pageNumber) {
         return (
            <Fragment>
               <Label
                  className='cursor'
                  color='blue'
                  onClick={() => this.props.fetchSalesAgain(this.props.salesPerPage, false, false, false, false, true, false)}
               >
                  <Icon fitted name='arrow right' />
               </Label>
            </Fragment>
         );
      } else return ' ';
   }

   productIsSortIcon() {
      if (this.props.productIsSortAsc === true) {
         return (
            <Fragment>
               <Icon fitted name='sort ascending' />
            </Fragment>
         );
      } else if (this.props.productIsSortDesc === true) {
         return (
            <Fragment>
               <Icon fitted name='sort descending' />
            </Fragment>
         );
      } else return <Icon fitted name='sort' />;
   }

   customerIsSortIcon() {
      if (this.props.customerIsSortAsc === true) {
         return (
            <Fragment>
               <Icon fitted name='sort ascending' />
            </Fragment>
         );
      } else if (this.props.customerIsSortDesc === true) {
         return (
            <Fragment>
               <Icon fitted name='sort descending' />
            </Fragment>
         );
      } else return <Icon fitted name='sort' />;
   }

   storeIsSortIcon() {
      if (this.props.storeIsSortAsc === true) {
         return (
            <Fragment>
               <Icon fitted name='sort ascending' />
            </Fragment>
         );
      } else if (this.props.storeIsSortDesc === true) {
         return (
            <Fragment>
               <Icon fitted name='sort descending' />
            </Fragment>
         );
      } else return <Icon fitted name='sort' />;
   }

   dateSoldIsSortIcon() {
      if (this.props.dateSoldIsSortAsc === true) {
         return (
            <Fragment>
               <Icon fitted name='sort ascending' />
            </Fragment>
         );
      } else if (this.props.dateSoldIsSortDesc === true) {
         return (
            <Fragment>
               <Icon fitted name='sort descending' />
            </Fragment>
         );
      } else return <Icon fitted name='sort' />;
   }

   render() {
      const { openEditSalesModal, openDeleteSalesModal, selectedSalesId, selectedSalesDate, selectedCustomer, selectedProduct, selectedStore } =
         this.state;
      return (
         <div>
            <Table celled>
               <Table.Header>
                  <Table.Row>
                     <Table.HeaderCell onClick={() => this.props.fetchSalesAgain(this.props.salesPerPage, false, true, false, false, false, false)}>
                        <div className='cursor'>Customer {this.customerIsSortIcon()}</div>
                     </Table.HeaderCell>
                     <Table.HeaderCell onClick={() => this.props.fetchSalesAgain(this.props.salesPerPage, true, false, false, false, false, false)}>
                        <div className='cursor'>Product {this.productIsSortIcon()}</div>
                     </Table.HeaderCell>
                     <Table.HeaderCell onClick={() => this.props.fetchSalesAgain(this.props.salesPerPage, false, false, true, false, false, false)}>
                        <div className='cursor'>Store {this.storeIsSortIcon()}</div>
                     </Table.HeaderCell>
                     <Table.HeaderCell onClick={() => this.props.fetchSalesAgain(this.props.salesPerPage, false, false, false, true, false, false)}>
                        <div className='cursor'>Date Sold {this.dateSoldIsSortIcon()}</div>
                     </Table.HeaderCell>
                     <Table.HeaderCell>Action</Table.HeaderCell>
                     <Table.HeaderCell>Action</Table.HeaderCell>
                  </Table.Row>
               </Table.Header>

               <Table.Body>
                  {this.props.sales.map((s) => {
                     return (
                        <Table.Row key={s.Id}>
                           <Table.Cell>{s.Customer.Name}</Table.Cell>
                           <Table.Cell>{s.Product.Name}</Table.Cell>
                           <Table.Cell>{s.Store.Name}</Table.Cell>
                           <Table.Cell>{new DateObject(s.DateSold).format('DD MMM, YYYY')}</Table.Cell>

                           <Table.Cell>
                              <Button
                                 color='yellow'
                                 onClick={() => {
                                    this.openEditSalesModal(s.Id, s.DateSold, s.CustomerId, s.ProductId, s.StoreId);
                                 }}
                              >
                                 <Icon fitted name='edit' />
                                 &ensp;Edit
                              </Button>
                           </Table.Cell>
                           <Table.Cell>
                              <Button color='red' onClick={() => this.openDeleteSalesModal(s.Id)}>
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
                              onChange={(e) => this.props.fetchSalesAgain(e.target.value, false, false, false, false, false, false)}
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
                        <th align='right'>
                           {this.prevPageIcon()}
                           {this.pageNumberIcon()}
                           {this.nextPageIcon()}
                           &nbsp;
                        </th>
                     </tr>
                  </thead>
               </table>
            </div>

            <SalesDeleteModal
               open={openDeleteSalesModal}
               salesId={this.state.selectedSalesId}
               openDeleteSalesModal={this.openDeleteSalesModal}
               reloadSales={this.props.refresh}
               salesPerPage={this.props.salesPerPage}
               fetchSalesAgain={this.props.fetchSalesAgain}
            />
            <UpdateSales
               open={openEditSalesModal}
               openEditSalesModal={this.openEditSalesModal}
               salesId={selectedSalesId}
               salesDate={selectedSalesDate}
               salesCustomer={selectedCustomer}
               salesProduct={selectedProduct}
               salesStore={selectedStore}
               reloadSales={this.props.refresh}
               products={this.props.products}
               customers={this.props.customers}
               stores={this.props.stores}
               salesPerPage={this.props.salesPerPage}
               fetchSalesAgain={this.props.fetchSalesAgain}
            />
         </div>
      );
   }
}

import React, { Component, Fragment } from 'react';
import { Button, Icon, Label, Table } from 'semantic-ui-react';
import CustomerDeleteModal from './CustomerDeleteModal';
import UpdateCustomer from './UpdateCustomer';

export default class CustomerTable extends Component {
   constructor(props) {
      super(props);
      this.state = {
         openDeleteModal: false,
         openEditModal: false,
         selectedCustomer: undefined,
         selectedCustomerName: undefined,
         selectedCustomerAddress: undefined,
         customersPerPage: undefined,
      };
   }

   updateCustomerName = (customerName) => {
      this.setState({ selectedCustomerName: customerName });
   };

   updateCustomerAddress = (customerAddress) => {
      this.setState({ selectedCustomerAddress: customerAddress });
   };

   openEditModal = (customerId, customerName, customerAddress) => {
      this.setState({
         openEditModal: customerId ? true : false,
         selectedCustomer: customerId,
         selectedCustomerName: customerName,
         selectedCustomerAddress: customerAddress,
      });
   };

   openDeleteModal = (customerId) => {
      this.setState({
         openDeleteModal: customerId ? true : false,
         selectedCustomer: customerId,
      });
   };

   prevPageIcon() {
      if (this.props.pageNumber > 1) {
         return (
            <Fragment>
               <Label
                  className='cursor'
                  color='blue'
                  onClick={() => this.props.fetchCustomerAgain(this.props.customersPerPage, false, false, false, true)}
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
      if (this.props.totalCustomers > this.props.customersPerPage * this.props.pageNumber) {
         return (
            <Fragment>
               <Label
                  className='cursor'
                  color='blue'
                  onClick={() => this.props.fetchCustomerAgain(this.props.customersPerPage, false, false, true, false)}
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

   addressIsSortIcon() {
      if (this.props.addressIsSortAsc === true) {
         return (
            <Fragment>
               <Icon fitted name='sort ascending' />
            </Fragment>
         );
      } else if (this.props.addressIsSortDesc === true) {
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
            <Table celled sortable>
               <Table.Header>
                  <Table.Row>
                     <Table.HeaderCell onClick={() => this.props.fetchCustomerAgain(this.props.customersPerPage, true, false, false, false)}>
                        <div className='cursor'>Name {this.nameIsSortIcon()}</div>
                     </Table.HeaderCell>
                     <Table.HeaderCell onClick={() => this.props.fetchCustomerAgain(this.props.customersPerPage, false, true, false, false)}>
                        <div className='cursor'>Address {this.addressIsSortIcon()}</div>
                     </Table.HeaderCell>
                     <Table.HeaderCell>Action</Table.HeaderCell>
                     <Table.HeaderCell>Action</Table.HeaderCell>
                  </Table.Row>
               </Table.Header>

               <Table.Body>
                  {this.props.customers.map((c) => {
                     return (
                        <Table.Row key={c.Id}>
                           <Table.Cell>{c.Name}</Table.Cell>
                           <Table.Cell>{c.Address}</Table.Cell>
                           <Table.Cell>
                              <Button
                                 color='yellow'
                                 onClick={() => {
                                    this.openEditModal(c.Id, c.Name, c.Address);
                                 }}
                              >
                                 <Icon fitted name='edit' />
                                 &ensp;Edit
                              </Button>
                           </Table.Cell>
                           <Table.Cell>
                              <Button color='red' onClick={() => this.openDeleteModal(c.Id)}>
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
                              onChange={(e) => this.props.fetchCustomerAgain(e.target.value, false, false, false, false)}
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

            <CustomerDeleteModal
               open={this.state.openDeleteModal}
               customerId={this.state.selectedCustomer}
               openDeleteModal={this.openDeleteModal}
               reloadCustomers={this.props.refresh}
               customersPerPage={this.props.customersPerPage}
               fetchCustomerAgain={this.props.fetchCustomerAgain}
            />
            <UpdateCustomer
               open={this.state.openEditModal}
               customerId={this.state.selectedCustomer}
               customerName={this.state.selectedCustomerName}
               customerAddress={this.state.selectedCustomerAddress}
               updateCustomerName={this.updateCustomerName}
               updateCustomerAddress={this.updateCustomerAddress}
               openEditModal={this.openEditModal}
               reloadCustomers={this.props.refresh}
               customersPerPage={this.props.customersPerPage}
               fetchCustomerAgain={this.props.fetchCustomerAgain}
            />
         </div>
      );
   }
}

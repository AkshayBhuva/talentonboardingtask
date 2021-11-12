import React, { Component, Fragment } from 'react';
import { Button, Icon, Table, Label } from 'semantic-ui-react';
import StoreDeleteModal from './StoreDeleteModal';
import UpdateStore from './UpdateStore';

export default class StoreTable extends Component {
   constructor(props) {
      super(props);
      this.state = {
         openDeleteStoreModal: false,
         openEditStoreModal: false,
         selectedStore: undefined,
         selectedStoreName: undefined,
         selectedStoreAddress: undefined,
         storesPerPage: undefined,
      };
   }

   updateStoreName = (storeName) => {
      this.setState({ selectedStoreName: storeName });
   };

   updateStoreAddress = (storeAddress) => {
      this.setState({ selectedStoreAddress: storeAddress });
   };

   openEditStoreModal = (storeId, storeName, storeAddress) => {
      this.setState({
         openEditStoreModal: storeId ? true : false,
         selectedStore: storeId,
         selectedStoreName: storeName,
         selectedStoreAddress: storeAddress,
      });
   };

   openDeleteStoreModal = (storeId) => {
      this.setState({
         openDeleteStoreModal: storeId ? true : false,
         selectedStore: storeId,
      });
   };

   prevPageIcon() {
      if (this.props.pageNumber > 1) {
         return (
            <Fragment>
               <Label className='cursor' color='blue' onClick={() => this.props.fetchStoreAgain(this.props.storesPerPage, false, false, false, true)}>
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
      if (this.props.totalStores > this.props.storesPerPage * this.props.pageNumber) {
         return (
            <Fragment>
               <Label className='cursor' color='blue' onClick={() => this.props.fetchStoreAgain(this.props.storesPerPage, false, false, true, false)}>
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
            <Table celled>
               <Table.Header>
                  <Table.Row>
                     <Table.HeaderCell onClick={() => this.props.fetchStoreAgain(this.props.storesPerPage, true, false, false, false)}>
                        <div className='cursor'>Name {this.nameIsSortIcon()}</div>
                     </Table.HeaderCell>
                     <Table.HeaderCell onClick={() => this.props.fetchStoreAgain(this.props.storesPerPage, false, true, false, false)}>
                        <div className='cursor'>Address {this.addressIsSortIcon()}</div>
                     </Table.HeaderCell>
                     <Table.HeaderCell>Action</Table.HeaderCell>
                     <Table.HeaderCell>Action</Table.HeaderCell>
                  </Table.Row>
               </Table.Header>

               <Table.Body>
                  {this.props.stores.map((s) => {
                     return (
                        <Table.Row key={s.Id}>
                           <Table.Cell>{s.Name}</Table.Cell>
                           <Table.Cell>{s.Address}</Table.Cell>
                           <Table.Cell>
                              <Button
                                 color='yellow'
                                 onClick={() => {
                                    this.openEditStoreModal(s.Id, s.Name, s.Address);
                                 }}
                              >
                                 <Icon fitted name='edit' />
                                 &ensp;Edit
                              </Button>
                           </Table.Cell>
                           <Table.Cell>
                              <Button color='red' onClick={() => this.openDeleteStoreModal(s.Id)}>
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
                              onChange={(e) => this.props.fetchStoreAgain(e.target.value, false, false, false, false)}
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

            <StoreDeleteModal
               open={this.state.openDeleteStoreModal}
               storeId={this.state.selectedStore}
               openDeleteStoreModal={this.openDeleteStoreModal}
               reloadStores={this.props.refresh}
               storesPerPage={this.props.storesPerPage}
               fetchStoreAgain={this.props.fetchStoreAgain}
            />
            <UpdateStore
               open={this.state.openEditStoreModal}
               storeId={this.state.selectedStore}
               storeName={this.state.selectedStoreName}
               storeAddress={this.state.selectedStoreAddress}
               updateStoreName={this.updateStoreName}
               updateStoreAddress={this.updateStoreAddress}
               openEditStoreModal={this.openEditStoreModal}
               reloadStores={this.props.refresh}
               storesPerPage={this.props.storesPerPage}
               fetchStoreAgain={this.props.fetchStoreAgain}
            />
         </div>
      );
   }
}

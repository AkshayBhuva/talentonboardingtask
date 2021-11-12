import React, { Component } from 'react';
import axios from 'axios';
import { Button, Loader } from 'semantic-ui-react';
import CustomerTable from './CustomerTable';
import CreateCustomer from './CreateCustomer';
import { isFlowPredicate } from '@babel/types';

export default class CustomerHomePage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         customer: [],
         open: false,
         customersPerPage: undefined,
         totalCustomers: undefined,
         pageNumber: undefined,
         isSort: false,
         nameIsSort: false,
         nameIsSortAsc: false,
         nameIsSortDesc: false,
         addressIsSort: false,
         addressIsSortAsc: false,
         addressIsSortDesc: false,
      };
   }

   componentDidMount() {
      this.fetchCustomer();
   }

   fetchCustomer = () => {
      var customer;
      axios
         .get('/Customers/GetCustomer')
         .then(({ data }) => {
            customer = data;
            this.setState({
               open: false,
               pageNumber: 1,
               isSort: true,
               nameIsSort: true,
               nameIsSortAsc: false,
               nameIsSortDesc: false,
               addressIsSort: false,
               addressIsSortAsc: false,
               addressIsSortDesc: false,
               customersPerPage: 10,
               customers: customer.slice(0, 10),
               totalCustomers: data.length,
            });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   fetchCustomerAgain = (customersPerPage, nameSortSelect, addressSortSelect, nextPageSelect, prevPageSelect) => {
      var tempCustomers;
      var tempArray;
      var nextPageCount;
      var customersPageIndex;

      if (nameSortSelect === true) {
         this.setState({
            nameIsSort: true,
            isSort: false,
            addressIsSort: false,
            addressIsSortAsc: false,
            addressIsSortDesc: false,
         });
      }

      if (addressSortSelect === true) {
         this.setState({
            nameIsSort: false,
            isSort: false,
            addressIsSort: true,
            nameIsSortAsc: false,
            nameIsSortDesc: false,
         });
      }

      if (nextPageSelect === true) {
         customersPageIndex = parseInt(this.state.customersPerPage) * parseInt(this.state.pageNumber);
         nextPageCount = customersPageIndex + parseInt(this.state.customersPerPage);
         this.setState({ pageNumber: parseInt(this.state.pageNumber) + 1 });
      }

      if (prevPageSelect === true) {
         customersPageIndex = parseInt(this.state.customersPerPage) * parseInt(this.state.pageNumber) - parseInt(this.state.customersPerPage) * 2;
         nextPageCount = customersPageIndex + parseInt(this.state.customersPerPage);
         this.setState({ pageNumber: parseInt(this.state.pageNumber) - 1 });
      }

      if (nameSortSelect === true && this.state.nameIsSortAsc === false && this.state.nameIsSortDesc === true) {
         this.setState({ nameIsSortAsc: true, nameIsSortDesc: false });
      } else if (nameSortSelect === true && this.state.nameIsSortAsc === true && this.state.nameIsSortDesc === false) {
         this.setState({ nameIsSortDesc: true, nameIsSortAsc: false });
      } else if (nameSortSelect === true && this.state.nameIsSortAsc === false && this.state.nameIsSortDesc === false) {
         this.setState({ nameIsSortAsc: true, nameIsSortDesc: false });
      }

      if (addressSortSelect === true && this.state.addressIsSortAsc === false && this.state.addressIsSortDesc === true) {
         this.setState({ addressIsSortAsc: true, addressIsSortDesc: false });
      } else if (addressSortSelect === true && this.state.addressIsSortAsc === true && this.state.addressIsSortDesc === false) {
         this.setState({ addressIsSortDesc: true, addressIsSortAsc: false });
      } else if (addressSortSelect === true && this.state.addressIsSortAsc === false && this.state.addressIsSortDesc === false) {
         this.setState({ addressIsSortAsc: true, addressIsSortDesc: false });
      }

      axios
         .get('/Customers/GetCustomer')
         .then(({ data }) => {
            tempArray = data;
            if (this.state.nameIsSort === true && nameSortSelect === true && this.state.nameIsSortAsc === true) {
               tempCustomers = tempArray.sort((a, b) => (a.Name > b.Name ? 1 : -1));
            }
            if (this.state.nameIsSort === true && nameSortSelect === true && this.state.nameIsSortDesc === true) {
               tempCustomers = tempArray.sort((a, b) => (a.Name < b.Name ? 1 : -1));
            }
            if (nameSortSelect === false && this.state.nameIsSortAsc === true) {
               tempCustomers = tempArray.sort((a, b) => (a.Name > b.Name ? 1 : -1));
            }
            if (nameSortSelect === false && this.state.nameIsSortDesc === true) {
               tempCustomers = tempArray.sort((a, b) => (a.Name < b.Name ? 1 : -1));
            }

            if (this.state.addressIsSort === true && addressSortSelect === true && this.state.addressIsSortAsc === true) {
               tempCustomers = tempArray.sort((a, b) => (a.Address > b.Address ? 1 : -1));
            }
            if (this.state.addressIsSort === true && addressSortSelect === true && this.state.addressIsSortDesc === true) {
               tempCustomers = tempArray.sort((a, b) => (a.Address < b.Address ? 1 : -1));
            }
            if (addressSortSelect === false && this.state.addressIsSortAsc === true) {
               tempCustomers = tempArray.sort((a, b) => (a.Address > b.Address ? 1 : -1));
            }
            if (addressSortSelect === false && this.state.addressIsSortDesc === true) {
               tempCustomers = tempArray.sort((a, b) => (a.Address < b.Address ? 1 : -1));
            }

            if (this.state.isSort === true && nextPageSelect === false && prevPageSelect === false) {
               tempCustomers = tempArray;
               customersPageIndex = parseInt(customersPerPage) * parseInt(this.state.pageNumber) - parseInt(customersPerPage);
               nextPageCount = customersPageIndex + parseInt(customersPerPage);
               this.setState({
                  customersPerPage: customersPerPage,
                  customers: tempCustomers.slice(customersPageIndex, nextPageCount),
                  totalCustomers: tempArray.length,
               });
            }

            if (nextPageSelect === false && prevPageSelect === false && this.state.isSort === false) {
               customersPageIndex = parseInt(customersPerPage) * parseInt(this.state.pageNumber) - parseInt(customersPerPage);
               nextPageCount = customersPageIndex + parseInt(customersPerPage);
               this.setState({
                  customersPerPage: customersPerPage,
                  customers: tempCustomers.slice(customersPageIndex, nextPageCount),
                  totalCustomers: tempArray.length,
               });
            }
            if (nextPageSelect === true) {
               tempCustomers = tempArray;
               this.setState({ customers: tempCustomers.slice(customersPageIndex, nextPageCount) });
            }
            if (prevPageSelect === true) {
               tempCustomers = tempArray;
               this.setState({ customers: tempCustomers.slice(customersPageIndex, nextPageCount) });
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   openCreateModal = (value) => {
      this.setState({
         open: value,
      });
   };

   render() {
      const { customers, open } = this.state;
      if (customers) {
         return (
            <div>
               <h1>Customer</h1>
               <Button className='mb-2' color='blue' onClick={() => this.openCreateModal(true)}>
                  New Customer
               </Button>
               <CreateCustomer open={open} openCreateModal={this.openCreateModal} fetchCustomer={this.fetchCustomer} customers={customers} />
               <CustomerTable
                  customers={customers}
                  refresh={this.fetchCustomer}
                  pageNumber={this.state.pageNumber}
                  totalCustomers={this.state.totalCustomers}
                  isSort={this.state.isSort}
                  customersPerPage={this.state.customersPerPage}
                  nameIsSort={this.state.nameIsSort}
                  nameIsSortAsc={this.state.nameIsSortAsc}
                  nameIsSortDesc={this.state.nameIsSortDesc}
                  addressIsSort={this.state.addressIsSort}
                  addressIsSortAsc={this.state.addressIsSortAsc}
                  addressIsSortDesc={this.state.addressIsSortDesc}
                  fetchCustomerAgain={this.fetchCustomerAgain}
               />
            </div>
         );
      } else {
         return (
            <div>
               <Loader />
            </div>
         );
      }
   }
}

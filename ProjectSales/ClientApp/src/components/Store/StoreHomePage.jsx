import React, { Component } from 'react';
import axios from 'axios';
import { Button, Loader } from 'semantic-ui-react';
import StoreTable from './StoreTable';
import CreateStore from './CreateStore';

export default class StoreHomePage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         store: null,
         open: false,
         storesPerPage: undefined,
         totalStores: undefined,
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
      this.fetchStore();
   }

   fetchStore = () => {
      var store;
      axios
         .get('/Stores/GetStore')
         .then(({ data }) => {
            // console.log(data);
            store = data;
            this.setState({
               // stores: data
               open: false,
               pageNumber: 1,
               isSort: true,
               nameIsSort: true,
               nameIsSortAsc: false,
               nameIsSortDesc: false,
               addressIsSort: false,
               addressIsSortAsc: false,
               addressIsSortDesc: false,
               storesPerPage: 10,
               stores: store.slice(0, 10),
               totalStores: data.length,
            });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   fetchStoreAgain = (storesPerPage, nameSortSelect, addressSortSelect, nextPageSelect, prevPageSelect) => {
      var tempStores;
      var tempArray;
      var nextPageCount;
      var storesPageIndex;

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
         storesPageIndex = parseInt(this.state.storesPerPage) * parseInt(this.state.pageNumber);
         nextPageCount = storesPageIndex + parseInt(this.state.storesPerPage);
         this.setState({ pageNumber: parseInt(this.state.pageNumber) + 1 });
      }

      if (prevPageSelect === true) {
         storesPageIndex = parseInt(this.state.storesPerPage) * parseInt(this.state.pageNumber) - parseInt(this.state.storesPerPage) * 2;
         nextPageCount = storesPageIndex + parseInt(this.state.storesPerPage);
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
         .get('/Stores/GetStore')
         .then(({ data }) => {
            tempArray = data;
            if (this.state.nameIsSort === true && nameSortSelect === true && this.state.nameIsSortAsc === true) {
               tempStores = tempArray.sort((a, b) => (a.Name > b.Name ? 1 : -1));
            }
            if (this.state.nameIsSort === true && nameSortSelect === true && this.state.nameIsSortDesc === true) {
               tempStores = tempArray.sort((a, b) => (a.Name < b.Name ? 1 : -1));
            }
            if (nameSortSelect === false && this.state.nameIsSortAsc === true) {
               tempStores = tempArray.sort((a, b) => (a.Name > b.Name ? 1 : -1));
            }
            if (nameSortSelect === false && this.state.nameIsSortDesc === true) {
               tempStores = tempArray.sort((a, b) => (a.Name < b.Name ? 1 : -1));
            }

            if (this.state.addressIsSort === true && addressSortSelect === true && this.state.addressIsSortAsc === true) {
               tempStores = tempArray.sort((a, b) => (a.Address > b.Address ? 1 : -1));
            }
            if (this.state.addressIsSort === true && addressSortSelect === true && this.state.addressIsSortDesc === true) {
               tempStores = tempArray.sort((a, b) => (a.Address < b.Address ? 1 : -1));
            }
            if (addressSortSelect === false && this.state.addressIsSortAsc === true) {
               tempStores = tempArray.sort((a, b) => (a.Address > b.Address ? 1 : -1));
            }
            if (addressSortSelect === false && this.state.addressIsSortDesc === true) {
               tempStores = tempArray.sort((a, b) => (a.Address < b.Address ? 1 : -1));
            }

            if (this.state.isSort === true && nextPageSelect === false && prevPageSelect === false) {
               tempStores = tempArray;
               storesPageIndex = parseInt(storesPerPage) * parseInt(this.state.pageNumber) - parseInt(storesPerPage);
               nextPageCount = storesPageIndex + parseInt(storesPerPage);
               this.setState({
                  storesPerPage: storesPerPage,
                  stores: tempStores.slice(storesPageIndex, nextPageCount),
                  totalStores: tempArray.length,
               });
            }

            if (nextPageSelect === false && prevPageSelect === false && this.state.isSort === false) {
               storesPageIndex = parseInt(storesPerPage) * parseInt(this.state.pageNumber) - parseInt(storesPerPage);
               nextPageCount = storesPageIndex + parseInt(storesPerPage);
               this.setState({
                  storesPerPage: storesPerPage,
                  stores: tempStores.slice(storesPageIndex, nextPageCount),
                  totalStores: tempArray.length,
               });
            }
            if (nextPageSelect === true) {
               tempStores = tempArray;
               this.setState({ stores: tempStores.slice(storesPageIndex, nextPageCount) });
            }
            if (prevPageSelect === true) {
               tempStores = tempArray;
               this.setState({ stores: tempStores.slice(storesPageIndex, nextPageCount) });
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   openCreateStoreModal = (value) => {
      this.setState({
         open: value,
      });
   };

   render() {
      const { stores, open } = this.state;
      if (stores) {
         return (
            <div>
               <h1>Store</h1>
               <Button className='mb-2' color='blue' onClick={() => this.openCreateStoreModal(true)}>
                  New Store
               </Button>
               <CreateStore open={open} openCreateStoreModal={this.openCreateStoreModal} fetchStore={this.fetchStore} stores={stores} />
               <StoreTable
                  stores={stores}
                  refresh={this.fetchStore}
                  pageNumber={this.state.pageNumber}
                  totalStores={this.state.totalStores}
                  isSort={this.state.isSort}
                  storesPerPage={this.state.storesPerPage}
                  nameIsSort={this.state.nameIsSort}
                  nameIsSortAsc={this.state.nameIsSortAsc}
                  nameIsSortDesc={this.state.nameIsSortDesc}
                  addressIsSort={this.state.addressIsSort}
                  addressIsSortAsc={this.state.addressIsSortAsc}
                  addressIsSortDesc={this.state.addressIsSortDesc}
                  fetchStoreAgain={this.fetchStoreAgain}
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

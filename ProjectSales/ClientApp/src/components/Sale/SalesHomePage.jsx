import axios from 'axios';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import CreateSale from './CreateSale';
import SalesTable from './SalesTable';

export default class SalesHomePage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         sales: [],
         customers: [],
         products: [],
         stores: [],
         open: false,
         salesPerPage: '',
         totalSales: '',
         pageNumber: '',
         isSort: false,
         productIsSort: false,
         productIsSortAsc: false,
         productIsSortDesc: false,
         customerIsSort: false,
         customerIsSortAsc: false,
         customerIsSortDesc: false,
         storeIsSort: false,
         storeIsSortAsc: false,
         storeIsSortDesc: false,
         dateSoldIsSort: false,
         dateSoldIsSortAsc: false,
         dateSoldIsSortDesc: false,
      };
   }

   componentDidMount() {
      this.fetchSales();
      this.fetchCustomers();
      this.fetchProducts();
      this.fetchStores();
   }

   fetchSales = () => {
      var sale;
      axios
         .get('/Sales/GetSales')
         .then(({ data }) => {
            sale = data;
            this.setState({
               open: false,
               pageNumber: 1,
               isSort: true,
               productIsSort: false,
               customerIsSort: false,
               storeIsSort: false,
               dateSoldIsSort: false,
               salesPerPage: 10,
               sales: sale.slice(0, 10),
               totalSales: data.length,
               customerIsSortAsc: false,
               customerIsSortDesc: false,
               productIsSortAsc: false,
               productIsSortDesc: false,
               storeIsSortAsc: false,
               storeIsSortDesc: false,
               dateSoldIsSortAsc: false,
               dateSoldIsSortDesc: false,
            });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   fetchCustomers = () => {
      axios
         .get('/Customers/GetCustomer')
         .then(({ data }) => {
            this.setState({
               customers: data,
            });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   fetchProducts = () => {
      axios
         .get('/Products/GetProduct')
         .then(({ data }) => {
            this.setState({
               products: data,
            });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   fetchStores = () => {
      axios
         .get('/Stores/GetStore')
         .then(({ data }) => {
            this.setState({
               stores: data,
            });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   fetchSalesAgain = (salesPerPage, productSortSelect, customerSortSelect, storeSortSelect, dateSoldIsSortSelect, nextPageSelect, prevPageSelect) => {
      var tempSales;
      var tempArray;
      var nextPageCount;
      var salesPageIndex;

      if (productSortSelect === true) {
         this.setState({
            productIsSort: true,
            isSort: false,
            customerIsSort: false,
            storeIsSort: false,
            customerIsSortAsc: false,
            customerIsSortDesc: false,
            productIsSortAsc: false,
            productIsSortDesc: false,
            storeIsSortAsc: false,
            storeIsSortDesc: false,
            dateSoldIsSort: false,
            dateSoldIsSortAsc: false,
            dateSoldIsSortDesc: false,
         });
      }

      if (customerSortSelect === true) {
         this.setState({
            productIsSort: false,
            isSort: false,
            customerIsSort: true,
            storeIsSort: false,
            productIsSortAsc: false,
            productIsSortDesc: false,
            customerIsSortAsc: false,
            customerIsSortDesc: false,
            storeIsSortAsc: false,
            storeIsSortDesc: false,
            dateSoldIsSort: false,
            dateSoldIsSortAsc: false,
            dateSoldIsSortDesc: false,
         });
      }

      if (storeSortSelect === true) {
         this.setState({
            productIsSort: false,
            isSort: false,
            customerIsSort: false,
            storeIsSort: true,
            customerIsSortAsc: false,
            customerIsSortDesc: false,
            productIsSortAsc: false,
            productIsSortDesc: false,
            storeIsSortAsc: false,
            storeIsSortDesc: false,
            dateSoldIsSort: false,
            dateSoldIsSortAsc: false,
            dateSoldIsSortDesc: false,
         });
      }

      if (dateSoldIsSortSelect === true) {
         this.setState({
            productIsSort: false,
            isSort: false,
            customerIsSort: false,
            storeIsSort: false,
            customerIsSortAsc: false,
            customerIsSortDesc: false,
            productIsSortAsc: false,
            productIsSortDesc: false,
            storeIsSortAsc: false,
            storeIsSortDesc: false,
            dateSoldIsSort: true,
            dateSoldIsSortAsc: false,
            dateSoldIsSortDesc: false,
         });
      }

      if (nextPageSelect === true) {
         salesPageIndex = parseInt(this.state.salesPerPage) * parseInt(this.state.pageNumber);
         nextPageCount = salesPageIndex + parseInt(this.state.salesPerPage);
         this.setState({ pageNumber: parseInt(this.state.pageNumber) + 1 });
      }

      if (prevPageSelect === true) {
         salesPageIndex = parseInt(this.state.salesPerPage) * parseInt(this.state.pageNumber) - parseInt(this.state.salesPerPage) * 2;
         nextPageCount = salesPageIndex + parseInt(this.state.salesPerPage);
         this.setState({ pageNumber: parseInt(this.state.pageNumber) - 1 });
      }

      if (productSortSelect === true && this.state.productIsSortAsc === false && this.state.productIsSortDesc === true) {
         this.setState({ productIsSortAsc: true, productIsSortDesc: false });
      } else if (productSortSelect === true && this.state.productIsSortAsc === true && this.state.productIsSortDesc === false) {
         this.setState({ productIsSortDesc: true, productIsSortAsc: false });
      } else if (productSortSelect === true && this.state.productIsSortAsc === false && this.state.productIsSortDesc === false) {
         this.setState({ productIsSortAsc: true, productIsSortDesc: false });
      }

      if (customerSortSelect === true && this.state.customerIsSortAsc === false && this.state.customerIsSortDesc === true) {
         this.setState({ customerIsSortAsc: true, customerIsSortDesc: false });
      } else if (customerSortSelect === true && this.state.customerIsSortAsc === true && this.state.customerIsSortDesc === false) {
         this.setState({ customerIsSortDesc: true, customerIsSortAsc: false });
      } else if (customerSortSelect === true && this.state.customerIsSortAsc === false && this.state.customerIsSortDesc === false) {
         this.setState({ customerIsSortAsc: true, customerIsSortDesc: false });
      }

      if (storeSortSelect === true && this.state.storeIsSortAsc === false && this.state.storeIsSortDesc === true) {
         this.setState({ storeIsSortAsc: true, storeIsSortDesc: false });
      } else if (storeSortSelect === true && this.state.storeIsSortAsc === true && this.state.storeIsSortDesc === false) {
         this.setState({ storeIsSortDesc: true, storeIsSortAsc: false });
      } else if (storeSortSelect === true && this.state.storeIsSortAsc === false && this.state.storeIsSortDesc === false) {
         this.setState({ storeIsSortAsc: true, storeIsSortDesc: false });
      }

      if (dateSoldIsSortSelect === true && this.state.dateSoldIsSortAsc === false && this.state.dateSoldIsSortDesc === true) {
         this.setState({ dateSoldIsSortAsc: true, dateSoldIsSortDesc: false });
      } else if (dateSoldIsSortSelect === true && this.state.dateSoldIsSortAsc === true && this.state.dateSoldIsSortDesc === false) {
         this.setState({ dateSoldIsSortDesc: true, dateSoldIsSortAsc: false });
      } else if (dateSoldIsSortSelect === true && this.state.dateSoldIsSortAsc === false && this.state.dateSoldIsSortDesc === false) {
         this.setState({ dateSoldIsSortAsc: true, dateSoldIsSortDesc: false });
      }

      axios
         .get('/Sales/GetSales')
         .then(({ data }) => {
            // console.log(data);
            tempArray = data;
            if (this.state.productIsSort === true && productSortSelect === true && this.state.productIsSortAsc === true) {
               tempSales = tempArray.sort((a, b) => (a.Product.Name > b.Product.Name ? 1 : -1));
            }
            if (this.state.productIsSort === true && productSortSelect === true && this.state.productIsSortDesc === true) {
               tempSales = tempArray.sort((a, b) => (a.Product.Name < b.Product.Name ? 1 : -1));
            }
            if (productSortSelect === false && this.state.productIsSortAsc === true) {
               tempSales = tempArray.sort((a, b) => (a.Product.Name > b.Product.Name ? 1 : -1));
            }
            if (productSortSelect === false && this.state.productIsSortDesc === true) {
               tempSales = tempArray.sort((a, b) => (a.Product.Name < b.Product.Name ? 1 : -1));
            }

            if (this.state.customerIsSort === true && customerSortSelect === true && this.state.customerIsSortAsc === true) {
               tempSales = tempArray.sort((a, b) => (a.Customer.Name > b.Customer.Name ? 1 : -1));
            }
            if (this.state.customerIsSort === true && customerSortSelect === true && this.state.customerIsSortDesc === true) {
               tempSales = tempArray.sort((a, b) => (a.Customer.Name < b.Customer.Name ? 1 : -1));
            }
            if (customerSortSelect === false && this.state.customerIsSortAsc === true) {
               tempSales = tempArray.sort((a, b) => (a.Customer.Name > b.Customer.Name ? 1 : -1));
            }
            if (customerSortSelect === false && this.state.customerIsSortDesc === true) {
               tempSales = tempArray.sort((a, b) => (a.Customer.Name < b.Customer.Name ? 1 : -1));
            }

            if (this.state.storeIsSort === true && storeSortSelect === true && this.state.storeIsSortAsc === true) {
               tempSales = tempArray.sort((a, b) => (a.Store.Name > b.Store.Name ? 1 : -1));
            }
            if (this.state.storeIsSort === true && storeSortSelect === true && this.state.storeIsSortDesc === true) {
               tempSales = tempArray.sort((a, b) => (a.Store.Name < b.Store.Name ? 1 : -1));
            }
            if (storeSortSelect === false && this.state.storeIsSortAsc === true) {
               tempSales = tempArray.sort((a, b) => (a.Store.Name > b.Store.Name ? 1 : -1));
            }
            if (storeSortSelect === false && this.state.storeIsSortDesc === true) {
               tempSales = tempArray.sort((a, b) => (a.Store.Name < b.Store.Name ? 1 : -1));
            }

            if (this.state.dateSoldIsSort === true && dateSoldIsSortSelect === true && this.state.dateSoldIsSortAsc === true) {
               tempSales = tempArray.sort((a, b) => (a.DateSold > b.DateSold ? 1 : -1));
            }
            if (this.state.dateSoldIsSort === true && dateSoldIsSortSelect === true && this.state.dateSoldIsSortDesc === true) {
               tempSales = tempArray.sort((a, b) => (a.DateSold < b.DateSold ? 1 : -1));
            }
            if (dateSoldIsSortSelect === false && this.state.dateSoldIsSortAsc === true) {
               tempSales = tempArray.sort((a, b) => (a.DateSold > b.DateSold ? 1 : -1));
            }
            if (dateSoldIsSortSelect === false && this.state.dateSoldIsSortDesc === true) {
               tempSales = tempArray.sort((a, b) => (a.DateSold < b.DateSold ? 1 : -1));
            }

            if (this.state.isSort === true && nextPageSelect === false && prevPageSelect === false) {
               tempSales = tempArray;
               salesPageIndex = parseInt(salesPerPage) * parseInt(this.state.pageNumber) - parseInt(salesPerPage);
               nextPageCount = salesPageIndex + parseInt(salesPerPage);
               this.setState({
                  salesPerPage: salesPerPage,
                  sales: tempSales.slice(salesPageIndex, nextPageCount),
                  totalSales: tempArray.length,
               });
            }

            if (nextPageSelect === false && prevPageSelect === false && this.state.isSort === false) {
               salesPageIndex = parseInt(salesPerPage) * parseInt(this.state.pageNumber) - parseInt(salesPerPage);
               nextPageCount = salesPageIndex + parseInt(salesPerPage);
               this.setState({
                  salesPerPage: salesPerPage,
                  sales: tempSales.slice(salesPageIndex, nextPageCount),
                  totalSales: tempArray.length,
               });
            }
            if (nextPageSelect === true) {
               tempSales = tempArray;
               this.setState({ sales: tempSales.slice(salesPageIndex, nextPageCount) });
            }
            if (prevPageSelect === true) {
               tempSales = tempArray;
               this.setState({ sales: tempSales.slice(salesPageIndex, nextPageCount) });
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   openCreateSalesModal = (value) => {
      this.setState({
         open: value,
      });
   };

   render() {
      const { sales, open, customers, products, stores } = this.state;
      return (
         <div>
            <h1>Sales</h1>
            <Button
               className='mb-2'
               color='blue'
               onClick={() => {
                  this.openCreateSalesModal(true);
               }}
            >
               New Sale
            </Button>
            <CreateSale
               open={open}
               openCreateSalesModal={this.openCreateSalesModal}
               fetchSales={this.fetchSales}
               customers={customers}
               products={products}
               stores={stores}
               fetchSalesAgain={this.fetchSalesAgain}
            />
            <SalesTable
               sales={sales}
               fetchSales={this.fetchSales}
               refresh={this.fetchSales}
               customers={customers}
               products={products}
               stores={stores}
               salesPerPage={this.state.salesPerPage}
               totalSales={this.state.totalSales}
               pageNumber={this.state.pageNumber}
               isSort={this.state.isSort}
               productIsSort={this.state.productIsSort}
               productIsSortAsc={this.state.productIsSortAsc}
               productIsSortDesc={this.state.productIsSortDesc}
               customerIsSort={this.state.customerIsSort}
               customerIsSortAsc={this.state.customerIsSortAsc}
               customerIsSortDesc={this.state.customerIsSortDesc}
               storeIsSort={this.state.storeIsSort}
               storeIsSortAsc={this.state.storeIsSortAsc}
               storeIsSortDesc={this.state.storeIsSortDesc}
               dateSoldIsSort={this.state.dateSoldIsSort}
               dateSoldIsSortAsc={this.state.dateSoldIsSortAsc}
               dateSoldIsSortDesc={this.state.dateSoldIsSortDesc}
               fetchSalesAgain={this.fetchSalesAgain}
            />
         </div>
      );
   }
}

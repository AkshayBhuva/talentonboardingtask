import React, { Component } from 'react';
import axios from 'axios';
import { Button, Loader } from 'semantic-ui-react';
import ProductTable from './ProductTable';
import CreateProduct from './CreateProduct';

export default class ProductHomePage extends Component {
   constructor(props) {
      super(props);
      this.state = {
         product: null,
         open: false,
         productsPerPage: undefined,
         totalProducts: undefined,
         pageNumber: undefined,
         isSort: false,
         nameIsSort: false,
         nameIsSortAsc: false,
         nameIsSortDesc: false,
         priceIsSort: false,
         priceIsSortAsc: false,
         priceIsSortDesc: false,
      };
   }

   componentDidMount() {
      this.fetchProduct();
   }

   fetchProduct = () => {
      var product;
      axios
         .get('/Products/GetProduct')
         .then(({ data }) => {
            product = data;
            this.setState({
               open: false,
               pageNumber: 1,
               isSort: true,
               nameIsSort: true,
               nameIsSortAsc: false,
               nameIsSortDesc: false,
               priceIsSort: false,
               priceIsSortAsc: false,
               priceIsSortDesc: false,
               productsPerPage: 10,
               products: product.slice(0, 10),
               totalproducts: data.length,
            });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   fetchProductAgain = (productsPerPage, nameSortSelect, priceSortSelect, nextPageSelect, prevPageSelect) => {
      var tempProducts;
      var tempArray;
      var nextPageCount;
      var productsPageIndex;

      if (nameSortSelect === true) {
         this.setState({
            nameIsSort: true,
            isSort: false,
            priceIsSort: false,
            priceIsSortAsc: false,
            priceIsSortDesc: false,
         });
      }

      if (priceSortSelect === true) {
         this.setState({
            nameIsSort: false,
            isSort: false,
            priceIsSort: true,
            nameIsSortAsc: false,
            nameIsSortDesc: false,
         });
      }

      if (nextPageSelect === true) {
         productsPageIndex = parseInt(this.state.productsPerPage) * parseInt(this.state.pageNumber);
         nextPageCount = productsPageIndex + parseInt(this.state.productsPerPage);
         this.setState({ pageNumber: parseInt(this.state.pageNumber) + 1 });
      }

      if (prevPageSelect === true) {
         productsPageIndex = parseInt(this.state.productsPerPage) * parseInt(this.state.pageNumber) - parseInt(this.state.productsPerPage) * 2;
         nextPageCount = productsPageIndex + parseInt(this.state.productsPerPage);
         this.setState({ pageNumber: parseInt(this.state.pageNumber) - 1 });
      }

      if (nameSortSelect === true && this.state.nameIsSortAsc === false && this.state.nameIsSortDesc === true) {
         this.setState({ nameIsSortAsc: true, nameIsSortDesc: false });
      } else if (nameSortSelect === true && this.state.nameIsSortAsc === true && this.state.nameIsSortDesc === false) {
         this.setState({ nameIsSortDesc: true, nameIsSortAsc: false });
      } else if (nameSortSelect === true && this.state.nameIsSortAsc === false && this.state.nameIsSortDesc === false) {
         this.setState({ nameIsSortAsc: true, nameIsSortDesc: false });
      }

      if (priceSortSelect === true && this.state.priceIsSortAsc === false && this.state.priceIsSortDesc === true) {
         this.setState({ priceIsSortAsc: true, priceIsSortDesc: false });
      } else if (priceSortSelect === true && this.state.priceIsSortAsc === true && this.state.priceIsSortDesc === false) {
         this.setState({ priceIsSortDesc: true, priceIsSortAsc: false });
      } else if (priceSortSelect === true && this.state.priceIsSortAsc === false && this.state.priceIsSortDesc === false) {
         this.setState({ priceIsSortAsc: true, priceIsSortDesc: false });
      }

      axios
         .get('/Products/GetProduct')
         .then(({ data }) => {
            tempArray = data;
            if (this.state.nameIsSort === true && nameSortSelect === true && this.state.nameIsSortAsc === true) {
               tempProducts = tempArray.sort((a, b) => (a.Name > b.Name ? 1 : -1));
            }
            if (this.state.nameIsSort === true && nameSortSelect === true && this.state.nameIsSortDesc === true) {
               tempProducts = tempArray.sort((a, b) => (a.Name < b.Name ? 1 : -1));
            }
            if (nameSortSelect === false && this.state.nameIsSortAsc === true) {
               tempProducts = tempArray.sort((a, b) => (a.Name > b.Name ? 1 : -1));
            }
            if (nameSortSelect === false && this.state.nameIsSortDesc === true) {
               tempProducts = tempArray.sort((a, b) => (a.Name < b.Name ? 1 : -1));
            }

            if (this.state.priceIsSort === true && priceSortSelect === true && this.state.priceIsSortAsc === true) {
               tempProducts = tempArray.sort((a, b) => (a.Price > b.Price ? 1 : -1));
            }
            if (this.state.priceIsSort === true && priceSortSelect === true && this.state.priceIsSortDesc === true) {
               tempProducts = tempArray.sort((a, b) => (a.Price < b.Price ? 1 : -1));
            }
            if (priceSortSelect === false && this.state.priceIsSortAsc === true) {
               tempProducts = tempArray.sort((a, b) => (a.Price > b.Price ? 1 : -1));
            }
            if (priceSortSelect === false && this.state.priceIsSortDesc === true) {
               tempProducts = tempArray.sort((a, b) => (a.Price < b.Price ? 1 : -1));
            }

            if (this.state.isSort === true && nextPageSelect === false && prevPageSelect === false) {
               tempProducts = tempArray;
               productsPageIndex = parseInt(productsPerPage) * parseInt(this.state.pageNumber) - parseInt(productsPerPage);
               nextPageCount = productsPageIndex + parseInt(productsPerPage);
               this.setState({
                  productsPerPage: productsPerPage,
                  products: tempProducts.slice(productsPageIndex, nextPageCount),
                  totalProducts: tempArray.length,
               });
            }

            if (nextPageSelect === false && prevPageSelect === false && this.state.isSort === false) {
               productsPageIndex = parseInt(productsPerPage) * parseInt(this.state.pageNumber) - parseInt(productsPerPage);
               nextPageCount = productsPageIndex + parseInt(productsPerPage);
               this.setState({
                  productsPerPage: productsPerPage,
                  products: tempProducts.slice(productsPageIndex, nextPageCount),
                  totalProducts: tempArray.length,
               });
            }
            if (nextPageSelect === true) {
               tempProducts = tempArray;
               this.setState({ products: tempProducts.slice(productsPageIndex, nextPageCount) });
            }
            if (prevPageSelect === true) {
               tempProducts = tempArray;
               this.setState({ products: tempProducts.slice(productsPageIndex, nextPageCount) });
            }
         })
         .catch((err) => {
            console.log(err);
         });
   };

   openCreateProductModal = (value) => {
      this.setState({
         open: value,
      });
   };

   render() {
      const { products, open } = this.state;
      if (products) {
         return (
            <div>
               <h1>Products</h1>
               <Button className='mb-2' color='blue' onClick={() => this.openCreateProductModal(true)}>
                  New Product
               </Button>
               <CreateProduct open={open} openCreateProductModal={this.openCreateProductModal} fetchProduct={this.fetchProduct} products={products} />
               <ProductTable
                  products={products}
                  refresh={this.fetchProduct}
                  pageNumber={this.state.pageNumber}
                  totalProducts={this.state.totalProducts}
                  isSort={this.state.isSort}
                  productsPerPage={this.state.productsPerPage}
                  nameIsSort={this.state.nameIsSort}
                  nameIsSortAsc={this.state.nameIsSortAsc}
                  nameIsSortDesc={this.state.nameIsSortDesc}
                  priceIsSort={this.state.priceIsSort}
                  priceIsSortAsc={this.state.priceIsSortAsc}
                  priceIsSortDesc={this.state.priceIsSortDesc}
                  fetchProductAgain={this.fetchProductAgain}
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

import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import CustomerHomePage from './components/Customer/CustomerHomePage';
import ProductHomePage from './components/Product/ProductHomePage';
import SalesHomePage from './components/Sale/SalesHomePage';
import StoreHomePage from './components/Store/StoreHomePage';

import './custom.css';

export default class App extends Component {
   static displayName = App.name;

   render() {
      return (
         <Layout>
            <Route path='/' exact component={Home} />
            <Route path='/customers' component={CustomerHomePage} />
            <Route path='/products' component={ProductHomePage} />
            <Route path='/sales' component={SalesHomePage} />
            <Route path='/stores' component={StoreHomePage} />
         </Layout>
      );
   }
}

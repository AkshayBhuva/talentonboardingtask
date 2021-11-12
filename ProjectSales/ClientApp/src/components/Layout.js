import React, { Component } from 'react';
import { Container } from 'reactstrap';
// import { NavMenu } from './NavMenu';
import NavBarSUI from '../components/NavBarSUI';

export class Layout extends Component {
   static displayName = Layout.name;

   render() {
      return (
         <div>
            {/* <NavMenu /> */}
            <NavBarSUI />
            <Container className='main-container'>{this.props.children}</Container>
         </div>
      );
   }
}

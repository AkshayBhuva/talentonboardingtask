import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

export default class NavBarSUI extends Component {
   //    state = { activeItem: 'home' };
   state = {};

   handleItemClick = (e, { name }) => {
      this.setState({ activeItem: name });
   };

   render() {
      const { activeItem } = this.state;

      return (
         <div>
            <Menu pointing secondary>
               <Menu.Item header as={NavLink} to='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick}>
                  <h3>React</h3>
               </Menu.Item>
               <Menu.Item as={NavLink} to='/customers' name='customers' active={activeItem === 'customers'} onClick={this.handleItemClick} />
               <Menu.Item as={NavLink} to='/products' name='products' active={activeItem === 'products'} onClick={this.handleItemClick} />
               <Menu.Item as={NavLink} to='/sales' name='sales' active={activeItem === 'sales'} onClick={this.handleItemClick} />
               <Menu.Item as={NavLink} to='/stores' name='stores' active={activeItem === 'stores'} onClick={this.handleItemClick} />
            </Menu>
         </div>
      );
   }
}

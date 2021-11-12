import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

export class Home extends Component {
   static displayName = Home.name;

   render() {
      return (
         <div>
            <Container textAlign='center'>
               <h1>Hello, Welcome to MVP Studio Onboarding task</h1>
               <p>Click on the navigation tabs above to get started</p>
            </Container>
         </div>
      );
   }
}

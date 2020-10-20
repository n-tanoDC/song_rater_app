import React from 'react';
import AppContext from './contexts/AppContext';
import NetworkContext from './contexts/NetworkContext';
import UserContext from './contexts/UserContext';

export default ({ children }) => 
  <NetworkContext>
    <AppContext>
      <UserContext>
        {children}
      </UserContext>
    </AppContext>
  </NetworkContext>

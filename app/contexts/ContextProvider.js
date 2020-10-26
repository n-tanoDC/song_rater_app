import React from 'react';
import AppContext from './AppContext';
import NetworkContext from './NetworkContext';
import UserContext from './UserContext';

export default ({ children }) => 
  <NetworkContext>
    <AppContext>
      <UserContext>
        {children}
      </UserContext>
    </AppContext>
  </NetworkContext>

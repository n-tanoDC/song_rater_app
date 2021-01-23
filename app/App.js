import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';

import TabNavigator from './navigation/TabNavigator'
import ContextProvider from './contexts/ContextProvider';

require('./styles/global_styles');

export default () => {
  return ( 
    <MenuProvider>
      <ContextProvider>
        <TabNavigator />
      </ContextProvider>
    </MenuProvider>
   )
}
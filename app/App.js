import 'react-native-gesture-handler';
import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';

import TabNavigator from './navigation/TabNavigator'
import ContextProvider from './ContextProvider';

export default () => {
  return ( 
    <MenuProvider>
      <ContextProvider>
        <TabNavigator />
      </ContextProvider>
    </MenuProvider>
   )
}
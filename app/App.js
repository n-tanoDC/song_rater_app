import 'react-native-gesture-handler';
import React from 'react';
import AppContextProvider from './AppContext';
import { MenuProvider } from 'react-native-popup-menu';

import TabNavigator from './navigation/TabNavigator'

export default () => {
  return ( 
    <MenuProvider>
      <AppContextProvider>
        <TabNavigator />
      </AppContextProvider>
    </MenuProvider>
   )
}
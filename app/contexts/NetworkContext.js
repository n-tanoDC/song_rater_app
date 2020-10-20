import React, { createContext } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';

import Loader from '../components/common/Loader';
import MessageView from '../components/common/MessageView';

export const NetworkContext = createContext();

export default ({ children }) => {
  const network = useNetInfo()

  // Show a loader while looking for a connection.
  if (!network.details) {
    return (<Loader />)
  }
  
  // Show a message if there's no connection.
  if (!network.isConnected) {
    return (<MessageView message='Veuillez vous connecter à internet' />)
  }

  return (
    <NetworkContext.Provider value={{ network }}>
      {children}
    </NetworkContext.Provider>
  )
};

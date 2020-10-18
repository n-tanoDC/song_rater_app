import React, { createContext, useEffect, useState } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';

import Loader from './components/common/Loader';
import MessageView from './components/common/MessageView';
import { generateToken } from './data/spotify';

export const AppContext = createContext();

export default (props) => {

  useEffect(() => {
    generateToken()
      .then(res => setToken(res.access_token))
      .catch(err => console.log(err))
  }, [network])

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [updates, setUpdates] = useState(false)
 
  const network = useNetInfo();

  // Show a loader while we check internet connection status.
  if (!network.details) {
    return (<Loader />)
  }
  
  // Show a message if there's no connection.
  if (!network.isConnected) {
    return (<MessageView message='Veuillez vous connecter à internet' />)
  }

  // Show loader until the token is loaded, if there's a connection.
  if (!token) {
    return (<Loader />)
  }

  const contextValues = {
    updates, setUpdates,
    token, setToken,
    user, setUser,
    network,
  }

  return (
    <AppContext.Provider value={contextValues}>
      {props.children}
    </AppContext.Provider>
  )
};

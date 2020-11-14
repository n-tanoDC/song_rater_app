import React, { createContext, useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen'

import Loader from '../components/common/Loader';

import { generateToken } from '../data/spotify';

export const AppContext = createContext();

export default ({ children }) => {
  const [token, setToken] = useState(null)
  // 'updates' will allow the app to render whenever needed
  const [updates, setUpdates] = useState(false)

  // generateToken when the component is mounted
  useEffect(() => {
    generateToken()
      .then(res => {
        setToken(res.access_token);
        SplashScreen.hide();
      })
      .catch(err => console.log(err))
  }, [])

  // Show a loader while we are generating the token.
  if (!token) {
    return (<Loader />)
  }

  return (
    <AppContext.Provider value={{ token, updates, setUpdates }}>
      {children}
    </AppContext.Provider>
  )
};

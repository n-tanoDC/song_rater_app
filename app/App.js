import 'react-native-gesture-handler';
import React, { createContext, useEffect, useState } from 'react';

import { MenuProvider } from 'react-native-popup-menu';

import TabNavigator from './navigation/TabNavigator'
import Loader from './components/common/Loader';
import { generateToken } from './data/spotify'

export const UserContext = createContext();
export const SpotifyContext = createContext();
export const AppContext = createContext();

export default () => {
  useEffect(() => { 
    generateToken()
      .then(res => setToken(res.access_token))
      .catch(err => console.log(err))
  }, [])

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [updates, setUpdates] = useState(false)

  if (!token) {
    return (<Loader />)
  }

  return (
    <MenuProvider>
      <AppContext.Provider value={{ updates, setUpdates }}>
        <SpotifyContext.Provider value={{ token, setToken }}>
          <UserContext.Provider value={{user, setUser}}>
            <TabNavigator />
          </UserContext.Provider>
        </SpotifyContext.Provider>
      </AppContext.Provider>
    </MenuProvider>

  )
}

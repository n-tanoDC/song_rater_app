import 'react-native-gesture-handler';
import React, { createContext, useEffect, useState } from 'react';
import TabNavigator from './navigation/TabNavigator'
import { Text, Root } from 'native-base';
import { generateToken } from './data/spotify'

export const UserContext = createContext();
export const SpotifyContext = createContext();

export default () => {
  useEffect(() => { generateToken(setToken) }, [])

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  if (!token) {
    return (<Text>Loading</Text>)
  }

  return (
    <Root>
      <SpotifyContext.Provider value={{ token, setToken }}>
        <UserContext.Provider value={{user, setUser}}>
          <TabNavigator />
        </UserContext.Provider>
      </SpotifyContext.Provider>
    </Root>
  )
}

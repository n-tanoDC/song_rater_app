import 'react-native-gesture-handler';
import React, { createContext, useState } from 'react';
import Navigator from './Navigator'

export const UserContext = createContext();

export default () => {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Navigator />
    </UserContext.Provider>
  )
}

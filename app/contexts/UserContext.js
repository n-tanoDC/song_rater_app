import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import Loader from '../components/common/Loader';
import { STORAGE_KEY } from '../config.local';
import { catchErrors, handleErrors } from '../functions/errors';
import { login } from '../functions/user';

export const UserContext = createContext();

export default ({ children }) => {
  const [connectedUser, setConnectedUser] = useState(undefined)

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem(STORAGE_KEY)
    return userData ? JSON.parse(userData) : null;
  }

  useEffect(() => {
    getUserData()
      .then(res => {
        if (res) {
          login(res)
            .then(res => {
              if (res) {
                const { user, token } = res
                setConnectedUser({ ...user, token })
              }
            })
            .catch(catchErrors)
        } else {
          setConnectedUser(null)
        }
      })
      .catch(catchErrors)
    }, [])

  if (connectedUser === undefined) {
    return <Loader />
  }

  return (
    <UserContext.Provider value={{ connectedUser, setConnectedUser }}>
      {children}
    </UserContext.Provider>
  )
};

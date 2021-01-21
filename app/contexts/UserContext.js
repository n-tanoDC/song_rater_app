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
      .then(async res => {
        if (res) {
          const userData = await login(res);
          try {
            const { user, token } = userData;
            setConnectedUser({ ...user, token })
          } catch (error) {
            catchErrors(error)
            setConnectedUser(null)
          }
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

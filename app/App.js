import 'react-native-gesture-handler';

import React, { createContext, useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/HomeScreen'
import Login from './components/LoginScreen'
import Signup from './components/RegistrationScreen'


const { Navigator, Screen } = createStackNavigator()

export const UserContext = createContext();


export default () => {

  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{user, setUser}}>
      <NavigationContainer>
        <Navigator headerMode="none" initialRouteName="Home">
          <Screen name="Home" component={Home} />
          <Screen name="Login" component={Login} />
          <Screen name="Signup" component={Signup} />
        </Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  )
}

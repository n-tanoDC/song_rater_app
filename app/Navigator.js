import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './components/HomeScreen'
import Login from './components/LoginScreen'
import Register from './components/RegisterScreen'

const { Navigator, Screen } = createStackNavigator()

export default () => 
  <NavigationContainer>
    <Navigator headerMode="none" initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="Login" component={Login} />
      <Screen name="Register" component={Register} />
    </Navigator>
  </NavigationContainer>

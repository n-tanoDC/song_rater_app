import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './components/screens/HomeScreen'
import User from './components/screens/UserScreen'
import Feed from './components/screens/FeedScreen'
import Music from './components/screens/MusicScreen'


const { Navigator, Screen } = createBottomTabNavigator()

export default () => 
  <NavigationContainer>
    <Navigator headerMode="none" initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="User" component={User} />
      <Screen name="Feed" component={Feed} />
      <Screen name="Music" component={Music} />
    </Navigator>
  </NavigationContainer>

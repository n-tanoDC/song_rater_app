import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './components/screens/HomeScreen'
import User from './components/screens/UserScreen'
import Feed from './components/screens/FeedScreen'
import Music from './components/screens/MusicScreen'
import Search from './components/screens/SearchScreen'

const { Navigator, Screen } = createBottomTabNavigator()

export default () => 
  <NavigationContainer>
    <Navigator lazy={false} headerMode="none" initialRouteName="Home">
      <Screen name="Search" component={Search} />
      <Screen name="Music" component={Music} />
      <Screen name="Home" component={Home} />
      <Screen name="Feed" component={Feed} />
      <Screen name="User" component={User} />
    </Navigator>
  </NavigationContainer>

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../components/screens/HomeScreen'
import Search from '../components/screens/SearchScreen'

import { UserNavigator, FeedNavigator, ContentNavigator } from './StackNavigators';

const { Navigator, Screen } = createBottomTabNavigator()

export default () => 
  <NavigationContainer>
    <Navigator lazy={false} headerMode="none" initialRouteName="Home">
      <Screen name="Search" component={Search} />
      <Screen name="Content" component={ContentNavigator} />
      <Screen name="Home" component={Home} />
      <Screen name="Feed" component={FeedNavigator} />
      <Screen name="User" component={UserNavigator} />
    </Navigator>
  </NavigationContainer>

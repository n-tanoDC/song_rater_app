import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../components/screens/HomeScreen';
import ReviewScreen from '../components/screens/ReviewScreen';
import UserScreen from '../components/screens/UserScreen';

import AccountScreen from '../components/screens/AccountScreen';
import AccountFormScreen from '../components/screens/AccountFormScreen';

import SearchScreen from '../components/screens/SearchScreen';
import MediaScreen from '../components/search/MediaScreen';

const { Navigator, Screen } = createStackNavigator();

export const HomeNavigator = () => 
  <Navigator headerMode='none' initialRouteName='Home'>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Review" component={ReviewScreen} />
    <Screen name="User" component={UserScreen} />
    <Screen name="Media" component={MediaScreen} />
  </Navigator>

export const AccountNavigator = () => 
  <Navigator headerMode='none' initialRouteName='Account'>
    <Screen name="Account" component={AccountScreen} />
    <Screen name="AccountForm" component={AccountFormScreen} />
  </Navigator>

export const SearchNavigator = () =>
  <Navigator headerMode='none' initialRouteName='Search'>
    <Screen name="Search" component={SearchScreen} />
    <Screen name="Media" component={MediaScreen} />
  </Navigator>
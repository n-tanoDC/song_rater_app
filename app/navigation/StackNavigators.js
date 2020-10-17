import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../components/screens/HomeScreen';
import ReviewScreen from '../components/screens/ReviewScreen';
import UserScreen from '../components/screens/UserScreen';
import AccountScreen from '../components/screens/AccountScreen';
import AccountFormScreen from '../components/screens/AccountFormScreen';

const { Navigator, Screen } = createStackNavigator();

export const HomeNavigator = () => 
  <Navigator headerMode='none'>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Review" component={ReviewScreen} />
    <Screen name="User" component={UserScreen} />
  </Navigator>

export const AccountNavigator = () => 
  <Navigator headerMode='none'>
    <Screen name="Account" component={AccountScreen} />
    <Screen name="AccountForm" component={AccountFormScreen} />
  </Navigator>
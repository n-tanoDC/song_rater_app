import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../components/screens/HomeScreen';
import ReviewScreen from '../components/screens/ReviewScreen';
import UserScreen from '../components/screens/UserScreen';

const { Navigator, Screen } = createStackNavigator();

export default () => 
  <Navigator headerMode='none'>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Review" component={ReviewScreen} />
    <Screen name="User" component={UserScreen} />
  </Navigator>
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../components/screens/HomeScreen';
import ReviewScreen from '../components/screens/ReviewScreen';
import UserScreen from '../components/screens/UserScreen';

import AccountScreen from '../components/screens/AccountScreen';
import AccountFormScreen from '../components/screens/AccountFormScreen';

import SearchScreen from '../components/screens/SearchScreen';
import MediaScreen from '../components/screens/MediaScreen';
import { UserContext } from '../contexts/UserContext';
import AuthScreen from '../components/screens/AuthScreen';

const { Navigator, Screen } = createStackNavigator();

export const HomeNavigator = () => 
  <Navigator headerMode='none' initialRouteName='Home'>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Review" component={ReviewScreen} />
    <Screen name="User" component={UserScreen} />
    <Screen name="Media" component={MediaScreen} />
  </Navigator>

export const SearchNavigator = () =>
  <Navigator headerMode='none' initialRouteName='Search'>
    <Screen name="Search" component={SearchScreen} />
    <Screen name="Media" component={MediaScreen} />
  </Navigator>


export const AccountNavigator = () => {
  const { connectedUser } = useContext(UserContext)
  let screens;

  if (connectedUser) {
    screens = (
      <>
        <Screen name="Account" component={AccountScreen} />
        <Screen name="AccountForm" component={AccountFormScreen} />
      </>
    )
  } else {
    screens = (
      <Screen name="Auth" component={AuthScreen} />
    )
  }

  return (
  <Navigator headerMode='none' initialRouteName='Account'>
    {screens}
  </Navigator>
  )
}
  
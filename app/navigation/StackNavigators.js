import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../components/HomeScreen';
import ReviewScreen from '../components/reviews/ReviewScreen';
import UserScreen from '../components/users/UserScreen';
import MediaScreen from '../components/media/MediaScreen';
import ArtistScreen from '../components/media/artists/ArtistScreen';
import SearchScreen from '../components/search/SearchScreen';
import AccountScreen from '../components/users/AccountScreen';
import AccountFormScreen from '../components/users/AccountFormScreen';
import AuthScreen from '../components/auth/AuthScreen';

import { UserContext } from '../contexts/UserContext';

const { Navigator, Screen } = createStackNavigator();

export const HomeNavigator = () => 
  <Navigator headerMode='none' initialRouteName='Home'>
    <Screen name="Home" component={HomeScreen} />
    <Screen name="Review" component={ReviewScreen} />
    <Screen name="User" component={UserScreen} />
    <Screen name="Media" component={MediaScreen} />
    <Screen name="Artist" component={ArtistScreen} />
  </Navigator>

export const SearchNavigator = () =>
  <Navigator headerMode='none' initialRouteName='Search'>
    <Screen name="Search" component={SearchScreen} />
    <Screen name="Media" component={MediaScreen} />
    <Screen name="Artist" component={ArtistScreen} />
  </Navigator>


export const AccountNavigator = () => {
  const { connectedUser } = useContext(UserContext)
  let screens;

  if (connectedUser) {
    screens = (
      <>
        <Screen name="Account" component={AccountScreen} initialParams={{ connectedUser }} />
        <Screen name="AccountForm" component={AccountFormScreen} />
        <Screen name="Media" component={MediaScreen} />
        <Screen name="Artist" component={ArtistScreen} />
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
  
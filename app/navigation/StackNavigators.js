import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ContentScreen from '../components/screens/ContentScreen';
import FeedScreen from '../components/screens/FeedScreen';
import ArtistScreen from '../components/screens/ArtistScreen';
import ReviewScreen from '../components/screens/ReviewScreen';
import TrackScreen from '../components/screens/TrackScreen';
import AlbumScreen from '../components/screens/AlbumScreen';
import ProfileScreen from '../components/screens/ProfileScreen';
import AuthScreen from '../components/screens/AuthScreen';

const { Navigator, Screen } = createStackNavigator();

export const UserNavigator = () => 
  <Navigator headerMode='none'>
    <Screen name="Profile" component={ProfileScreen} />
    <Screen name="Auth" component={AuthScreen} />
  </Navigator>

export const FeedNavigator = () => 
  <Navigator headerMode='none'>
    <Screen name="Feed" component={FeedScreen} />
    <Screen name="Review" component={ReviewScreen} />
  </Navigator>

export const ContentNavigator = () => 
  <Navigator headerMode='none'>
    <Screen name="Content" component={ContentScreen} />
    <Screen name="Artist" component={ArtistScreen} />
    <Screen name="Track" component={TrackScreen} />
    <Screen name="Album" component={AlbumScreen} />
  </Navigator>
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ContentScreen from '../components/content/ContentScreen';
import ArtistScreen from '../components/content/ArtistScreen';
import TrackScreen from '../components/content/TrackScreen';
import AlbumScreen from '../components/content/AlbumScreen';
import FeedScreen from '../components/reviews/FeedScreen';
import ReviewScreen from '../components/reviews/ReviewScreen';
import ProfileScreen from '../components/users/ProfileScreen';
import AuthScreen from '../components/users/AuthScreen';

const { Navigator, Screen } = createStackNavigator();

export const UserNavigator = () => 
  <Navigator headerMode='none' backBehavior='history'>
    <Screen name="Profile" component={ProfileScreen} />
    <Screen name="Auth" component={AuthScreen} />
  </Navigator>

export const FeedNavigator = () => 
  <Navigator headerMode='none' backBehavior='history'>
    <Screen name="Feed" component={FeedScreen} />
    <Screen name="Review" component={ReviewScreen} />
  </Navigator>

export const ContentNavigator = () => 
  <Navigator headerMode='none' backBehavior='history'>
    <Screen name="Content" component={ContentScreen} />
    <Screen name="Artist" component={ArtistScreen} />
    <Screen name="Track" component={TrackScreen} />
    <Screen name="Album" component={AlbumScreen} />
  </Navigator>
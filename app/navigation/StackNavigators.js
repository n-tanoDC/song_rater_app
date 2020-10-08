import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ContentScreen from '../components/content/ContentScreen';
import ArtistScreen from '../components/content/ArtistScreen';
import TrackScreen from '../components/content/TrackScreen';
import AlbumScreen from '../components/content/AlbumScreen';
import FeedScreen from '../components/reviews/FeedScreen';
import ReviewScreen from '../components/reviews/ReviewScreen';

const { Navigator, Screen } = createStackNavigator();

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
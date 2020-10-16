import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FeedScreen from '../components/reviews/FeedScreen';
import ReviewScreen from '../components/reviews/ReviewScreen';

const { Navigator, Screen } = createStackNavigator();

export default () => 
  <Navigator headerMode='none'>
    <Screen name="Feed" component={FeedScreen} />
    <Screen name="Review" component={ReviewScreen} />
  </Navigator>
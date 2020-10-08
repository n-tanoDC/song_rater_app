import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../components/HomeScreen'
import Search from '../components/search/SearchScreen'
import UserScreen from '../components/users/UserScreen';
import TabIcon from './TabIcon';

import { FeedNavigator, ContentNavigator } from './StackNavigators';

const { Navigator, Screen } = createBottomTabNavigator()

export default () => {
  const tabBarOptions = {
    showLabel: false,
    activeTintColor: '#9E00FF',
    inactiveTintColor: 'transparent',
    tabStyle: {
      backgroundColor: '#FDFDFD',
    }
  }

  const getIcons = (route, color) => {
      let iconName;

      switch (route.name) {
        case 'Search':
          iconName = 'magnify';
          break;
        case 'Content':
          iconName = 'music-note-quarter-dotted';
          break;
        case 'Home':
          iconName = 'home';
          break;
        case 'Feed':
          iconName = 'playlist-star';
          break;
        case 'User':
          iconName = 'account';
          break;
      }

      return <TabIcon name={iconName} color={color} />;

  }
  return (
    <NavigationContainer>
      <Navigator 
        backBehavior='history'
        headerMode="none"
        initialRouteName="Home"
        tabBarOptions={tabBarOptions}
        screenOptions={({ route }) => ({ 
          tabBarIcon: ({ color }) => getIcons(route, color)
        })}
      >
        <Screen
          name="Search"
          component={Search} />
        <Screen 
          name="Content"
          component={ContentNavigator} />
        <Screen 
          name="Home"
          component={Home} />
        <Screen 
          name="Feed"
          component={FeedNavigator} />
        <Screen 
        name="User" 
        component={UserScreen} />
      </Navigator>
    </NavigationContainer>
  )
}

  

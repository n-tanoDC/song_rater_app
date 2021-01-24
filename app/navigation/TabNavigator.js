import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeNavigator, AccountNavigator, SearchNavigator, FeedNavigator } from './StackNavigators';
import TabIcon from './TabIcon';
import colors from '../styles/colors';

const { Navigator, Screen } = createBottomTabNavigator()

export default () => {
  const tabBarOptions = {
    showLabel: false,
    activeTintColor: colors.primary,
    inactiveTintColor: colors.darkgrey,
    style: {
      backgroundColor: colors.white,
    }
  }

  const getTabBarVisibility = (route) => {
    try {
      const { tabBarVisible = true } = route.state.routes[route.state.index].params
      return tabBarVisible;
    } catch {
      return true
    }
  }

  const getIcons = (route, color) => {
      let iconName;

      switch (route.name) {
        case 'Search':
          iconName = 'magnify';
          break;
        case 'Home':
          iconName = 'home';
          break;
        case 'Account':
          iconName = 'account';
          break;
        case 'Feed':
          iconName = 'playlist-star'
          break;
        default:
          iconName = 'help'
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
          tabBarIcon: ({ color }) => getIcons(route, color),
          tabBarVisible: getTabBarVisibility(route),
        })}
      >
        <Screen
          name="Search"
          component={SearchNavigator} />
        <Screen 
          name="Home"
          component={HomeNavigator} />
        <Screen
          name="Feed"
          component={FeedNavigator} />
        <Screen 
          name="Account" 
          component={AccountNavigator} />
      </Navigator>
    </NavigationContainer>
  )
}

  

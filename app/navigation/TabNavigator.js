import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { HomeNavigator, AccountNavigator, SearchNavigator } from './StackNavigators';
import TabIcon from './TabIcon';

const { Navigator, Screen } = createBottomTabNavigator()

export default () => {
  const tabBarOptions = {
    showLabel: false,
    activeTintColor: '#9E00FF',
    inactiveTintColor: '#3A3A3A',
    style: {
      backgroundColor: '#FDFDFD',
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
          component={SearchNavigator} />
        <Screen 
          name="Home"
          component={HomeNavigator} />
        <Screen 
          name="Account" 
          component={AccountNavigator} />
      </Navigator>
    </NavigationContainer>
  )
}

  

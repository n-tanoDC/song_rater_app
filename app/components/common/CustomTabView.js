import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../styles/colors';

const initialLayout = { width: Dimensions.get('window').width };

export default ({ sections, style }) => {
  const newRoutes = sections.map(section => ({ key: section.key, title: section.title }))
  let styles,
      activeColor = colors.darkgrey,
      inactiveColor = colors.lightgrey;
  
  switch (style) {
    case 'rounded' :
      styles = roundedStyles;
      activeColor = colors.white;
      inactiveColor = colors.lightgrey;
      break;
    case 'icon-only' :
      styles = iconOnlyStyles;
      activeColor = colors.darkgrey;
      inactiveColor = colors.grey;
      break;
    default:
      styles = {};
  }

  const [index, setIndex] = useState(0); 
  const [routes] = useState(newRoutes);
  
  const renderScene = ({ route }) => {
    for (const section of sections) {
      if (route.key === section.key) {
        return section.render;
      }
    }
  }

  const getIcon = ({ route, color, focused }) => {
    if (style !== 'rounded') {
      const index = sections.findIndex(section => section.key === route.key)
      const icon = sections[index].icon;
      return (
        <View style={styles.iconContainer}>
          <Icon name={icon} size={24} color={color} />
          {focused ? <Text style={styles.iconText}>{route.title}</Text> : null}
        </View>
      )
    }
  }

  const renderTabBar = (props) => (
    <TabBar 
      {...props}
      indicatorStyle={styles.indicator}
      indicatorContainerStyle={styles.indicatorContainer}
      renderIcon={props => getIcon(props)}
      tabStyle={styles.tabBar}
      activeColor={activeColor}
      inactiveColor={inactiveColor} 
      labelStyle={styles.label}
      style={styles.tabBarContainer} />
  )
  
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={props => renderTabBar(props)}
      onIndexChange={setIndex}
      initialLayout={initialLayout} />
  )
};

const iconOnlyStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
  },
  iconContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconText: {
    fontFamily: 'baloo2-semibold',
    marginLeft: 10,
    fontSize: 16,
    color: colors.darkgrey,
  },
  label: {
    display: 'none',
  }
})

const roundedStyles = StyleSheet.create({
  tabBarContainer: {
    margin: 10,
    backgroundColor: colors.grey,
    borderRadius: 20,
    overflow: 'hidden',
  },
  tabBar: {
    minHeight: 'auto',
    borderRadius: 20,
    padding: 3,
  },
  indicator: {
    height: '100%',
    borderRadius: 20,
    backgroundColor: colors.primary
  },
  indicatorContainer: {
    width: 'auto',
    overflow: 'hidden',
    marginHorizontal: 3,
    marginVertical: 3,
    borderRadius: 20,
  },
  label: {
    fontFamily: 'baloo2-semibold',
    textTransform: 'capitalize',
    margin: 0,
    padding: 0,
  },
})

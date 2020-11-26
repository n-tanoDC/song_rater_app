import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { showToast } from '../../functions';
import colors from '../../styles/colors';

const initialLayout = { width: Dimensions.get('window').width };

export default ({ sections }) => {
  const newRoutes = sections.map(section => ({ key: section.title, title: section.title }))
  
  const [index, setIndex] = useState(0); 
  const [routes] = useState(newRoutes);
  
  let sceneMap = {};

  for (const section of sections) {
    sceneMap[section.title] = () => section.render;
  }
    
  const renderScene = SceneMap(sceneMap)

  const getTabBarIcon = ({ route, color }) => {
    const index = sections.findIndex(section => section.title === route.key)
    const icon = sections[index].icon;
    return (<Icon name={icon} size={24} color={color} />)
  }

  const renderTabBar = (props) => (
    <TabBar 
      {...props}
      renderIcon={props => getTabBarIcon(props)}
      tabStyle={styles.tabBar}
      activeColor={colors.darkgrey}
      inactiveColor={colors.grey} 
      labelStyle={styles.label}
      onTabLongPress={props => showToast(props.route.key)}
      style={{ marginBottom: 10 }} />
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

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.white,
  },
  label: {
    display: 'none'
  },
  icon: {
    color: colors.grey,
    fontSize: 22
  },
})

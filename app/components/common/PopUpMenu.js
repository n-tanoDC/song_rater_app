import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import colors from '../../styles/colors';

export default ({ trigger, options }) => {

  const jsxOptions = options.map((option, index) => (
    <MenuOption key={index} style={styles.option} onSelect={option.onSelect}>
      <Icon style={styles.optionIcon} name={option.icon} size={24} color={colors.darkgrey} />
      <Text style={styles.optionText}>{option.text}</Text>
    </MenuOption>
  ))

  return (
    <Menu>
      <MenuTrigger>
        <View style={[styles.trigger, { backgroundColor: trigger.background}]}>
          <Icon name={trigger.icon} size={trigger.iconSize || 28} color={colors.white} />
          {trigger.text ? <Text style={styles.triggerText}>{trigger.text}</Text> : null}
        </View>
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={styles.container}>
        {jsxOptions}
      </MenuOptions>
    </Menu>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginTop: 28,
    width: 'auto',
    borderRadius: 20,
  },
  trigger: {
    height: 40,
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 20,
  },
  triggerText: {
    marginLeft: 5,
    color: colors.white,
    fontFamily: 'baloo2-semibold'
  },
  option: {
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 10,
  }
})
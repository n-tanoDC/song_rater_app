import React from 'react';
import { StyleSheet, Text } from 'react-native';
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
        <Icon name={trigger.icon} color={colors.white} size={28} />
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
  option: {
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 10,
  }
})
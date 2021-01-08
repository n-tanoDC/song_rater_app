import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../../styles/colors';

export default (props) => {
  const {
    backgroundColor = colors.primary,
    color = colors.white,
    icon,
    onPress,
    text,
    large,
    transparent,
    disabled
  } = props;

  let iconComponent, textComponent;

  if (text) {
    textComponent = (
      <Text style={[styles.buttonText, { color, marginLeft: icon ? 5 : 0 }]}>
        {text}
      </Text>
    )
  }

  if (icon) {
    iconComponent = (
      <Icon
        size={large ? 26 : 18}
        color={color}
        name={icon} />
    )
  }

  const buttonStyle = {
    backgroundColor: transparent ? colors.transparent : backgroundColor,
    paddingHorizontal: text ? 10 : 10,
    paddingVertical: text ? 2 : 10,
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, buttonStyle]}
      onPress={onPress}>
      {iconComponent}
      {textComponent}
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    flexDirection: 'row', 
    padding: 10,
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'baloo2-semibold',
  }
})
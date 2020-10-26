import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../../styles/colors';

export default ({ disabled, text, color = colors.secondary, onPress }) => {
  const buttonColor = disabled ? 'grey' : color;

  return (
    <TouchableOpacity
      disabled={disabled}
      style={{ ...styles.button, backgroundColor: buttonColor}}
      onPress={() => onPress()}
      >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end', 
    borderRadius: 20,
    elevation: 2,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  text: { 
    color: colors.white,
    fontFamily: 'baloo2-semibold',
  },
})

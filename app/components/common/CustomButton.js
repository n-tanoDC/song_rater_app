import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default ({ disabled, text, color = '#FFB906', onPress }) => {
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
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 2
  },
  text: { 
    color: '#FDFDFD',
    fontWeight: 'bold'
  },
})

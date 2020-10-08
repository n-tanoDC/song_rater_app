import { Button, Text } from 'native-base';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { color } from 'react-native-reanimated';

export default ({ text, color, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onPress()}
      transparent={!color}
      >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFB906',
    alignSelf: 'flex-end', 
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 2
  },
  text: { 
    color: '#FDFDFD',
    fontWeight: 'bold'
  },
})

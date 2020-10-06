import { Button, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default ({ text, state }) => {
  const bg = state.value ? '#1DB954' : '#FFB906'
  return (
    <Button style={{...style.button, backgroundColor: bg }} onPress={() => state.callback()}>
      <Text>{text}</Text>
    </Button>
  )
};

const style = StyleSheet.create({
  button: {
    borderRadius: 15,

  }
})
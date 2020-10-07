import { Button, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default ({ text, state }) => {
  const bg = state.value ? '#1DB954' : '#FFB906'
  return (
    <Button small style={{...style.button, backgroundColor: bg }} onPress={() => state.callback(!state.value)}>
      <Text uppercase={false} style={style.text}>
        {text}
      </Text>
    </Button>
  )
};

const style = StyleSheet.create({
  button: {
    borderRadius: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold"
  }
})
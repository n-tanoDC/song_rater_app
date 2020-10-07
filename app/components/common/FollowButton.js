import { Button, Text } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default ({ state }) => {
  const { following, setFollowing } = state;
  const bg = following ? '#1DB954' : '#FFB906';
  const text = following ? 'Suivi' : 'Suivre';
  return (
    <Button small style={{...style.button, backgroundColor: bg }} onPress={() => setFollowing(!following)}>
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
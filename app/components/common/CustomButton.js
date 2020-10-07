import { Button, Text } from 'native-base';
import React from 'react';

export default ({ text, color, onPress }) => {
  console.log(color);
  return (
    <Button
      info
      rounded
      onPress={onPress}
      transparent={!color}
      >
      <Text uppercase={false}>{text}</Text>
    </Button>
  )
};

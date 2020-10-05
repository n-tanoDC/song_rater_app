import { Button, Text } from 'native-base';
import React from 'react';

export default ({ navigation }) => {
  return (
    <Button onPress={() => navigation.navigate('Content', { screen: 'Artist'})}>
      <Text>Artiste</Text>
    </Button>
  )
};

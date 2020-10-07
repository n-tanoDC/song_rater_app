import React from 'react';
import { Body, ListItem, Text } from 'native-base';

export default ({ artist, navigation }) => {
  return (
    <ListItem onPress={() => navigation.navigate('Content', { screen: 'Artist', params: { artist } })}>
      <Body>
        <Text>{artist.name}</Text>
      </Body>
    </ListItem>
  )
};

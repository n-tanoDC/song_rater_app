import React from 'react';
import { Body, ListItem, Text } from 'native-base';

export default ({ element, navigation }) => {
  return (
    <ListItem onPress={() => navigation.navigate('Feed', { screen: 'Form', params: { element } })}>
      <Body>
        <Text>{element.name}</Text>
      </Body>
    </ListItem>
  )
};

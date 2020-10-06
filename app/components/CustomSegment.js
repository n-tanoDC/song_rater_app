import { Segment, Button, Text, Body } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';

export default ({ data, state }) => {
  const buttons = data.map((item, key) => 
    <Button
      key={key}
      onPress={() => state.cb(item)}
      first={key === 0}
      last={key === data.length}
      active={state.selected === item}>
      <Text>
        {item.toUpperCase()}
      </Text>
    </Button> 
  )

  return (
    <Segment >
      {buttons}
    </Segment>
  )
};

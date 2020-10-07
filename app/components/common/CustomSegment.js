import { Segment, Button, Text } from 'native-base';
import React from 'react';

export default ({ data, state }) => {

  const buttons = data.map((item, key) => 
    <Button
      key={key}
      onPress={() => state.callback(item)}
      first={key === 0}
      last={key === data.length}
      active={state.value === item}>
      <Text>
        {item.toUpperCase()}
      </Text>
    </Button> 
  )

  return (
    <Segment>
      {buttons}
    </Segment>
  )
};

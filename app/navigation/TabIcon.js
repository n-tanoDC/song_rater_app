import React from 'react';
import { Button, Icon } from 'native-base';

export default ({ name, color }) => {
  const style = {
    'borderTopWidth': 4,
    'borderRadius': 0,
    'borderColor': color,
  }

  return (
    <Button style={style} transparent disabled>
      <Icon name={name} style={{ color: '#3A3A3A', fontSize: 28 }} type="MaterialCommunityIcons"/>
    </Button>
  )
};

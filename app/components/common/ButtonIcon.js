import { Button, Icon } from 'native-base';
import React from 'react';

export default ({ name, color, onPress }) => 
  <Button transparent onPress={() => onPress()}>
    <Icon style={{ color: color, fontSize: 28 }} name={name} />
  </Button>


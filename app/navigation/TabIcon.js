import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';

export default ({ name, color }) => {
  return (
    <TouchableOpacity>
      <Icon name={name} style={{ color, fontSize: 28 }} type="MaterialCommunityIcons"/>
    </TouchableOpacity>
  )
};

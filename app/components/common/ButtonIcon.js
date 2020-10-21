import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default (props) => {
  const { name, color, onPress, size = 28, background } = props;

  return (
    <TouchableOpacity style={{ backgroundColor: background }} onPress={() => onPress()}>
      <Icon color={color} size={size} name={name} />
    </TouchableOpacity>
  )
} 


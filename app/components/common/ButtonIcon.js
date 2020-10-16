import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default ({ name, color, onPress }) => 
  <TouchableOpacity onPress={() => onPress()}>
    <Icon color={color} size={28} name={name} />
  </TouchableOpacity>


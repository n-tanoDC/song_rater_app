import React from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

import { API_URL } from '../../config';

export default ({ user, small, onPress }) => {
  const { avatar } = user;
  const size = small ? 40 : 80;
  let source;

  if (avatar) {
    source = { uri: API_URL + 'uploads/' + avatar };
  } else {
    source = require('../../assets/images/avatar_placeholder.png');
  }
  
  return (
    <TouchableOpacity 
      style={{ ...styles.imageWrapper, height: size, width: size }}
      onPress={onPress}>
      <ImageBackground
        source={source}
        style={styles.image}
         />
    </TouchableOpacity>
  )
}
  
const styles = StyleSheet.create({
  imageWrapper: {
    borderRadius: 100,
    overflow: 'hidden',
  }, 
  image: {
    aspectRatio: 1,
    resizeMode: 'cover',
  }
})

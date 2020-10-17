import React from 'react';
import { StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { API_URL } from '../../config';

export default ({ user, small, redirect, visit }) => {
  const navigation = useNavigation()
  const { avatar } = user;
  const size = small ? 40 : 80;
  let onPress, source;

  if (redirect) {
    if (visit) {
      onPress = () => navigation.navigate('User', { user })
    } else {
      onPress = () => navigation.navigate('Account')
    }
  } 
  
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

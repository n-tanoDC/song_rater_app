import React from 'react';
import { StyleSheet, Image } from 'react-native';

export default ({ user, small }) => {
  const height = small ? 40 : 80;
  return (
    <Image 
      source={{ uri: 'https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80' }}
      style={{ ...styles.image, height: height }} />
  )
}
  

const styles = StyleSheet.create({
  image: {
    borderRadius: 100,
    aspectRatio: 1
  }
})

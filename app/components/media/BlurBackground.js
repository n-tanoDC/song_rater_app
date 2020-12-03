import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

export default ({ children, uri }) => {
  return (
    <ImageBackground 
      blurRadius={15}
      source={{ uri }}
      style={styles.imageBg}>
      <View style={styles.overlay} />
      {children}
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  imageBg: {
    width: '100%',
    aspectRatio: 1
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
})


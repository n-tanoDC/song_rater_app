import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

export default ({ children, uri, squared, blur }) => {
  return (
    <ImageBackground 
      source={{ uri }}
      blurRadius={blur ? 3 : 0}
      style={[styles.imageBg, { aspectRatio: squared ? 1 : 2 }]}>
      <View style={styles.overlay} />
      {children}
    </ImageBackground>
  )
};

const styles = StyleSheet.create({
  imageBg: {
    width: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)'
  }
})


import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default ({ message }) =>
  <View style={styles.container}>
    <Text style={styles.containerText}>{message}</Text> 
  </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerText: {
    textAlign: 'center',
  },
})

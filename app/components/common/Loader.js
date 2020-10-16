import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default () => 
  <View style={styles.container}>
    <ActivityIndicator size='large' color='#C4C4C4'/>
  </View>

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  }
})

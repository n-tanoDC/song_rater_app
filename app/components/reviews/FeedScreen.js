import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ReviewsList from './ReviewsList';

export default () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>Critiques</Text>
      </View>
      <View style={styles.content}>
        <ReviewsList showUser />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDFDFD'
  },
  header: {
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    padding: 10,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '10%'
  },
  content: {
    height: '90%'
  }
})
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../common/Loader';

import ReviewsList from './ReviewsList';

export default () => {
  const isFocused = useIsFocused()
  const [loading, setLoading] = useState(true)
  useEffect(() => setLoading(!isFocused), [isFocused])

  if (loading) {
    return (<Loader />)
  }

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
}


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
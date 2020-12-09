import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import UserProfile from './UserProfile';

export default ({ route }) => {
  const { user } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <UserProfile user={user} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

import UserProfile from '../users/UserProfile';

export default ({ route }) => {
  const { user } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <UserProfile user={user} visit />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    flex: 1,
  }
})

import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import UserProfile from '../users/UserProfile';

export default ({ route }) => {
  const { connectedUser } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <UserProfile user={connectedUser} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    flex: 1,
  }
})

import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { UserContext } from '../../contexts/UserContext';

import UserProfile from '../users/UserProfile';

export default () => {
  const { connectedUser } = useContext(UserContext);

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

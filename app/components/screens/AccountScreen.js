import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import UserProfile from '../users/UserProfile';
import AuthForm from '../users/AuthForm';

import { UserContext } from '../../contexts/UserContext';

export default () => {

  const { connectedUser } = useContext(UserContext);

  return (
    <SafeAreaView style={styles.container}>
      {connectedUser ? <UserProfile user={connectedUser} /> : <AuthForm />}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.grey,
    flex: 1,
  }
})

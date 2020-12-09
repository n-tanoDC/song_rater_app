import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import UserProfile from './UserProfile';

import { UserContext } from '../../contexts/UserContext';

export default ({ route }) => {
  const [user, setUser] = useState(route.params.connectedUser)
  const { connectedUser } = useContext(UserContext);

  useEffect(() => { if (connectedUser) setUser(connectedUser) }, [connectedUser])

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

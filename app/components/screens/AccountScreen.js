import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { UserContext } from '../../contexts/UserContext';

import UserProfile from '../users/UserProfile';

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
    backgroundColor: colors.grey,
    flex: 1,
  }
})

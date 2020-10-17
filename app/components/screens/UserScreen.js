import React from 'react';
import { SafeAreaView } from 'react-native';

import UserProfile from '../users/UserProfile';

export default ({ route }) => {
  const { user } = route.params;

  return (
    <SafeAreaView>
      <UserProfile user={user} visit />
    </SafeAreaView>
  )
}

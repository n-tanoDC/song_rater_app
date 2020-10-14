import React, { useContext } from 'react';
import { UserContext } from '../../App';

import UserProfile from './UserProfile';
import AuthForm from './AuthForm';
import { SafeAreaView } from 'react-native';

export default ({  }) => {
  const { user } = useContext(UserContext);

  return (
    <SafeAreaView>
      {user ? <UserProfile user={user} /> : <AuthForm />}
    </SafeAreaView>
  )
}

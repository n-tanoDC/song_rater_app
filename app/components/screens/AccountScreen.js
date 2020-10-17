import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';

import UserProfile from '../users/UserProfile';
import AuthForm from '../users/AuthForm';

import { UserContext } from '../../App';

export default () => {
  const { user } = useContext(UserContext);

  return (
    <SafeAreaView>
      {user ? <UserProfile user={user} /> : <AuthForm />}
    </SafeAreaView>
  )
}

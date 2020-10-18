import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';

import UserProfile from '../users/UserProfile';
import AuthForm from '../users/AuthForm';

import { AppContext } from '../../AppContext';

export default () => {
  const { user } = useContext(AppContext);

  return (
    <SafeAreaView>
      {user ? <UserProfile user={user} /> : <AuthForm />}
    </SafeAreaView>
  )
}

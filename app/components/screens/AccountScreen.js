import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';

import UserProfile from '../users/UserProfile';
import AuthForm from '../users/AuthForm';

import { UserContext } from '../../contexts/UserContext';

export default () => {
  const { connectedUser } = useContext(UserContext);

  return (
    <SafeAreaView>
      {connectedUser ? <UserProfile user={connectedUser} /> : <AuthForm />}
    </SafeAreaView>
  )
}

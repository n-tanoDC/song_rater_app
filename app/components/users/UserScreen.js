import React, { useContext } from 'react';
import { Container } from 'native-base';
import { UserContext } from '../../App';

import UserProfile from './UserProfile';
import AuthForm from './AuthForm';

export default ({  }) => {
  const { user } = useContext(UserContext);

  return (
    <Container>
      {user ? <UserProfile user={user} /> : <AuthForm />}
    </Container>
  )
}

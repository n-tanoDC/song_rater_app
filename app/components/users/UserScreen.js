import React from 'react';
import { Container } from '../common/Layout';

import UserProfile from './UserProfile';

export default ({ route }) => {
  const { user } = route.params;

  return (
    <Container>
      <UserProfile user={user} />
    </Container>
  )
}

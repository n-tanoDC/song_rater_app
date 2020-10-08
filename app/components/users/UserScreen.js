import React, { useContext } from 'react';
import { UserContext } from '../../App';

import UserProfile from './UserProfile';
import Auth from './Auth';

export default ({  }) => {
  const { user } = useContext(UserContext);

  return user ? <UserProfile user={user} /> : <Auth />
}

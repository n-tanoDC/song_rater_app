import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export default ({ children }) => {
  const [connectedUser, setConnectedUser] = useState(null)

  return (
    <UserContext.Provider value={{ connectedUser, setConnectedUser }}>
      {children}
    </UserContext.Provider>
  )
};

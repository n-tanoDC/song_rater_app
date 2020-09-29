import { Text, Button } from 'native-base';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import Login from '../modals/LoginModal'
import Signup from '../modals/SignupModal'

export default () => {
  const [login, switchLogin] = useState(false)
  const [signup, switchSignup] = useState(false)

  const userContext = useContext(UserContext)

  return (
    <>
      <Login visibility={{login, switchLogin}} userContext={userContext} />
      <Signup visibility={{signup, switchSignup}} />

      <Button onPress={() => switchLogin(true) } full>
        <Text>
          Se connecter
        </Text>
      </Button>
      <Button onPress={() => switchSignup(true) } full>
        <Text>
          S'inscrire
        </Text>
      </Button>
    </>
  )
};

import { H1, Text, Button } from 'native-base';
import React, { useContext } from 'react';
import { UserContext } from '../App';

export default ({ navigation, route }) => {
  const context = useContext(UserContext);
  const user = context.user ? context.user : null;
  return (
    <>
      <Text>Bienvenue {user ? user.username + ' !' : '!'}</Text>
      <Button onPress={() => navigation.navigate('Login') } full>
        <Text>
          Se connecter
        </Text>
      </Button>
      <Button onPress={() => navigation.navigate('Signup') } full>
        <Text>
          S'inscrire
        </Text>
      </Button>
      <Button warning onPress={() => console.log(context) } full>
        <Text>
          Debug
        </Text>
      </Button>
    </>
  )
}

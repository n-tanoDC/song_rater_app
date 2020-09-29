import { Text, Button } from 'native-base';
import React, { useContext } from 'react';
import { UserContext } from '../../App';

export default () => {
  const context = useContext(UserContext);
  const user = context.user ? context.user : null;
  return (
    <>
      <Text>Bienvenue {user ? user.username + ' !' : '!'}</Text>
      
      <Button warning onPress={() => console.log(context) } full>
        <Text>
          Debug
        </Text>
      </Button>
    </>
  )
}

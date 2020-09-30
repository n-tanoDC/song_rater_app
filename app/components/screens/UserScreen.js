import { useIsFocused } from '@react-navigation/native';
import { Text, Button, Container, ListItem, List } from 'native-base';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import Login from '../auth/LoginModal';
import Signup from '../auth/SignupModal';

export default () => {
  const [login, switchLogin] = useState(false)
  const [signup, switchSignup] = useState(false)

  const userContext = useContext(UserContext)

  if (userContext.user) {
    const { user } = userContext

    console.log(user);

    let favs;

    if (user.favorites.length > 0) {
      favs = user.favorites.map(fav => <ListItem key={fav}><Text>{fav}</Text></ListItem>)
    }

    return (
      <Container>
        <Text>Nom d'utilisateur : {user.username}</Text>
        <Text>Email : {user.email}</Text>
        <Text>Description : {user.description ? user.description : 'Aucune description.'}</Text>
        <Text>Artistes favoris :</Text>
        <List>
          {favs}
        </List>
      </Container>
    )
  }

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

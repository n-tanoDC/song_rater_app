import { Text, Button, ListItem, List, Content } from 'native-base';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import ListForm from '../lists/ListFormModal';
import Login from '../auth/LoginModal';
import Signup from '../auth/SignupModal';

export default () => {
  const [login, switchLogin] = useState(false);
  const [signup, switchSignup] = useState(false);
  const [list, switchList] = useState(false);

  const userContext = useContext(UserContext);

  if (userContext.user) {
    const { user } = userContext
    let favs;

    if (user.favorites) {
      favs = user.favorites.map(fav => <ListItem key={fav}><Text>{fav}</Text></ListItem>)
    }

    return (
      <Content>
        <ListForm visibility={{ list, switchList }} userContext={userContext}/>
        <Text>Nom d'utilisateur : {user.username}</Text>
        <Text>Email : {user.email}</Text>
        <Text>Description : {user.description ? user.description : 'Aucune description.'}</Text>
        <Text>Artistes favoris : {user.favorites ? user.favorites.length : 0}</Text>
        <List>
          {favs}
        </List>
        <Button full onPress={() => switchList(true)}>
          <Text>Créer une liste</Text>
        </Button>
      </Content>
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

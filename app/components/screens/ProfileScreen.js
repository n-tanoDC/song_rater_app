import { Text, Button, ListItem, List, Content, Container } from 'native-base';
import React, { useContext } from 'react';
import { UserContext } from '../../App';
import AuthScreen from './AuthScreen';

export default () => {

  const { setUser, user } = useContext(UserContext);

  if (!user) {
    return (
      <AuthScreen />
    )
  }

  let favs;

  if (user.favorites) {
    favs = user.favorites.map(fav => <ListItem key={fav}><Text>{fav}</Text></ListItem>)
  }

  return (
  <Container>
    <Content>
      <Text>Nom d'utilisateur : {user.username}</Text>
      <Text>Email : {user.email}</Text>
      <Text>Description : {user.description ? user.description : 'Aucune description.'}</Text>
      <Text>Artistes favoris : {user.favorites ? user.favorites.length : 0}</Text>
      <List>
        {favs}
      </List>
      <Button full onPress={() => setUser(null)}>
        <Text>
          Se déconnecter
        </Text>
      </Button>
    </Content>
  </Container>
  )
}

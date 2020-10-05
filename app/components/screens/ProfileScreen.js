import { Text, H1, Button, ListItem, List, Content, Container } from 'native-base';
import React, { useContext } from 'react';
import { UserContext } from '../../App';

export default ({ navigation }) => {

  const { setUser, user } = useContext(UserContext);

  if (!user) {
    return (
      <Container>
        <Content>
          <H1>Vous n'êtes pas connecté</H1>
          <Button onPress={() => navigation.navigate('Auth', { login: true})}>
            <Text>Se connecter</Text>
          </Button>
          <Button  onPress={() => navigation.navigate('Auth', { login: false})}>
            <Text>Créer un compte</Text>
          </Button>
        </Content>
      </Container>
    )
  }

  let favs;

  if (user.favorites) {
    favs = user.favorites.map(fav => <ListItem key={fav}><Text>{fav}</Text></ListItem>)
  }

  return (
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
  )
}

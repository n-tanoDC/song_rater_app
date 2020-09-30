import React, { useContext } from 'react';
import { Icon, ListItem, Body, Text, Right, Button } from 'native-base';
import { Linking } from 'react-native';
import { UserContext } from '../../App';
import { addToFavorites } from '../../data/user';

export default (props) => {
  const {result} = props;
  const userContext = useContext(UserContext)

  let favButton = null;

  if (userContext.user) {
    favButton = 
      <Button warning rounded onPress={() => addToFavorites(result.id, userContext.user)}>
        <Icon type="Entypo" name="star" />
      </Button>
  }

  return (
    <ListItem avatar>
      <Body>
        <Text>{result.name}</Text>
        <Text note>{result.type} - {result.popularity}</Text>
      </Body>
      <Right style={{ flexDirection: 'row' }}>
        <Button success rounded onPress={() => Linking.openURL(result.external_urls.spotify)}>
          <Icon type="Entypo" name="spotify" />
        </Button>
        {favButton}
      </Right>
    </ListItem>
)
  
};
  
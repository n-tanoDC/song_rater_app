import React, { useContext } from 'react';
import { Icon, ListItem, Body, Text, Right, Button, ActionSheet } from 'native-base';
import { Linking } from 'react-native';
import { UserContext } from '../../App';
import { addToFavorites } from '../../data/user';

export default ({ result }) => {
  const userContext = useContext(UserContext)

  let favButton;
  const optionsButton = 
  <Button info rounded onPress={() => displayActionSheet(result) }>
    <Icon type="Entypo" name="dots-two-horizontal" />
  </Button>;

  const displayActionSheet = result => {
    const options = ['Add to list', 'Cancel']
    ActionSheet.show({
      options: options,
      cancelButtonIndex: 1,
      title: 'test'
    }, index => console.log('Click on ' + options[index]))
  }

  if (userContext.user) {
    favButton = 
      <Button warning rounded onPress={() => addToFavorites(result.id, userContext)}>
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
        {optionsButton}
      </Right>
    </ListItem>
)
  
};
  
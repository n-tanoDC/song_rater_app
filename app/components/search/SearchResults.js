import React from 'react';
import { List, ListItem, Text, Button } from 'native-base';
import ResultCard from './ResultCard';

export default ({ navigation, results }) => {
  
  const { artists, albums, tracks } = results;

  console.log(tracks.next);
  
  const jsxArtists = artists.items.map((item, index) => <ResultCard key={index} navigation={navigation} element={item} />)
  const jsxAlbums = albums.items.map((item, index) => <ResultCard key={index} navigation={navigation} element={item} />)
  const jsxTracks = tracks.items.map((item, index) => <ResultCard key={index} navigation={navigation} element={item} />)

  return (
    <List>
      <ListItem itemDivider>
        <Text>Artistes</Text>
      </ListItem>
      {jsxArtists}
      {artists.next ? <Button onPress={() => console.log('voir plus')}><Text>Voir plus</Text></Button> : null}
      <ListItem itemDivider>
        <Text>Morceaux</Text>
      </ListItem>
      {jsxTracks}
      <ListItem itemDivider>
        <Text>Albums</Text>
      </ListItem>
      {jsxAlbums}
    </List>
  )
};
  
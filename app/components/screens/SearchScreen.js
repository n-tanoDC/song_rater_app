import { Input, List, Content, Text, CheckBox, View, ListItem, Body, Spinner, Button, Container } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { SpotifyContext } from '../../App';
import { search } from '../../data/spotify';
import SearchResults from '../search/SearchResults';

export default ({ navigation }) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('Damso');

  const spotify = useContext(SpotifyContext)

  const handleSubmit = () => {
    setLoading(true)
    search(value, spotify.token)
      .then(res => {
        console.log(res);
        setResults({
          artists: res.artists,
          tracks: res.tracks,
          albums: res.albums
        })
      })
      .then(() => setLoading(false))
      .catch(err => console.log(err))
  }

  const seeMore = () => {
    console.log('See more');
  }

  return (
    <Container>
      <Content>
        <Button full warning onPress={() => console.log(results)}>
          <Text>Debug</Text>
        </Button>
        <Input
          placeholder='Rechercher'
          value={value}
          onChangeText={input => setValue(input)}
          onSubmitEditing={() => handleSubmit()} />
        {loading || !results ? <Spinner /> : <SearchResults navigation={navigation} results={results}/>}
      </Content>
    </Container>
  )
};

// <SearchResult key={result.id} result={result}/>
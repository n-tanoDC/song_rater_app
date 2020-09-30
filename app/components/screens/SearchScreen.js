import { Input, List, Content, Text } from 'native-base';
import React, { useContext, useState } from 'react';
import { SpotifyContext } from '../../App';
import SearchResult from '../search/SearchResult';
import { search } from '../../data/spotify';

export default () => {
  const [results, setResults] = useState([])
  const [value, setValue] = useState('Damso')

  const spotify = useContext(SpotifyContext)

  const handleSubmit = () => {
    search(value, spotify.token)
      .then(res => setResults(res.artists.items))
      .catch(err => console.log(err))
  }
  let resultsOutput;

  if (results.length > 0) {
    resultsOutput = results.map(result => <SearchResult key={result.id} result={result}/>)
  } else {
    resultsOutput = <Text>Aucun résultat</Text>
  }
  
  return (
    <Content>
      <Input
        placeholder='Rechercher'
        value={value}
        onChangeText={input => setValue(input)}
        onSubmitEditing={() => handleSubmit()} />
      <List>
        {resultsOutput}
      </List>
    </Content>
  )
};

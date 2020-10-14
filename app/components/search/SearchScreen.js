import React, { useContext, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { SpotifyContext } from '../../App';
import { search } from '../../data/spotify';
import CustomInput from '../common/CustomInput';
import CustomSegment from '../common/CustomSegment';
import SearchResults from './SearchResults';

export default () => {
  const [results, setResults] = useState(null);
  const [selected, setSelected] = useState(0)
  const [value, setValue] = useState('fugees');

  const spotify = useContext(SpotifyContext)

  const handleSubmit = () => {
    search(value, spotify.token)
      .then(res => {
        setResults({
          albums: res.albums,
          tracks: res.tracks,
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomInput 
        autoFocus
        handleSubmit={handleSubmit}
        color='#FFB906'
        icon='magnify'
        placeholder='Rechercher du contenu...'
        state={{ value, callback: setValue }}
      />
      <CustomSegment data={['Morceaux', 'Albums']} state={{ selected, setSelected }} />
      <View style={styles.resultsContainer}>
        {results ? <SearchResults results={selected ? results.albums : results.tracks} /> : <Text>Veuillez effectuer une recherche.</Text> }
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    flex: 1,
    width: '100%', 
    overflow: 'scroll'
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
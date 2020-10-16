import React, { useContext, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { SpotifyContext } from '../../App';
import { loadMore, search } from '../../data/spotify';
import CustomInput from '../common/CustomInput';
import CustomSegment from '../common/CustomSegment';
import SearchResults from './SearchResults';

export default () => {
  const [results, setResults] = useState(false);
  const [loading, setLoading] = useState(false)
  const [next, setNext] = useState(null)

  const [selected, setSelected] = useState(0);
  const [value, setValue] = useState('fugees');

  const { token } = useContext(SpotifyContext)

  const handleSubmit = () => {
    setLoading(true);
    search(value, token)
      .then(res => {
        const albums = res.albums.items.filter(album => album.album_type === 'album')
        setResults({
          albums: albums,
          tracks: res.tracks.items,
        })
        setNext({
          albums: res.albums.next,
          tracks: res.tracks.next
        })
      })
      .catch(err => console.log(err))
  }

  const onEndReached = () => {
    const url = selected ? next.albums : next.tracks;
    const type = selected ? 'albums' : 'tracks';
    if (url) {
      loadMore(url, token)
        .then(res => {
          setResults({ ...results, [type]: [...results[type], ...res[type].items]})
          setNext({ ...next, [type]: res[type].next })
        })
        .catch(err => console.log(err))
    }
  }

  let content = loading ? (<ActivityIndicator />) : (<Text>Veuillez effectuer une recherche.</Text>)
  
  if (results) {
    content = (
      <SearchResults 
        results={selected ? results.albums : results.tracks}
        onEndReached={onEndReached} />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomInput 
        autoFocus
        onPress={handleSubmit}
        handleSubmit={handleSubmit}
        color='#FFB906'
        icon='magnify'
        placeholder='Rechercher du contenu...'
        state={{ value, callback: setValue }}
      />
      <CustomSegment data={['Morceaux', 'Albums']} state={{ selected, setSelected }} />
      <View style={styles.content}>
        {content}
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
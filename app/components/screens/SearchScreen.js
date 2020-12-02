import React, { useContext, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { AppContext } from '../../contexts/AppContext';
import { loadMore, search } from '../../data/spotify';
import colors from '../../styles/colors';
import CustomInput from '../common/CustomInput';
import Loader from '../common/Loader';
import MessageView from '../common/MessageView';
import SearchResults from '../search/SearchResults';
import CustomTabView from '../users/CustomTabView';

export default () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false)
  const [next, setNext] = useState(null)

  const [selected, setSelected] = useState(0);
  const [value, setValue] = useState('fugees');

  const { token } = useContext(AppContext)

  const handleSubmit = () => {
    setResults(null)
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
      .then(() => setLoading(false))
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

  const getResults = (type) => (
    <SearchResults 
      results={results[type]}
      onEndReached={onEndReached} />)

  const sections = [
    {
      title: 'Morceaux',
      render: () => getResults('tracks')
    },
    {
      title: 'Albums',
      render: () => getResults('albums')
    },
  ]

  let content = loading ? (<Loader />) : (<MessageView message='Veuillez effectuer une recherche' />)
  
  if (results) {
    content = (
      <CustomTabView 
        sections={sections}
        style='rounded' />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomInput 
        autoFocus
        onPress={handleSubmit}
        handleSubmit={handleSubmit}
        color={colors.secondary}
        icon='magnify'
        placeholder='Rechercher du contenu...'
        value={value}
        onChangeText={setValue} />
      {content}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'scroll',
    paddingHorizontal: 10,
    paddingTop: 10,
    width: '100%', 
  }
})
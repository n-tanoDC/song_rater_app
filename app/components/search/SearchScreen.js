import React, { useContext, useState } from 'react';
import { SafeAreaView,StyleSheet } from 'react-native';

import CustomInput from '../common/CustomInput';
import Loader from '../common/Loader';
import MessageView from '../common/MessageView';
import CustomTabView from '../common/CustomTabView';
import SearchResults from './SearchResults';

import { catchErrors } from '../../functions/errors';
import { search } from '../../functions/spotify';

import colors from '../../styles/colors';

import { AppContext } from '../../contexts/AppContext';
import { showToast } from '../../functions/helpers';

const getSections = (results) => ([
  {
    key: 'tracks',
    title: 'Morceaux',
    render: (<SearchResults results={results.tracks} />)
  },
  {
    key: 'albums',
    title: 'Albums',
    render: (<SearchResults results={results.albums} />)
  },
  {
    key: 'artists',
    title: 'Artistes',
    render: (<SearchResults results={results.artists} />)
  }
]);


export default () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false)

  const [value, setValue] = useState('');

  const { token } = useContext(AppContext)

  const handleSubmit = () => {
    if (value) {
      setResults(null);
      setLoading(true);
      search(value, token)
        .then(res => {
          if (res) {
            let filteredAlbums = [];
            if (res.albums) {
              filteredAlbums = res.albums.items.filter(album => album.album_type === 'album')
            }
            setResults({
              artists: res.artists,
              albums: { items: filteredAlbums, next: res.albums.next },
              tracks: res.tracks,
            });
            setLoading(false)
          }
        })
        .catch(catchErrors)
    } else {
      showToast('Veuillez saisir un texte à rechercher')
    }
  }

  let content = loading ? (<Loader />) : (<MessageView message='Veuillez effectuer une recherche' />)
  
  if (results) {
    content = (
      <CustomTabView 
        sections={getSections(results)}
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
    paddingHorizontal: 10,
    paddingTop: 10,
    width: '100%', 
  }
})
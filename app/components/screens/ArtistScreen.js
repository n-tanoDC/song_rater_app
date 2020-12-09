import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import Loader from '../common/Loader';
import ArtistBanner from '../media/artists/ArtistBanner';
import SectionTitle from '../common/SectionTitle';
import TrackList from '../media/TrackList';
import AlbumsList from '../media/albums/AlbumsList';
import ArtistsList from '../media/artists/ArtistsList';

import { catchErrors } from '../../data/errors';
import { getArtistData } from '../../data/spotify';

import { AppContext } from '../../contexts/AppContext';

export default ({ route }) => {
  const { id } = route.params.artist;

  const [artist, setArtist] = useState(null)

  const { token } = useContext(AppContext)

  useEffect( () => { 
    getArtistData(id, token)
      .then(res => setArtist(res))
      .catch(catchErrors)
   }, []);
  
  if (!artist) return (<Loader />)

  return (
    <SafeAreaView style={styles.container}>
      <ArtistBanner artist={artist.info}/>
      <ScrollView style={styles.content}>
        <SectionTitle text='Morceaux populaires' />
        <TrackList tracks={artist.topTracks} />
        <SectionTitle text='Albums' />
        <AlbumsList albums={artist.albums.items} />
        <SectionTitle text='Artistes similaires' />
        <ArtistsList artists={artist.relatedArtists} />
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
  }
})

import React from 'react';
import { useNavigation } from '@react-navigation/native';

import SectionTitle from '../common/SectionTitle';
import ArtistsList from '../media/artists/ArtistsList';
import TrackList from '../media/tracks/TrackList';
import CustomButton from '../common/buttons/CustomButton';
import { ScrollingContent } from '../common/Layout';

import { getMediaType } from '../../functions/helpers';
import { StyleSheet, Text, View } from 'react-native';

const RedirectButton = ({ type }) => {
  const navigation = useNavigation()
  return (
    <CustomButton 
      text={'Rechercher un ' + type}
      onPress={() => navigation.navigate('Search')} />
  )
}

const EmptyList = ({ type }) => {
  return (
    <View style={styles.emptyListContainer}>
      <Text style={styles.emptyListLabel}>Aucun favori.</Text>
      <RedirectButton type={type} />
    </View>
  )
}

export default ({ favorites }) => {
  
  const tracksAndAlbums = favorites.filter(fav => getMediaType(fav) !== 'artist')
  const artists = favorites.filter(fav => getMediaType(fav) === 'artist')

  return (
    <ScrollingContent>
      <SectionTitle text='Morceaux et albums'/>
      {tracksAndAlbums.length ? <TrackList showArtist tracks={tracksAndAlbums} /> : <EmptyList type='média' />}
      <SectionTitle text='Artistes' />
      {artists.length ? <ArtistsList artists={artists} /> : <EmptyList type='artiste' />}
    </ScrollingContent>
  )
}

const styles = StyleSheet.create({
  emptyListContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyListLabel: {
    marginBottom: 10
  }
})

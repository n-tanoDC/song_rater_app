import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getCover } from '../../../functions/helpers';

const ArtistCard = ({ artist }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.artistCard} onPress={() => navigation.push('Artist', { artist })}>
      <Image source={{ uri: getCover(artist) }} style={styles.artistCardImg} />
      <Text style={styles.artistName}>{artist.name}</Text>
    </TouchableOpacity>
  )
}

export default ({ artists }) => {
  const jsxArtists = artists.map(artist => <ArtistCard key={artist.id} artist={artist} />)
  return (
    <View style={styles.artistList}>
      {jsxArtists}
    </View>
  )
}

const styles = StyleSheet.create({
  artistCard: {
    margin: 5,
  },
  artistCardImg: {
    aspectRatio: 1,
    borderRadius: 1000,
    width: 100,
  }, 
  artistName: {
    fontFamily: 'baloo2-semibold',
    marginTop: 5,
    textAlign: 'center',
    width: 100, 
  },
  artistList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
})
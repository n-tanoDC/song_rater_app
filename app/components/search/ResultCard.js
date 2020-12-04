import React, { memo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';

import { getArtists, getCover, getGenres } from '../../functions';
import colors from '../../styles/colors';

const MediaCard = ({ media }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Media', { media: media } )}
      style={styles.card}>
      <View style={styles.imageContainer}>
        <ImageBackground source={{ uri: getCover(media) }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>{media.name}</Text>
        <Text numberOfLines={1} style={styles.artist}>{getArtists(media)}</Text>
      </View>
    </TouchableOpacity> 
  )
}

const ArtistCard = ({ artist }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Media', { media: artist } )}
      style={[styles.card, styles.artistCard]}>
      <View style={styles.artistImageContainer}>
        <ImageBackground source={{ uri: getCover(artist) }} style={[styles.image, styles.artistImage]} />
      </View>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>{artist.name}</Text>
        {artist.genres.length ? <Text numberOfLines={1} style={styles.artist}>{getGenres(artist)}</Text> : null}
      </View>
    </TouchableOpacity>
  )
}

export default memo(({ result }) => {

  switch (result.type) {
    case 'track':
    case 'album':
      return (<MediaCard media={result} />)
    case 'artist':
      return (<ArtistCard artist={result} />)
    default:
      return null;
  }
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    elevation: 5,
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 10,
    width: '100%',
    overflow: 'hidden'
  },
  artistCard: { 
    borderRadius: 1000,
  },
  imageContainer: {
    width: '20%',
  },
  artistImageContainer: {
    width: '20%',
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    aspectRatio: 1, 
    resizeMode: 'cover',
  },
  textContainer: {
    paddingHorizontal: 10,
    justifyContent: 'space-evenly',
    width: '80%'
  },
  title: {
    fontFamily: 'baloo2-semibold',
    fontSize: 16
  },
  artist: {
    color: '#969696',
  }
})

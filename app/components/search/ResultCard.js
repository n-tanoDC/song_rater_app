import React from 'react';
import { StyleSheet, View, Image, Text, ImageBackground } from 'react-native';

export default ({ result }) => {

  const getArtists = artists => {
    let artistsNames = '';
    for (const [index, artist] of artists.entries()) {
      const suffix = index < artists.length - 1 ? ', ' : '';
      artistsNames += (artist.name + suffix)
    }
    return artistsNames;
  }

  const image = result.type === 'track' ? result.album.images[0].url : result.images[0].url;

  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <ImageBackground source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>{result.name}</Text>
        <Text numberOfLines={1} style={styles.artist}>{getArtists(result.artists)}</Text>
      </View>
    </View> 
  )
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FDFDFD',
    elevation: 5,
    flexDirection: 'row',
    marginBottom: 15,
    borderRadius: 10,
    width: '100%',
    overflow: 'hidden'
  },
  imageContainer: {
    width: '20%'
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
    fontWeight: 'bold',
    fontSize: 16
  },
  artist: {
    color: '#969696',
  }
})

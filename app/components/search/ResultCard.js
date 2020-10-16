import React, { memo } from 'react';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getArtists } from '../../functions';

export default memo(({ result }) => {

  const navigation = useNavigation()

  const image = result.type === 'track' ? result.album.images[0].url : result.images[0].url;

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Feed', { screen: 'Review', params: { element: result } })}
      style={styles.card}>
      <View style={styles.imageContainer}>
        <ImageBackground source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>{result.name}</Text>
        <Text numberOfLines={1} style={styles.artist}>{getArtists(result.artists)}</Text>
      </View>
    </TouchableOpacity> 
  )
});

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

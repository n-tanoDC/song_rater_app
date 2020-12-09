import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getCover } from '../../../functions/helpers';

const AlbumCard = ({ album }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.push('Media', { media: album })} style={styles.albumCard}>
      <Image source={{ uri: getCover(album) }} style={styles.albumCover} />
      <Text numberOfLines={2} style={styles.albumName}>{album.name}</Text>
    </TouchableOpacity>
  )
}

export default ({ albums }) => {
  const renderItem = ({ item }) => (<AlbumCard album={item} />);

  return (
    <FlatList 
      data={albums}
      keyExtractor={album => album.id}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      horizontal
    />
  )
}

const styles = StyleSheet.create({
  albumCard: {
    marginHorizontal: 10,
  },
  albumCover: {
    aspectRatio: 1,
    borderRadius: 10,
    width: 100,
  },
  albumName: {
    fontFamily: 'baloo2-semibold',
    marginTop: 5,
    textAlign: 'center',
    width: 100, 
  }, 
})
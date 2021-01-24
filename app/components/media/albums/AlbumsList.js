import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { getArtists, getCover } from '../../../functions/helpers';
import colors from '../../../styles/colors';
import MessageView from '../../common/MessageView';

const AlbumCard = ({ album, showArtists }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.push('Media', { media: album })} style={styles.albumCard}>
      <Image source={{ uri: getCover(album) }} style={styles.albumCover} />
      <Text numberOfLines={showArtists ? 1 : 2} style={styles.albumName}>{album.name}</Text>
      {showArtists ? <Text numberOfLines={1} style={styles.artists}>{getArtists(album.artists)}</Text> : null}
    </TouchableOpacity>
  )
}

export default ({ albums, showArtists }) => {
  const renderItem = ({ item }) => (<AlbumCard showArtists={showArtists} album={item} />);

  if (!albums.length) {
    return (
      <MessageView message='Aucun album.' />
    )
  }

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
  artists: {
    width: 100,
    fontSize: 12,
    color: colors.grey,
    textAlign: 'center',
  }
})